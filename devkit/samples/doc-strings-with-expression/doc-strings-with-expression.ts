import assert from 'node:assert'
import { Given } from '@cucumber/fake-cucumber'

Given('a {string} with a doc string:', (string: string, docString: string) => {
    assert.strictEqual(string, 'Cucumber')
    assert.strictEqual(docString, 'Cucumis sativus')
})
