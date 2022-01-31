const fs = require('fs')
const prettier = require('prettier')

const content = fs.readFileSync('./template/src/a.js', 'utf8')

fs.writeFileSync('./template/src/b.js', prettier.format(content, {parser: 'babel'}))
