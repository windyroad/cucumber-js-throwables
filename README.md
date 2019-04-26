# cucumber-js-throwables

Provides `Error` classes for [cucumber-js](https://github.com/cucumber/cucumber-js) that can be used to generate `pending` and `skipped` results

# Why

I used to heavily use `PendingException` when writing Java code as it allowed me to focus on the task at hand. For everything else, (methods not implemented or branches not implemented) I'd just throw a `PendingException`.

This isn't as doable in [cucumber-js](https://github.com/cucumber/cucumber-js), because in the step definition, you either need to `return 'pending'` (for no callback) or call ``

# Usage

## Add Wrapper

In your `world.js` (or similar) add

```
import { stepDefinitionWrapper } from '@windyroad/cucumber-js-throwables'
import { setDefinitionFunctionWrapper } from 'cucumber'

setDefinitionFunctionWrapper(stepDefinitionWrapper)
```

## Use Errors

```
import { PendingError, SkippedError } from '@windyroad/cucumber-js-throwables'
```

You can now call

```
throw new PendingError();
```

and

```
throw new SkippedError();
```

in you code instead of having to return `'pending'` or `'skipped'`, or call `callback(null, 'pending')` or `callback(null, 'skipped')`

## Snippets

Add

```
--format-options '{\"snippetInterface\": \"async-await\", \"snippetSyntax\": \"./node_modules/@windyroad/cucumber-js-throwables/lib/custom-cucumber-syntax.js\"}'
```

in your cucumber-js command
