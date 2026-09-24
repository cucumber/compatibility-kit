import assert from 'node:assert'
import {DataTable, Given} from '@cucumber/fake-cucumber'

Given('a {string} with a table', function (string: string, table: DataTable) {
  assert.strictEqual(string, 'Cucumber')
  assert.deepStrictEqual(table, new DataTable([['Species', 'Cucumis sativus']]))
})
