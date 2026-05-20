//IMPORTANDO FUNÇÕES DO SCRIPTAPI.JS
import { salvarDados, consultarDados, excluirDados, alterarDados } from "./scriptapi.js";

//PEGANDO ELEMENTOS DO DOM
const formProduto = document.querySelector('#form-produto')

//DECLARANDO ARRAY
let produtos = []

//CAPTURANDO O EVENTO SUBMIT DO FORMULÁRIO
formProduto.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const formProd = new FormData(formProduto)

    let objProduto = {
        idprodutos: 0,
        descricaoproduto: formProd.get('descricaoproduto'),
        caracteristicasproduto: formProd.get('caracteristicasproduto'),
        valorunitario: formProd.get('valorunitario'),
        unidade: formProd.get('unidade'),
        tipoproduto: formProd.get('tipoproduto')
    }

    console.log(addProduto(objProduto))

    formProduto.reset()

})

const addProduto = async (objProduto) => {

    const resp = await salvarDados(objProduto)

    return resp

}
