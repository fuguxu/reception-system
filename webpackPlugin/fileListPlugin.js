
function FileListPlugin(options){
    let opt = options || {};
    this.text = opt.text;
}

FileListPlugin.prototype.apply = function (compiler) {
    // console.log(compiler);
    compiler.plugin('emit', (compilation, callback)=> {
        // Create a header string for the generated file:
        let filelist = `In this build:${this.text}\n\n`;

        // Loop through all compiled assets,
        // adding a new line item for each filename.
        // console.log(compilation);
        console.log(compilation.assets);
        for (let filename in compilation.assets) {
            if (filename) filelist += ('- ' + filename + '\n');
        }

        // Insert this list into the webpack build as a new file asset:
        compilation.assets['filelist.md'] = {
            source: function () {
                return filelist;
            },
            size: function () {
                return filelist.length;
            }
        };

        callback();
    });
};

module.exports = FileListPlugin;