const fs = require('fs')
const babylon = require('babylon')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')


module.exports = {

  getAst(path) {
    const source = fs.readFileSync(path, 'utf-8')
    return babylon.parse(source, {
      sourceType: 'module'
    })
  },
  getDependencies(ast) {
    const dependencies = []
    traverse(ast, {
      ImportDeclaration({ node }, state) { // 如果是 import 的 语法会触发这个钩子函数
        const dependent = node.source.value // import 的语法树上面会有一个 value 代表需要的依赖
        dependencies.push(dependent)
      }
    })
    return dependencies
  },
  transform(ast) {
    const { code, map } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code
  }
}