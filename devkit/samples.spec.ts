import path from 'node:path'
import fs from 'node:fs'
import {execFile} from 'node:child_process'

import {describe, it} from 'vitest'
import globby from "globby";

describe('Samples', async () => {
  const features = await globby(['samples/**/*.feature', 'samples/**/*.feature.md'])
  for (const feature of features) {
    const [, suite, file] = feature.split(path.sep)

    it.concurrent(suite, async function ({expect}) {
      const args = [feature]
      const argumentsPath = path.resolve(process.cwd(), `samples/${suite}/${suite}.arguments.txt`)
      if (fs.existsSync(argumentsPath)) {
        args.push(...fs.readFileSync(argumentsPath, {encoding: 'utf-8'})
            .trim()
            .split(' '))
      }

      const [stdout, stderr] = await execute(args)

      console.error(stderr)
      await expect(stdout).toMatchFileSnapshot(
          path.join(
              process.cwd(),
              'samples',
              suite,
              file + '.ndjson'
          )
      )
    })
  }
})

async function execute(args: string[]): Promise<[string, string]> {
  return new Promise((resolve, reject) => {
    execFile(
        'npx',
        [
          'tsx',
          './src/cli.ts',
          ...args,
        ],
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
