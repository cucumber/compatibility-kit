import Ajv from "ajv/dist/2020"
import * as messageStreams from '@cucumber/message-streams'
import * as messages from '@cucumber/messages'
import {pipeline as asyncPipeline, Writable} from 'stream'
import {promisify} from 'util'
import fs from 'fs'

const pipeline = promisify(asyncPipeline)

const refs = 'Source.json Attachment.json Exception.json Location.json SourceReference.json Hook.json GherkinDocument.json Meta.json ParameterType.json ParseError.json Pickle.json StepDefinition.json TestCase.json Timestamp.json TestCaseFinished.json TestCaseStarted.json TestRunFinished.json TestRunHookFinished.json TestRunHookStarted.json TestRunStarted.json Duration.json TestStepFinished.json TestStepResult.json TestStepStarted.json UndefinedParameterType.json'.split(' ')
  .map(loadSchema)

const ajv = new Ajv({
  allErrors: true
})
refs.forEach((ref) => ajv.addSchema(ref))
const validate = ajv.compile(loadSchema('Envelope.json'))

async function main() {
  let isEmpty = true

  await pipeline(
    process.stdin,
    new messageStreams.NdjsonToMessageStream(line => JSON.parse(line)),
    new Writable({
      objectMode: true,
      write(envelope: messages.Envelope, _, callback) {
        if (Object.keys(envelope).length) {
          isEmpty = false
        }

        const valid = validate(envelope)

        if (valid) return callback()

        callback(new Error(`JSON Schema validation error:
${JSON.stringify(validate.errors, null, 2)}
Message:
${JSON.stringify(envelope, null, 2)}
`))
      }
    })
  )

  if (isEmpty) {
    throw new Error('Empty stream or empty json object')
  }
}

function loadSchema(name: string) {
  return JSON.parse(fs.readFileSync(`${__dirname}/../node_modules/@cucumber/messages/schema/${name}`, 'utf-8'));
}

main().catch(err => {
  console.error(err.stack)
  process.exit(1)
})
