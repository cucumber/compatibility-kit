import { execFile } from 'node:child_process'
import fs, { createReadStream } from 'node:fs'
import path from 'node:path'
import { Writable } from 'node:stream'
import { pipeline } from 'node:stream/promises'

import { NdjsonToMessageStream } from '@cucumber/message-streams'
import { Envelope } from '@cucumber/messages'
import Ajv from 'ajv/dist/2020'
import { globby } from 'globby'
import { describe, it } from 'vitest'

describe('Samples', async () => {
  const directories = await globby(['samples/*/'], { onlyDirectories: true })

  describe('Generation', async () => {
    for (const directory of directories) {
      const suite = path.basename(directory)

      it.concurrent(suite, async function ({ expect }) {
        const featurePaths = (
          await globby(['*.feature', '*.feature.md'], { cwd: directory })
        ).map((filename) => path.join(directory, filename))
        const args = [...featurePaths]
        const argumentsPath = path.join(
          process.cwd(),
          'samples',
          suite,
          suite + '.arguments.txt'
        )
        if (fs.existsSync(argumentsPath)) {
          args.push(
            ...fs
              .readFileSync(argumentsPath, { encoding: 'utf-8' })
              .trim()
              .split(' ')
          )
        }

        const [stdout, stderr] = await execute(args)

        console.error(stderr)
        await expect(stdout).toMatchFileSnapshot(
          path.join(process.cwd(), 'samples', suite, suite + '.ndjson')
        )
      })
    }
  })

  describe('Validation', async () => {
    const ajv = new Ajv({
      allErrors: true,
      loadSchema,
    })
    const validate = await ajv.compileAsync<Envelope>(
      loadSchema('Envelope.json')
    )

    for (const directory of directories) {
      const suite = path.basename(directory)

      it.concurrent(suite, async function ({ expect }) {
        let isEmpty = true
        await pipeline([
          createReadStream(
            path.join(process.cwd(), 'samples', suite, suite + '.ndjson')
          ),
          new NdjsonToMessageStream((line) => JSON.parse(line)),
          new Writable({
            objectMode: true,
            write(envelope, _, callback) {
              isEmpty = false
              const valid = validate(envelope)
              if (valid) {
                callback()
              } else {
                callback(
                  new Error(
                    'Schema validation errors(s): ' +
                      JSON.stringify(validate.errors)
                  )
                )
              }
            },
          }),
        ])
        if (isEmpty) {
          expect.fail('No envelopes in stream')
        }
      })
    }
  })
})

async function execute(args: string[]): Promise<[string, string]> {
  return new Promise((resolve, reject) => {
    execFile(
      'npx',
      ['tsx', '--conditions=node', './src/cli.ts', ...args],
      {},
      (error, stdout, stderr) => {
        if (error) {
          reject(error)
        } else {
          resolve([stdout, stderr])
        }
      }
    )
  })
}

function loadSchema(filename: string) {
  return JSON.parse(
    fs.readFileSync(
      `${process.cwd()}/node_modules/@cucumber/messages/schema/${filename}`,
      { encoding: 'utf-8' }
    )
  )
}
