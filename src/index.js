import { setDefinitionFunctionWrapper } from 'cucumber'
import CucumberError from './cucumber-error'
import PendingError from './pending-error'
import SkippedError from './skipped-error'

// from https://stackoverflow.com/a/9924463
const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,)]*))/gm
const ARGUMENT_NAMES = /([^\s,]+)/g
function getParamNames (func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '')
  let result = fnStr
    .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
    .match(ARGUMENT_NAMES)
  if (result === null) result = []
  return result
}

function stepDefinitionWrapper (fn /* options = {} */) {
  const fnArgs = getParamNames(fn)
  if (fnArgs.includes('callback')) {
    return function callbackWrapper (...args) {
      try {
        return fn.bind(this)(...args)
      } catch (e) {
        if (e instanceof CucumberError) {
          console.error(e)
          return args[args.length - 1](null, e.cukeReturnString())
        } else {
          throw e
        }
      }
    }
  }
  return async function asyncWrapper (...args) {
    try {
      return await fn.bind(this)(...args)
    } catch (e) {
      if (e instanceof CucumberError) {
        console.error(e)
        return e.cukeReturnString()
      } else {
        throw e
      }
    }
  }
}

stepDefinitionWrapper.logger = console.error

setDefinitionFunctionWrapper(stepDefinitionWrapper)

export default {
  stepDefinitionWrapper: stepDefinitionWrapper,
  CucumberError: CucumberError,
  PendingError: PendingError,
  SkippedError: SkippedError
}
