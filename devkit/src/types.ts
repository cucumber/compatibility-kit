import { Readable } from 'node:stream'

import { GherkinDocument, Pickle } from '@cucumber/messages'

export type FormatStackTrace = (error: Error, sourceFrame: string) => string

export interface Clock {
  now(): number
}

export interface Stopwatch {
  now(): number
}

export type PickledDocument = {
  gherkinDocument: GherkinDocument
  pickles: ReadonlyArray<Pickle>
}

export interface TestRun {
  execute(): Promise<void>
}

export type AttachmentOptions = {
  mediaType: string
  fileName?: string
}

export interface World {
  attach(
    data: Readable | Buffer | string,
    optionsOrMediaType: AttachmentOptions | string
  ): Promise<void>
  log(text: string): Promise<void>
  link(url: string, title?: string): Promise<void>
}
