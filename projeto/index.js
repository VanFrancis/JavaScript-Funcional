const path = require('path')
const fn = require('./funcoes')

const caminho = path.join(__dirname, '..', 'legendas')

fn.lerDiretorio(caminho)
    .then(arquivos => fn.elementosTerminadosCom(arquivos, '.srt'))
    .then(arquivosSTR => fn.lerArquivos(arquivosSTR)) //retorna array com todo o texto
    .then(conteudos => conteudos.join('\n')) //juntou tudo em uma string
    .then(todoConteudo => todoConteudo.split('\n')) //separando as linhas
    .then(linhas => fn.removerSeVazio(linhas))
    .then(console.log)