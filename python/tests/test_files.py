# Testing `feature_code_for`
import pytest


def test_feature_code_for_existing_example(examples, features_path, samples):
    """
    Test that feature_code_for returns the correct path for an existing example.
    """
    assert examples.feature_code_for('hooks') == features_path / 'hooks'


def test_feature_code_for_nonexistent_example(examples, samples):
    """
    Test that feature_code_for raises a ValueError for a nonexistent example.
    """
    with pytest.raises(ValueError, match="No feature code directory found for CCK example: nonexistent-example"):
        examples.feature_code_for('nonexistent-example')


# Testing `gherkin` method
def test_gherkin_examples(examples, gherkin_examples, samples):
    """
    Test that the gherkin() method returns the correct list of gherkin examples.
    """
    gherkin_folders = [folder.name for folder in examples.gherkin()]
    assert sorted(gherkin_folders) == sorted(gherkin_examples)


# Testing `markdown` method
def test_markdown_examples(examples, markdown_examples, samples):
    """
    Test that the markdown() method returns the correct list of markdown examples.
    """
    markdown_folders = [folder.name for folder in examples.markdown()]
    assert sorted(markdown_folders) == sorted(markdown_examples)
