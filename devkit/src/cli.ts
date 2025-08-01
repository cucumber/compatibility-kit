import {parseArgs} from 'node:util'
import {run} from './run'

async function main() {
    const {positionals: paths, values} = parseArgs({
        options: {
            retry: {
                type: 'string',
            },
        },
        allowPositionals: true,
        strict: false,
    })
    const allowedRetries = Number(values['retry'] ?? 0)

    await run(
        paths,
        allowedRetries
    )
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
