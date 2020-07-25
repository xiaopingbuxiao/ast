const esprima = require('esprima')
const estraverse = require('estraverse')
const escodegen = require('escodegen')


const code = `function hello(){}`


const ast = esprima.parseScript(code)

estraverse.traverse(ast, {
  enter(node) {
    // console.log('enter -> node.type', node.type);
    if(node.type === 'Identifier'){
      node.name = 'world'
    }
  },
  leave(node) {
    // console.log('leave -> node.type', node.type);
  },
})

const result = escodegen.generate(ast)

console.log(result) // function world() {}







