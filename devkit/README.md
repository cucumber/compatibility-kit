# Devkit

The devkit is a set of npm scripts to generate new Messages in order to
extend the Cucumber Compatibility Kit, or to update it after the protocol has
been changed.

## Getting Started

You'll need [Node.js](https://nodejs.org/), specifically the active LTS version or higher.

As any npm project, you first need to run `npm install`. To make sure everything
is going well, run `npm test`.

Once you've done all this you'll likely need to copy the existing devkit samples to your
directory of choice. To do this run `npm run copy-samples` or `npm run copy-to:LANG` where `LANG`
is the name of the folder you wish to copy to

## Contributing to the Compatibility Kit

The files delivered as part of the kit - the feature files and the ndjson files -
can be found in the [`samples`](./samples) folder.

The [`src`](./src) folder contains a barebones reference implementation of Cucumber
which is used to generate the reference messages. This is commonly referred to as
"fake-cucumber" (it used to be a standalone package but is now embedded here).

### Adding a feature

To add a new feature in the kit, create a new folder in [`samples`](./samples).
Put the feature here, and its step definitions implemented in TypeScript, and
any required assets like pictures that would be used as attachments for example.

If you need to provide extra arguments to fake-cucumber for your suite, you can add
a `{name}.arguments.txt` file to the directory too - see [the retry suite](./samples/retry/retry.arguments.txt) for an example.

Once your feature is ready, you can generate the messages.

### Generating the Messages

Once you have added a new feature or updated an existing one, or if you need
to (re)generate the Messages due to an update in the Messages protocol, run the
following script:

```shell
npm run generate
```

That will update the `.ndjson` files of the kit. It will also validate those
files against the json schema of the Messages protocol, and copy all samples
(including the features, the step definitions, the assets, and the messages)
in the packages.

After reviewing the `git diff`, you can commit and push the changes into a new
pull request for review.

#### Note regarding the packages

The packages have specific instructions into `.gitignore` to ignore the files
of the kit like features or messages.

After updating the samples in the devkit, you won't notice any changes in the
ruby package. You will have to report updates to the step definitions manually.

However regarding the JavaScript package, you won't notice any changes either,
and you won't have to report changes to the step definitions. The one from the
devkit will be automatically copied there.

### Commands

The npm scripts available are:

- `test`: re-run the message generation with fake-cucumber, ensure the emitted messages still match the samples and validate against the schema
- `generate`: re-run the message generation with fake-cucumber, overwrite the samples with the emitted messages, validate against the schema, and copy the updated samples to the language-specific packages.

