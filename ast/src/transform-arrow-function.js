module.exports = function ({ types: t }) {
  return {
    visitor: {
      ArrowFunctionExpression(path, state) { // 转换箭头函数
        const node = path.node
        // 拿到函数的参数
        const params = node.params;
        const returnStatement = t.returnStatement(node.body);
        const blockStatement = t.blockStatement([returnStatement]);
        const functionExpression = t.functionExpression(null, params, blockStatement);
        path.replaceWith(functionExpression);
      },
      VariableDeclaration(path,state){ // 将 const 转换为 var
        path.node.kind = 'var'
      }
    }
  }
}
