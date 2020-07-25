const babel = require('@babel/core')
// const code = 'const a = (str) => str '
// const transformArrowFunction = require('./transform-arrow-function')

const restToConcat = require('./rest-to-concat')



const code = 'const arr = [...arr1,...arr2]'

const result = babel.transform(code, {
  // plugins:["@babel/plugin-transform-arrow-functions"]
  // plugins: [transformArrowFunction]
  plugins: [restToConcat]
})
console.log(result.code, '转换后的代码')

