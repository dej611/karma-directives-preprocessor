# karma-directives-preprocessor

> Generate multiple versions of the same file with C-style directives.

## Installation

The easiest way is to keep `karma-directives-preprocessor` as a devDependency in your `package.json`.  
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-directives-preprocessor": "~0.0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-directives-preprocessor --save-dev
```

## Configuration
Following code shows the default configuration...
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    files: [
      'src/**/*.js',
      'test/**/*.js'
    ],


    preprocessors: {
      // source files, that you wanna preprocess with directives
      'src/*.js': ['directives']
    },

    directivesPreprocess: {
      flags: {
        'js'  : {myflag: true, otherFlag: true }
      } 
    },

    ...
  });
};
```

### Supported filet

Karma-directives is based on [preprocess] and it does support any filetype.

For each filetype is possible to pass a different set of flags:

```js
directivesPreprocess: {
  flags: {
    'js'  : {flag1: true, flag2: true },
    'html': {flag3: true },
    'css' : {flag4: true }
  } 
},
```
 
----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
[preprocess]: https://github.com/jsoverson/preprocess
