const path = require('path');

class watchFilePlugin {

  constructor(opts){
    this.opts = opts || {};
  }


   apply(compiler){
    compiler.plugin('after-compile',(compilation, callback)=>{
      console.log(compilation.fileDependencies instanceof Array);
      console.log(compilation.fileDependencies instanceof Object);
      console.log(path.join(__dirname, '../static/index.html'));
      [].push.call(compilation.fileDependencies,this.opts.url || path.join(__dirname, '../static/index.html'));
      console.log(compilation.fileDependencies);
      // compilation.fileDependencies[path.join(__dirname, '../static/index.html')] = this.opts.url || path.join(__dirname, '../static/index.html');
      callback();
    });
  }
}

module.exports = watchFilePlugin;