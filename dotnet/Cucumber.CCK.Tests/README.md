# Test Project Setup

This document explains the test infrastructure for the Cucumber.CCK NuGet package.

## Overview

The test project (`Cucumber.CCK.Tests`) validates that the NuGet package correctly packages and deploys the devkit samples as contentFiles that are copied to the output directory.

## Project Structure

```
dotnet/
??? NuGet.Config                           # Configures local package source
??? Directory.Build.props                  # Shared build properties
??? Cucumber.CCK/
?   ??? Cucumber.CCK.csproj           # Package project
?   ??? bin/Release/NuGet/            # Local package output
?       ??? Cucumber.CCK.27.0.0.nupkg
??? Cucumber.CCK.Tests/
    ??? Cucumber.CCK.Tests.csproj         # Test project
    ??? SamplesTests.cs                   # Tests
```

## How It Works

### 1. NuGet.Config

The `NuGet.Config` file tells NuGet to look for packages in the local build output first:

```xml
<packageSources>
  <clear />
  <add key="Local" value="./Cucumber.CCK/Cucumber.CCK/bin/Release/NuGet" />
  <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
</packageSources>
```

This allows the test project to reference the locally built package without publishing to NuGet.org.

### 2. Test Project

The test project references `Cucumber.CCK` as a PackageReference:

```xml
<PackageReference Include="Cucumber.CCK" Version="27.0.0" />
```

When restored, NuGet finds this package in the local folder and copies the contentFiles to the test output directory at `bin/Release/net8.0/devkit/samples/`.

### 3. Tests

The tests verify:
- ContentFiles are copied to the output directory
- Expected sample folders exist (hooks, attachments, empty, etc.)
- .feature files are present
- .ndjson message files are present
- Specific sample files exist and are accessible

## Local Development Workflow

To run tests locally:

```bash
# 1. Pack the Cucumber.CCK package
cd dotnet/Cucumber.CCK/Cucumber.CCK
dotnet pack -c Release

# 2. Run the tests
cd ../..
dotnet test Cucumber.CCK.Tests -c Release
```

## CI/CD Workflow

The GitHub Actions workflow (`.github/workflows/test-dotnet.yml`) automates this process:

1. Checkout code
2. Setup .NET SDK
3. **Pack the Cucumber.CCK package** (creates the .nupkg in the local folder)
4. **Run tests** (restores from local folder and verifies contentFiles)

## What the Tests Validate

The tests ensure that consumers of the Cucumber.CCK package will receive:
- All sample folders from `devkit/samples`
- All .feature files
- All .ndjson message files
- All supporting files (.ts, images, etc.)

And that these files are automatically copied to their output directory at `devkit/samples/` when they build their project.
