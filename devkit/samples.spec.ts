import path from 'node:path'
import fs from 'node:fs'
import {execFile} from 'node:child_process'

import {describe, expect, it} from 'vitest'
import globby from "globby";

describe('Samples', async () => {
  const features = await globby(['samples/**/*.feature', 'samples/**/*.feature.md'])
  for (const feature of features) {
    const [, suite, file] = feature.split(path.sep)

    it(suite, async function () {
      const args = [feature, '--predictable-ids']
      const argumentsPath = path.resolve(process.cwd(), `samples/${suite}/${suite}.arguments.txt`)
      if (fs.existsSync(argumentsPath)) {
        args.push(...fs.readFileSync(argumentsPath, {encoding: 'utf-8'})
            .trim()
            .split(' '))
      }

      const [stdout, stderr] = await run(args)

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

async function run(args: string[]): Promise<[string, string]> {
  return new Promise((resolve, reject) => {
    execFile(
        'npx',
        [
          'tsx',
          './src/cli.ts',
          ...args,
        ],
        {
          env: {
            ...process.env,
            GITHUB_SERVER_URL: 'https://github.com',
            GITHUB_REPOSITORY: 'cucumber-ltd/shouty.rb',
            GITHUB_RUN_ID: '154666429',
            GITHUB_SHA: '99684bcacf01d95875834d87903dcb072306c9ad',
            GITHUB_REF: 'refs/heads/master'
          }
        },
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
