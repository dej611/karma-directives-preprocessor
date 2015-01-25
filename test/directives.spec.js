var expect     = require('expect.js'),
    directives = require("../lib/directives");

describe('Preprocessor directives', function () {
  
  // Create a fake helper
  var helper = {
        merge: function(a, b){
          if(!a) return b;
          for( var p in b ){
            a[p] = b[p];
          }
          return a;
        }
      },
  // Create a fake logger
      logger = {
        create: function() {
          return {
            debug: function() {},
            error: function() {}
          };
        }
      };

  describe('Create production code', function(){

    var preprocessor;

    beforeEach(function(){
        // Test setup
      var config = {
        // Flags to set
        flags:{
          js: {production: true}
        }
      };
      preprocessor = directives(config, helper, logger);
    });

    it('should take out development function from the file', function (done) {

      var expectedContent = 'define([], function () {\n  "use strict";\n\n  superQuickFunction();\n  \n});\n';
    
      var file = {originalPath: __dirname + '/fixtures/simple.js' };

      preprocessor('', file, function (processedContent){
        expect(processedContent).to.equal(expectedContent);
        done();
      });
      
    });

    it('should work also with the include directive', function (done){

      var expectedContent = 'define([], function () {\n  "use strict";\n\n  superQuickFunction();\n    superQuickIncludedFunction();\n  \n});';

      var file = {originalPath: __dirname + '/fixtures/include_version.js' };

      preprocessor('', file, function (processedContent){
        expect(processedContent).to.equal(expectedContent);
        done();
      });
    });

    it('should work also with the include directive', function (done){

      var expectedContent = 'define([], function () {\n  "use strict";\n\n    superQuickIncludedFunction();\n  \n});';

      var file = {originalPath: __dirname + '/fixtures/include_subfolder.js' };

      preprocessor('', file, function (processedContent){
        expect(processedContent).to.equal(expectedContent);
        done();
      });
    });

  });

});
