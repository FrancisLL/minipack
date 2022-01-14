const fs = require('fs')
const path = require('path')
const { getAST, getDependencies, transform } = require('./parser')

/**
 * 执行模块儿构建
 * 和文件的输出
 */
module.exports = class Compiler {
  /**
   * 构造函数
   */
  constructor(options) {
    const { entry, output } = options
    this._entry = entry
    this._output = output
    this._modules = []
  }

  /**
   * 运行
   */
  run() {
    const entryModule = this.buildModule(this._entry, true)
    this._modules.push(entryModule)
    this._modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this._modules.push(this.buildModule(dependency))
      })
    })
    this.emitFiles()
  }

  /**
   * 打包处理
   */
  buildModule(filename, isEntry) {
    let ast
    if (isEntry) {
      ast = getAST(filename)
    } else {
      let absolutePath = path.join(process.cwd(), './src', filename)
      ast = getAST(absolutePath)
    }

    return {
      filename,
      dependencies: getDependencies(ast),
      transformCode: transform(ast)
    }
  }

  /**
   * 输出打包后文件
   */
  emitFiles() {
    const outputPath = path.join(this._output.path, this._output.filename)
    let modules = ''
    this._modules.map((_module) => {
      modules += `'${_module.filename}': function (require, module, exports) {${ _module.transformCode }},`
    })

    const bundle = `
      (function(modules){
        function require(fileName) {
          const fn = modules[fileName]

          const module = { exports : {} };

          fn(require, module, module.exports);

          return module.exports
        }

        require('${this._entry}')
      })({${modules}})
    `
    console.log(bundle)
    fs.writeFileSync(outputPath, bundle, 'utf-8')
  }
}