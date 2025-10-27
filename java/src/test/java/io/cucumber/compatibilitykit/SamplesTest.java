package io.cucumber.compatibilitykit;

import org.junit.jupiter.api.Test;
import org.junit.platform.commons.io.Resource;
import org.junit.platform.commons.io.ResourceFilter;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.platform.commons.support.ResourceSupport.findAllResourcesInPackage;

class SamplesTest {

    @Test
    void featuresHaveBeenCopied() {
        List<Resource> resources = findAllResourcesInPackage(
                "io.cucumber.compatibilitykit",
                hasFeatureExtension()
        );
        assertThat(resources).isNotEmpty();
    }

    @Test
    void ndjsonHasBeenCopied() {
        List<Resource> resources = findAllResourcesInPackage(
                "io.cucumber.compatibilitykit",
                hasNdJsonExtension()
        );
        assertThat(resources).isNotEmpty();
    }

    private static ResourceFilter hasFeatureExtension() {
        return ResourceFilter.of(resource -> resource.getName().endsWith(".feature"));
    }

    private static ResourceFilter hasNdJsonExtension() {
        return ResourceFilter.of(resource -> resource.getName().endsWith(".ndjson"));
    }
}
