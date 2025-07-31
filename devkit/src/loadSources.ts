import {
  GherkinStreams,
  IGherkinStreamOptions,
} from '@cucumber/gherkin-streams'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Envelope, IdGenerator } from '@cucumber/messages'

import { PickledDocument } from './types'

export async function loadSources(
  newId: IdGenerator.NewId,
  paths: ReadonlyArray<string>,
  onMessage: (envelope: Envelope) => void
): Promise<ReadonlyArray<PickledDocument>> {
  const gherkinQuery = new GherkinQuery()
  await gherkinFromPaths(
    paths,
    {
      defaultDialect: 'en',
      newId,
      relativeTo: process.cwd(),
    },
    (envelope) => {
      onMessage(envelope)
      gherkinQuery.update(envelope)
    }
  )

  return gherkinQuery.getGherkinDocuments().map((gherkinDocument) => ({
    gherkinDocument,
    pickles: gherkinQuery
      .getPickles()
      .filter((pickle) => pickle.uri === gherkinDocument.uri),
  }))
}

async function gherkinFromPaths(
  paths: ReadonlyArray<string>,
  options: IGherkinStreamOptions,
  onEnvelope: (envelope: Envelope) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const gherkinMessageStream = GherkinStreams.fromPaths(paths, options)
    gherkinMessageStream.on('data', onEnvelope)
    gherkinMessageStream.on('end', resolve)
    gherkinMessageStream.on('error', reject)
  })
}
