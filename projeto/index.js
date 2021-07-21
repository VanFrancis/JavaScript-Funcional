const path = require('path')
const fn = require('./funcoes')

const caminho = path.join(__dirname, '..', 'legendas')

fn.lerDiretorio(caminho)
    .then(fn.elementosTerminadosCom('.srt'))
    .then(fn.lerArquivos) //retorna array com todo o texto
    .then(conteudos => conteudos.join('\n')) //juntou tudo em uma string
    .then(todoConteudo => todoConteudo.split('\n')) //separando as linhas
    .then(fn.removerElementosVazio)
    .then(fn.removerElementoIncluir('-->'))
    .then(fn.removerElementosApenasNumero)
    .then(console.log)