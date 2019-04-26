import { CucumberError } from './cucumber-error'
export class SkippedError extends CucumberError {
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
