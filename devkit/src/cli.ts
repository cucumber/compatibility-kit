import {parseArgs} from 'node:util'
import {run} from './run'

async function main() {
    const {positionals: paths, values} = parseArgs({
        options: {
            'predictable-ids': {
                type: 'boolean',
            },
            require: {
                type: 'string',
                short: 'r',
            },
            retry: {
                type: 'string',
            },
        },
        allowPositionals: true,
        strict: false,
    })
    const predictableIds = values['predictable-ids'] as boolean
    const require = values['require'] as string
    const retry = values['retry'] as string

    const requirePaths = require ? require.split(':') : paths
    const allowedRetries = retry ? Number(retry) : 0

    await run({
        paths,
        requirePaths,
        allowedRetries,
        predictableIds,
    })
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
