package io.cucumber.compatibilitykit;

import io.cucumber.messages.types.Envelope;
import io.cucumber.messages.types.TestRunFinished;
import io.cucumber.messages.types.TestRunStarted;
import io.cucumber.messages.types.Timestamp;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.function.Consumer;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

class MessageOrdererTest {

    final Random random = new Random(202509221357L);
    final MessageOrderer orderer = new MessageOrderer(random);
    private final Consumer<List<Envelope>> originalOrder = orderer.originalOrder();
    private final Consumer<List<Envelope>> simulateParallelExecution = orderer.simulateParallelExecution();

    @Test
    void worksOnEmptyLists(){
        List<Envelope> t = Collections.emptyList();
        assertDoesNotThrow(() -> originalOrder.accept(t));
        assertDoesNotThrow(() -> simulateParallelExecution.accept(t));
    }

    @Test
    void worksOnListsWithoutTestRunEvents(){
        List<Envelope> t = Arrays.asList(
                Envelope.of(new TestRunStarted(new Timestamp(0L, 0), "")),
                Envelope.of(new TestRunFinished(null, false, new Timestamp(0L, 0), null, ""))
        );
        assertDoesNotThrow(() -> originalOrder.accept(t));
        assertDoesNotThrow(() -> simulateParallelExecution.accept(t));
    }
}
