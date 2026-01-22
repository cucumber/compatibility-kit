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

    [Theory]
    [InlineData("hooks")]
    [InlineData("attachments")]
    [InlineData("empty")]
    [InlineData("backgrounds")]
    [InlineData("examples-tables")]
    public void SampleFolder_ShouldExist(string sampleName)
    {
        var samplePath = Path.Combine(_samplesPath, sampleName);
        Directory.Exists(samplePath).Should().BeTrue(
            because: $"the '{sampleName}' sample should be included in the package");
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
    public void HooksSample_ShouldContainExpectedFiles()
    {
        var hooksPath = Path.Combine(_samplesPath, "hooks");
        
        File.Exists(Path.Combine(hooksPath, "hooks.feature")).Should().BeTrue();
        File.Exists(Path.Combine(hooksPath, "hooks.ndjson")).Should().BeTrue();
        File.Exists(Path.Combine(hooksPath, "hooks.ts")).Should().BeTrue();
    }
}
