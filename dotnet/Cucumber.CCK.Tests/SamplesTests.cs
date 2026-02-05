using System;
using System.IO;
using FluentAssertions;
using Xunit;

namespace Cucumber.CCK.Tests;

public class SamplesTests
{
    private readonly string _samplesPath;

    public SamplesTests()
    {
        // ContentFiles from the package are copied to output as devkit/samples/
        _samplesPath = Path.Combine(AppContext.BaseDirectory, "cck", "samples");
    }

    [Fact]
    public void ContentFiles_ShouldBeCopiedToOutput()
    {
        Directory.Exists(_samplesPath).Should().BeTrue(
            because: "the cck/samples folder should be copied from the NuGet package");
    }

    [Fact]
    public void SampleFolders_ShouldExist()
    {
        var samplesPaths = Directory.GetDirectories(_samplesPath);
        samplesPaths.Should().NotBeEmpty(
            because: "the package should contain sample folders");
    }

    [Fact]
    public void FeatureFiles_ShouldExist()
    {
        var featureFiles = Directory.GetFiles(_samplesPath, "*.feature", SearchOption.AllDirectories);
        featureFiles.Should().NotBeEmpty(
            because: "the package should contain .feature files");
    }

    [Fact]
    public void NdjsonFiles_ShouldExist()
    {
        var ndjsonFiles = Directory.GetFiles(_samplesPath, "*.ndjson", SearchOption.AllDirectories);
        ndjsonFiles.Should().NotBeEmpty(
            because: "the package should contain .ndjson message files");
    }

    [Fact]
    public void Samples_ShouldContainExpectedFiles()
    {
        var samplesPaths = Directory.GetDirectories(_samplesPath);
        foreach (var samplePath in samplesPaths)
        {
            var path = Path.Combine(_samplesPath, samplePath);
            var featureFiles = Directory.GetFiles(path, "*.feature");
            var markdownFiles = Directory.GetFiles(path, "*.md");
            string[] combinedList = [..featureFiles, ..markdownFiles];
            combinedList.Should().NotBeEmpty(
                because: $"the sample '{samplePath}' should contain .feature files and/or .md files");
            var ndjsonFiles = Directory.GetFiles(path, "*.ndjson", SearchOption.AllDirectories);
            ndjsonFiles.Should().NotBeEmpty(
                because: $"the sample '{samplePath}' should contain .ndjson message files");
        }
    }
}
