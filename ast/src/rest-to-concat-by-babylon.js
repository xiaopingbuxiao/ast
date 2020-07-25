const enerator = require('@babel/generator')
const traverse = require('@babel/traverse').default
const babylon = require('babylon')
const t = require('@babel/types')
const { default: generate } = require('@babel/generator')
const code = 'const arr = [...arr1,...arr2]'
const ast = babylon.parse(code, {
  sourceType: 'script'
})

traverse(ast, {
  enter(path) {
    const { type } = path.node
    if (type === 'ArrayExpression') {
      const node = path.node
      const isRest = node.elements.some(item => item.type === 'SpreadElement')
      if (isRest) {
        const args = node.elements.map(item => item.argument)
        const arrExpress = t.arrayExpression()
        const callee = t.memberExpression(arrExpress, t.identifier('concat'))
        const callExpress = t.callExpression(callee, args)
        path.replaceWith(callExpress)
      }
    }
    if (type === 'VariableDeclaration') {
      path.node.kind = 'var'
    }
  }
})

console.log(generate(ast).code, '转换后的代码')


