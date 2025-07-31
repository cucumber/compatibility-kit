import { When, Before, After } from '../../'
import fs from 'node:fs'

Before({}, async function () {
  await this.attach(fs.createReadStream(__dirname + '/cucumber.svg'), 'image/svg+xml')
})


When('a step passes', function () {
  // no-op
})

After({}, async function () {
  await this.attach(fs.createReadStream(__dirname + '/cucumber.svg'), 'image/svg+xml')
})
