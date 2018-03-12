var dict = require('fs').readFileSync('./english.txt').toString().split('\n').reduce((words, word) => {words[word] = true; return words}, {})
