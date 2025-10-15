from pathlib import Path


class CompatibilityKit:
    def __init__(self) -> None:
        self.cck_features_folder_location = Path(__file__).resolve().parent / "features"

    def gherkin(self) -> list[Path]:
        """Return the paths for each example that is of 'gherkin' type."""
        return [
            folder
            for folder in self.cck_features_folder_location.iterdir()
            if not folder.name.startswith(".") and self.gherkin_example(folder)
        ]

    def markdown(self) -> list[Path]:
        """Return the paths for each example that is of 'markdown' type."""
        return [
            folder
            for folder in self.cck_features_folder_location.iterdir()
            if not folder.name.startswith(".") and self.markdown_example(folder)
        ]

    def feature_code_for(self, example_name: str) -> Path:
        """Return the path for a specific example scenario based on its name."""
        path = self.cck_features_folder_location / example_name
        if path.is_dir():
            return path
        raise ValueError(
            f"No feature code directory found for CCK example: {example_name}"
        )

    def gherkin_example(self, example_folder: Path) -> bool:
        """Check if the example folder contains a '.feature' file."""
        return self.file_type_in_folder(".feature", example_folder)

    def markdown_example(self, example_folder: Path) -> bool:
        """Check if the example folder contains a '.md' file."""
        return self.file_type_in_folder(".md", example_folder)

    @staticmethod
    def file_type_in_folder(extension: str, folder: Path) -> bool:
        """Check if the folder contains any file with the given extension."""
        return any(file.suffix == extension for file in folder.iterdir())
