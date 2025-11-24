const { readFileSync, writeFileSync } = require('fs');
const path = './temporary/fileA.txt'


writeFileSync(path, 'This is line 1\n')
writeFileSync(path, 'This is line 2\n', { flag: 'a' })
writeFileSync(path, 'This is line 3\n', { flag: 'a' })

const contents = readFileSync(path, 'utf8')
console.log(contents)
