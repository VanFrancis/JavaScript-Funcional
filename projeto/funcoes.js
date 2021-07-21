const fs = require('fs');
const path = require('path');


function lerDiretorio(caminho) {
    return new Promise((resolve, reject) => {
        try {
            let arquivos = fs.readdirSync(caminho)
            arquivos = arquivos.map(arquivo => path.join(caminho, arquivo))
            resolve(arquivos)
        } catch (error) {
            reject(error)
        }
    })

}
function lerArquivo(caminho) {
    return new Promise((resolve, reject) => {
        try {
            const conteudo = fs.readFileSync(caminho, { encoding: 'utf-8' })
            resolve(conteudo.toString())
        } catch (error) {
            reject(error)
        }
    })
}

function lerArquivos(caminhos) {
    return Promise.all(caminhos.map(caminho => lerArquivo(caminho)))
}

function elementosTerminadosCom(padraoTextual) {
    return function (array) {
        return array.filter(el => el.endsWith(padraoTextual))
    }
}

function removerElementosVazio(array) {
    return array.filter(el => el.trim())
}

function removerElementoIncluir(padraoTextual, array) { //remover se existir um padrao textual 
    return function (array) {
        return array.filter(el => !el.includes(padraoTextual))
    }

}

function removerElementosApenasNumero(array) {
    return array.filter(el => {
        const num = parseInt(el.trim())
        return num !== num //não vou ter um NaN
    })
}

function removerSimbolos(simbolos) {
    return function (array) {
        return array.map(el => {
            let textoSemSimbolos = el
            simbolos.forEach(simbolos => {
                textoSemSimbolos = textoSemSimbolos.split(simbolos).join('')
            })
            return textoSemSimbolos
        })
    }
}

function mesclarElementos(array) {
    return array.join(' ')
}

function separarTextoPor(simbolo) {
    return function (texto) {
        return texto.split(simbolo)
    }
}

module.exports = {
    lerDiretorio,
    lerArquivo,
    lerArquivos,
    elementosTerminadosCom,
    removerElementosVazio,
    removerElementoIncluir,
    removerElementosApenasNumero,
    removerSimbolos,
    mesclarElementos,
    separarTextoPor
}