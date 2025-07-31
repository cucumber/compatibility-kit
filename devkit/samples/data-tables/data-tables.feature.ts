import assert from 'node:assert'
import { DataTable, When, Then } from '../../'

When('the following table is transposed:', function (table: DataTable) {
  this.transposed = table.transpose()
})

Then('it should be:', function (expected: DataTable) {
  assert.deepStrictEqual(this.transposed.raw(), expected.raw())
})
