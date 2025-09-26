package io.cucumber.compatibilitykit;

import org.junit.jupiter.api.Test;
import org.junit.platform.commons.support.Resource;

import java.util.List;
import java.util.function.Predicate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.platform.commons.support.ReflectionSupport.findAllResourcesInPackage;

class SamplesTest {
    
    @Test
    void featuresHaveBeenCopied(){
        List<Resource> resources = findAllResourcesInPackage(
                "io.cucumber.compatibilitykit", 
                hasFeatureExtension()
        );
        assertThat(resources).isNotEmpty();
    }
    
    @Test
    void ndjsonHasBeenCopied(){
        List<Resource> resources = findAllResourcesInPackage(
                "io.cucumber.compatibilitykit",
                hasNdJsonExtension()
        );
        assertThat(resources).isNotEmpty();
    }

    private static Predicate<Resource> hasFeatureExtension() {
        return resource -> resource.getName().endsWith(".feature");
    }

    private static Predicate<Resource> hasNdJsonExtension() {
        return resource -> resource.getName().endsWith(".ndjson");
    }
}
