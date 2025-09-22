package io.cucumber.compatibilitykit;

import org.junit.jupiter.api.Test;
import org.junit.platform.commons.support.Resource;
import org.junit.platform.commons.support.scanning.ClasspathScanner;
import org.junit.platform.commons.support.scanning.DefaultClasspathScanner;
import org.junit.platform.commons.util.ClassLoaderUtils;
import org.junit.platform.commons.util.ReflectionUtils;

import java.util.List;
import java.util.function.Predicate;

import static org.assertj.core.api.Assertions.assertThat;

class SamplesTest {
    
    final ClasspathScanner classpathScanner = new DefaultClasspathScanner(
            ClassLoaderUtils::getDefaultClassLoader, 
            ReflectionUtils::tryToLoadClass
    );
    
    @Test
    void samplesHaveBeenCopied(){
        List<Resource> resources = classpathScanner.scanForResourcesInPackage(
                "io.cucumber.compatibilitykit",
                hasFeatureExtension()
        );
        assertThat(resources).isNotEmpty();
    }

    private static Predicate<Resource> hasFeatureExtension() {
        return resource -> resource.getName().endsWith(".feature");
    }
}
