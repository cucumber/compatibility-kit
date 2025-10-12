from pathlib import Path

import pytest


def test_feature_code_for_existing_example(examples, features_path, samples):
    """Test that feature_code_for returns the correct path for an existing example."""
    assert examples.feature_code_for("hooks") == features_path / "hooks"


def test_feature_code_for_nonexistent_example(examples, samples):
    """Test that feature_code_for raises a ValueError for a nonexistent example."""
    with pytest.raises(
        ValueError,
        match="No feature code directory found for CCK example: nonexistent-example",
    ):
        examples.feature_code_for("nonexistent-example")


def test_gherkin_examples(examples, gherkin_examples, samples):
    """Expected subset of gherkin folders are present in the packaged features."""
    gherkin_folders = [folder.name for folder in examples.gherkin()]
    error = (
        f"Expected feature folder names {set(gherkin_examples) - set(gherkin_folders)} "
        f"not found in '{examples.cck_features_folder_location.relative_to(Path.cwd())}'"
        ". Please ensure that the expected names in the Python test setup matches the "
        "corresponding 'devkit' feature folder names."
    )
    assert set(gherkin_examples).issubset(set(gherkin_folders)), error


def test_markdown_examples(examples, markdown_examples, samples):
    """Expected subset of markdown folders are present in the packaged features."""
    markdown_folders = [folder.name for folder in examples.markdown()]
    error = (
        f"Expected feature folder names {set(markdown_examples) - set(markdown_folders)} "
        f"not found in '{examples.cck_features_folder_location.relative_to(Path.cwd())}'"
        ". Please ensure that the expected names in the Python test setup matches the "
        "corresponding 'devkit' feature folder names."
    )
    assert set(markdown_examples).issubset(set(markdown_folders)), error
