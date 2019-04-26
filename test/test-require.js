const { CucumberError, PendingError } = require('../lib/index')

function test () {
  try {
    throw new PendingError()
  } catch (e) {
    if (e instanceof CucumberError) {
      return
    }
    console.error('failed')
    throw e
  }
}

test()
