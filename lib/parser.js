
const babylon = require('babylon')
const fs = require('fs')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')
/**
 * 解析 AST 语法树
 * ES6 转换为 ES5
 * 模块分析
 */
module.exports = {
  /**
   * 源码转换为 AST 语法树
   */
  getAST: (path) => {
    console.log('getAST path', path)
    const source = fs.readFileSync(path, 'utf-8')

    return babylon.parse(source, {
      sourceType: 'module'
    })
  },
  /**
   * 获取依赖
   */
  getDependencies: (ast) => {
    const dependencies = []
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value)
      }
    })
    return dependencies
  },
  /**
   * 语法转换
   */
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['env']
    })

    return code
  }
}