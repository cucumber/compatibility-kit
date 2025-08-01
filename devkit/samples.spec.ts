import path from 'node:path'
import fs from 'node:fs'
import {execFile} from 'node:child_process'

import {describe, it} from 'vitest'
import globby from "globby";

describe('Samples', async () => {
  const directories = await globby(['samples/*/'], { onlyDirectories: true })
  for (const directory of directories) {
    const suite = path.basename(directory)

    it.concurrent(suite, async function ({expect}) {
        const featurePaths = (await globby(['*.feature', '*.feature.md'], {cwd: directory})).map(filename => path.join(directory, filename))
        const args = [...featurePaths]
        const argumentsPath = path.join(
            process.cwd(),
            'samples',
            suite,
            suite + '.arguments.txt'
        )
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
              suite + '.ndjson'
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
