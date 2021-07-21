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

function elementosTerminadosCom(array, padraoTextual) {
    return array.filter(el => el.endsWith(padraoTextual))

}

function removerSeVazio(array) {
    return array.filter(el => el.trim())
}

function removerSeIncluir(array, padraoTextual) { //remover se existir um padrao textual 
    return array.filter(el => !el.includes(padraoTextual))
}

function removerApenasNumero(array) {
    return array.filter(el => {
        const num = parseInt(el.trim())
        return num !== num //não vou ter um NaN
    })
}

module.exports = {
    lerDiretorio,
    lerArquivo,
    lerArquivos,
    elementosTerminadosCom,
    removerSeVazio,
    removerSeIncluir,
    removerApenasNumero
}