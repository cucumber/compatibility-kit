import {
  Attachment,
  AttachmentContentEncoding,
  Envelope,
  TimeConversion,
} from '@cucumber/messages'
import { Readable } from 'stream'

import { Clock } from './Clock'

const LOG_MEDIA_TYPE = 'text/x.cucumber.log+plain'
const LINK_MEDIA_TYPE = 'text/uri-list'

export abstract class ExecutionContext {
  protected constructor(
    private readonly clock: Clock,
    private readonly onMessage: (envelope: Envelope) => void
  ) {}

  abstract makeAttachmentRelations(): Partial<
    Pick<
      Attachment,
      'testCaseStartedId' | 'testStepId' | 'testRunHookStartedId'
    >
  >

  async attach(
    data: Readable | Buffer | string,
    optionsOrMediaType:
      | {
          mediaType: string
          fileName?: string
        }
      | string
  ): Promise<void> {
    const options =
      typeof optionsOrMediaType === 'string'
        ? { mediaType: optionsOrMediaType }
        : optionsOrMediaType
    let body = '',
      contentEncoding = AttachmentContentEncoding.IDENTITY

    if (typeof data === 'string') {
      body = data
    } else if (Buffer.isBuffer(data)) {
      body = data.toString('base64')
      contentEncoding = AttachmentContentEncoding.BASE64
    } else {
      const chunks = []
      for await (const chunk of data) {
        chunks.push(chunk)
      }
      body = Buffer.concat(chunks).toString('base64')
      contentEncoding = AttachmentContentEncoding.BASE64
    }

    this.onMessage({
      attachment: {
        ...this.makeAttachmentRelations(),
        body,
        contentEncoding,
        mediaType: options.mediaType,
        fileName: options.fileName,
        timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
          this.clock.now()
        ),
      },
    })
  }

  async log(text: string): Promise<void> {
    await this.attach(text, { mediaType: LOG_MEDIA_TYPE })
  }

  async link(url: string, title?: string): Promise<void> {
    await this.attach(url, { mediaType: LINK_MEDIA_TYPE, fileName: title })
  }
}
