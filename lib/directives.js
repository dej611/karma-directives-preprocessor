var fs = require('fs'),
    pp = require('preprocess'),
    path = require('path');

var createDirectivesPreprocessor = function( config, helper, logger ){

  var log = logger.create('preprocessor.directives');

  config = config || {};

  var defaultOptions = {},
      defaultContext = {
        js: {}
      };

  var options = helper.merge(defaultOptions, config.options || {});
  var flags = helper.merge(defaultContext, config.flags || {});
  
  log.debug('Options', options);
  log.debug('Flags: ', flags);

  return function(content, file, done){
    
    var start = Date.now();
    log.debug('Processing "%s"', file.originalPath);

    var pathEnd = file.originalPath.lastIndexOf('\/') + 1;

    var filename = file.originalPath.substring(pathEnd);
    var type     = filename.match(/\.([0-9a-z]+)$/i)[1];

    log.debug('\tFile type "%s", Flags: "%s"', type, JSON.stringify(flags[type]));
    
    fs.readFile(file.originalPath, 'utf8', function (err, filetext) {

      if(err){
        log.error(err);
      }

      var context = flags[type] || {}

      context.src = file.originalPath;
      context.srcDir = path.dirname(context.src);

      var result = pp.preprocess(filetext, context , type || 'js');
      
      log.debug("\t[%s] Time to preprocess: %s s", filename, ((Date.now() - start) / 1000).toFixed(2));
      
      done(result);
    });
  }
}

createDirectivesPreprocessor.$inject = ['config.directivesPreprocess', 'helper', 'logger'];

module.exports = createDirectivesPreprocessor;
