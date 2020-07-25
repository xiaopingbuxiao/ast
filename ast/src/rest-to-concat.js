module.exports = function ({ types: t }) {
  return {
    visitor: {
      VariableDeclaration(path, state) { // 将 const 转换为 var
        path.node.kind = 'var'
      },
      ArrayExpression(path, state) {
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
    },
  }
}



