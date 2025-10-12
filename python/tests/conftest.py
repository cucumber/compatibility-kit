import shutil
from pathlib import Path

import pytest

from cucumber_compatibility_kit.examples import Examples

CURRENT_FILE = Path(__file__).parent
PROJECT_ROOT = CURRENT_FILE.parent.parent
PYTHON_MODULE_ROOT = PROJECT_ROOT / "python"
TEST_ROOT = PYTHON_MODULE_ROOT / "tests"
SAMPLES_DIR = PROJECT_ROOT / "devkit" / "samples"
FEATURES_DIR = PYTHON_MODULE_ROOT / "features"


@pytest.fixture
def examples():
    """Fixture to create an instance of the Examples class."""
    return Examples()


@pytest.fixture
def features_path():
    """Fixture to return the path of the features directory."""
    return FEATURES_DIR


@pytest.fixture
def gherkin_examples():
    """Fixture to return the list of gherkin example folders."""
    return [
        "attachments",
        "cdata",
        "data-tables",
        "examples-tables",
        "hooks",
        "minimal",
        "parameter-types",
        "pending",
        "retry",
        "rules",
        "skipped",
        "stack-traces",
        "undefined",
        "unknown-parameter-type",
    ]


@pytest.fixture
def markdown_examples():
    """Fixture to return the list of markdown example folders."""
    return ["markdown"]


@pytest.fixture(scope="session", autouse=True)
def samples():
    """Fixture to copy directories and files (including nested ones) before tests and clean up afterward.
    Only removes the copied directories and preserves the main directory and .gitignore file.
    """
    # Track the directories that were copied for cleanup
    copied_dirs = []

    # Ensure the destination directory exists
    FEATURES_DIR.mkdir(parents=True, exist_ok=True)

    # Remove existing copied directories, but keep the .gitignore file
    if FEATURES_DIR.exists():
        for item in FEATURES_DIR.iterdir():
            if item.is_dir():
                # Remove each copied directory
                shutil.rmtree(item)

    # Copy directories and files from SAMPLES_DIR to DEST_DIR
    for src_item in SAMPLES_DIR.iterdir():
        if src_item.is_dir():  # Copy directories
            dest_item = FEATURES_DIR / src_item.name
            shutil.copytree(src_item, dest_item)
            copied_dirs.append(dest_item)
        else:  # Copy files
            shutil.copy2(src_item, FEATURES_DIR / src_item.name)

    # Yield to allow tests to run
    yield

    # Teardown: Remove only the copied directories
    for copied_dir in copied_dirs:
        if copied_dir.exists():
            shutil.rmtree(copied_dir)
