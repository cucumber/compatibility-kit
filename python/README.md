# The Cucumber Compatibility Kit for Python

The CCK (Cucumber Compatibility Kit) is a set of features and messages. It aims to validate an implementation of the [Cucumber Messages protocol](https://github.com/cucumber/common/tree/main/messages#cucumber-messages).

## Overview

This kit (package) consists of a set of features, miscellaneous files, and messages:

- Each area will contain one feature, which, once executed, will emit an exhaustive set of messages as specified by the protocol.
- Some of these areas may "also" require miscellaneous files to be used when testing functions such as attaching images or documents or reading data from files.
- Each area will contain a set of messages - serialised as a single `.ndjson` file.

This is the reference for the CCK: a given feature from the kit, when executed using any dedicated step definitions, must emit the **exact** corresponding messages.

## Installation and Usage

1. Install the package using `pip`. You can do this by adding `cucumber-compatibility-kit` to your `requirements.txt` or using `pip` directly:

    ```bash
    pip install cucumber-compatibility-kit
    ```

2. Set up your test environment. Here's an example of how you might set up a test using `pytest`:

    ```python
    # tests/test_compatibility.py
    import pytest
    from cck.examples import Examples

    @pytest.fixture(scope='session')
    def examples():
        return Examples()

    @pytest.mark.parametrize('example_name', [
        'attachments',
        'cdata',
        'data-tables',
        'examples-tables',
        'hooks',
        'minimal',
        'parameter-types',
        'pending',
        'retry',
        'rules',
        'skipped',
        'stack-traces',
        'undefined',
        'unknown-parameter-type',
    ])
    def test_feature_code_for_existing_example(examples, example_name):
        """Test that the feature code for existing examples returns the correct path."""
        path = examples.feature_code_for(example_name)
        assert path.exists(), f"Feature code path does not exist for example: {example_name}"

    def test_gherkin_examples(examples):
        """Test that the list of gherkin examples matches the expected examples."""
        expected_examples = [
            'attachments',
            'cdata',
            'data-tables',
            'examples-tables',
            'hooks',
            'minimal',
            'parameter-types',
            'pending',
            'retry',
            'rules',
            'skipped',
            'stack-traces',
            'undefined',
            'unknown-parameter-type',
        ]
        assert sorted([e.name for e in examples.gherkin()]) == sorted(expected_examples)

    def test_markdown_examples(examples):
        """Test that the list of markdown examples matches the expected examples."""
        expected_examples = ['markdown']
        assert sorted([e.name for e in examples.markdown()]) == sorted(expected_examples)
    ```

In this example:
- `Examples` is the class used to handle CCK features and their paths.
- The `test_feature_code_for_existing_example` test ensures that the feature code path exists for known examples.
- The `test_gherkin_examples` and `test_markdown_examples` tests verify that the list of examples returned matches the expected list.

## More Info

The Cucumber Compatibility Kit is part of the development tools of [Cucumber](https://cucumber.io). It helps ensure that all implementations are properly supporting our internal protocol and are compatible (and consistent) with each other and our common tools like the [html-formatter](https://github.com/cucumber/html-formatter).

It can be a valuable tool if you are developing integration with Cucumber or your own implementation of it.

Join us on [github/cucumber/compatibility-kit](https://github.com/cucumber/compatibility-kit) for more help if needed.

You can also take a look at [cucumber-ruby](https://github.com/cucumber/cucumber-ruby/blob/v9.2.0/compatibility/cck_spec.rb) to see how the kit is used in Ruby.
