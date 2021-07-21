const fs = require('fs');
const path = require('path');

function lerDiretorio(caminho) {
    return new Promise((resolve, reject) => {
        try {
            const arquivos = fs.readdirSync(caminho)
            const arquivosCompletos = arquivos.map(arquivo => {
                return path.join(caminho, arquivo)
            })
            resolve(arquivosCompletos)
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
            return simbolos.reduce((acc, simbolo) => {
                return acc.split(simbolo).join('')
            }, el)
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

function agruparElementos(palavras) {
    return Object.values(palavras.reduce((acc, palavra) => {
        const el = palavra.toLowerCase()
        const qtde = acc[el] ? acc[el].qtde + 1 : 1
        acc[el] = { elemento: el, qtde }
        return acc
    }, {}))
}

function ordernarPorAtribNumerico(attr, ordem = 'asc') {
    return function (array) {
        const asc = (obj1, obj2) => obj1[attr] - obj2[attr]
        const desc = (obj1, obj2) => obj2[attr] - obj1[attr]
        return [...array].sort(ordem === 'asc' ? asc : desc)
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
    separarTextoPor,
    agruparElementos,
    ordernarPorAtribNumerico
}