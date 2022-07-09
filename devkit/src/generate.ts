import fs from 'node:fs'
import path from 'node:path'
import {execSync} from 'node:child_process'
import globby from 'globby'

/*
Define environment variables to emulate a CI environment (GitHub Actions in this case)
This is necessary in order to create a meta message with a ci property set
 */
const env = {
    ...process.env,
    GITHUB_SERVER_URL: 'https://github.com',
    GITHUB_REPOSITORY: 'cucumber-ltd/shouty.rb',
    GITHUB_RUN_ID: '154666429',
    GITHUB_SHA: '99684bcacf01d95875834d87903dcb072306c9ad',
    GITHUB_REF: 'refs/heads/master'
}

async function main() {
    const features = await globby(['samples/**/*.feature', 'samples/**/*.feature.md'])
    for (const feature of features) {
        const [, suite] = feature.split(path.sep)
        console.log(`Generating samples for "${suite}" suite`)
        const args = ['--predictable-ids']
        const argumentsPath = path.resolve(process.cwd(), `samples/${suite}/${suite}.arguments.txt`)
        if (fs.existsSync(argumentsPath)) {
            args.push(fs.readFileSync(argumentsPath, {encoding: 'utf-8'}).trim())
        }
        execSync(`npx @cucumber/fake-cucumber ${args.join(' ')} ${feature} | jq -cS > ${feature}.ndjson`, {env})
    }
}

main().catch(err => {
    console.error(err.stack)
    process.exit(1)
})