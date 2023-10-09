# Cucumber Compatibility Kit: the Devkit

This devkit is a set of NPM scripts to generate new Messages in order to
extend the Cucumber Compatibility Kit, or to update it after the protocol has
been changed.

## Getting Started

As any NPM project, you first need to run `npm install`. To make sure everything
is going well, run `npm test`.

## Contributing to the Compability Kit

The files delivered as part ot fhe kit - the feature files and the ndjson files -
can be found in the [`samples`](./samples) folder.

The [`src`](.src) folder contains source code used by the NPM scripts of the devkit.
For example it contains a [`validate.mts`](./samples/validate.ts) file which is
used by the `test` NPM script. That `test` script make sure the `.ndjson` files
are valid regarding the schema of the Cucumber Messages protocol.

### Adding a new feature

To add a new feature in the kit, create a new folder in [`samples`](./samples).
Put the feature here, and its step definitions implemented in TypeScript, and
any required assets like pictures that would be used as attachments for example.

If you need to provide extra arguments to fake-cucumber for your suite, you can add a `{name}.arguments.txt` file to the directory too - see [the retry suite](./samples/retry/retry.arguments.txt) for an example.

Once your feature is ready, you can generate the messages.

### Generating the Messages

Once you have added a new feature or updated an existing one, or if you need
to regenerate the Messages due to an update in the Messages protocol, run the
following script:

    npm run generate-ndjson

That will update the `.ndjson` files of the kit. It will also validate those
files against the json schema of the Messages protocol, and copy all samples
(including the features, the step definitions, the assets, and the messages)
in the packages.

After reviewing the `git diff`, you can commit and push the changes into a new
pull request for review.

Note: You need to have `jq` available on your path.

#### Note regarding the packages

The packages have specific instructions into `.gitignore` to ignore the files
of the kit like features or messages.

After updating the samples in the devkit, you won't notice any changes in the
ruby package. You will have to report updates to the step definitions manually.

However regarding the JavaScript package, you won't notice any changes either,
and you won't have to report changes to the step definitions. The one from the
devkit will be automatically copied there.

### NPM scripts available

The main NPM scripts available are:

- build: it build TypeScript files in `src` into JavaScript files in `dist`
- test: validate each `.ndjson` file against json schema of the Messages protocol
- generate-ndjson: generate messages and serialize them as `.ndjson` for the
  features and using the step definitions of the `samples` folder
- copy-samples: copy the samples into the packages. Will also copy the step
  definition into the JavaScript package
