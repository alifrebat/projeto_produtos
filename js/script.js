//IMPORTANDO FUNÇÕES DO SCRIPTAPI.JS
import { salvarDados, consultarDados, excluirDados, alterarDados } from "./scriptapi.js";

//PEGANDO ELEMENTOS DO DOM
const formProduto = document.querySelector('#form-produto')
const divListaItem = document.querySelector('#div-lista-itens')

//DECLARANDO ARRAY
let produtos = []

//CAPTURANDO O EVENTO SUBMIT DO FORMULÁRIO
formProduto.addEventListener('submit', async (evt) => {
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


    addProduto(objProduto)


    formProduto.reset()

})

//ENVIAR O OBJETO objProduto PARA O BANCO DE DADOS
const addProduto = async (objProduto) => {

    const resp = await salvarDados(objProduto)

    if (resp !== undefined) {
        alert('Cadastrado com Sucesso!!!')
        
        listarProdutos()

    } else {
        alert('Não foi possível Cadastrar!!')
    }

    return resp

}

//LISTAR OS PRODUTOS 
const listarProdutos = async () => {
    divListaItem.innerHTML = ''

    produtos = await consultarDados()

    produtos.forEach((elem, i) => {
        const divItemProduto = document.createElement('div')
        divItemProduto.setAttribute('class','item-produto')
        divItemProduto.innerHTML = `${i + 1} ${elem.descricaoproduto}`


        divListaItem.appendChild(divItemProduto)
    })

}

listarProdutos()