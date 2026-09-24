import assert from 'node:assert'
import { DataTable, Given } from '@cucumber/fake-cucumber'

Given('a step with a data table a doc string', (table: DataTable, string: string) => {
  assert.deepStrictEqual(table, new DataTable([['hello']]))
  assert.deepStrictEqual(string, 'world')
})

Given('a step with a doc string a data table', (string: string, table: DataTable) => {
  assert.deepStrictEqual(string, 'hello')
  assert.deepStrictEqual(table, new DataTable([['world']]))
})
