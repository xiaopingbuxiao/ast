const path = require('path')
const { getAst, getDependencies, transform } = require('./parser')




const testAst = getAst(path.join(__dirname, '../src/index.js'))

console.log(getDependencies(testAst))


console.log(transform(testAst))