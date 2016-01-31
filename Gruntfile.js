var path = require('path');
module.exports = function(grunt){
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt')
  });
};