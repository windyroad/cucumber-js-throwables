import CucumberError from './cucumber-error'

class SkippedError extends CucumberError {
  constructor (...args) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    })
    Error.captureStackTrace(this, this.constructor)
  }

  cukeReturnString () {
    return 'skipped'
  }
}

export default SkippedError
