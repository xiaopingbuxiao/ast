const path = require('path')
const fs = require('fs')

const { getAst, getDependencies, transform } = require('./parser')


module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options
    this.entry = entry
    this.output = output
    this.modules = []
  }

  run() {
    const entryModule = this.buildModule(this.entry, true)
    console.log(entryModule)
    this.modules.push(entryModule)

    this.modules.map((_module) => {
      _module.dependencies.map(dependent => {
        this.modules.push(this.buildModule(dependent))
      })
    })
    this.emitFiles()

  }
  buildModule(filename, isEntry) {
    let ast;
    if (isEntry) {
      ast = getAst(filename)
    } else {
      const absolutePath = path.join(process.cwd(), './src', filename)
      ast = getAst(absolutePath)
    }
    return {
      filename,
      dependencies: getDependencies(ast),
      source: transform(ast)
    }

  }
  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename)

    let modules = ``
    this.modules.map(_module => {
      modules += `'${_module.filename}':function(require,module,exports){${_module.source}},`
    })

    const bundle = `(function(modules){
      function require(filename){
        var fn = modules[filename]
        var module = {export:{}};
        fn(require,module,module.export)
        return module.export
      }
      require('${this.entry}')
    })({${modules}});`
    console.log(bundle)
    fs.writeFileSync(outputPath, bundle, 'utf-8')

  }

}