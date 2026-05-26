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
        tipoproduto: formProd.get('tipoproduto'),
        quantidade: 1
    }

    addProduto(objProduto)

    formProduto.reset()

})

//ENVIAR O OBJETO objProduto PARA O BANCO DE DADOS
const addProduto = async (objProduto) => {

    produtos.push(objProduto)

    listarProdutos()

    /* const resp = await salvarDados(objProduto)
 
     if (resp !== undefined) {
         alert('Cadastrado com Sucesso!!!')
 
         listarProdutos()
 
     } else {
         alert('Não foi possível Cadastrar!!')
     }*/

    //return resp

}

//LISTAR OS PRODUTOS 
const listarProdutos = async () => {
    divListaItem.innerHTML = ''

    //produtos = await consultarDados()

    produtos.forEach((elem, i) => {
        let total = elem.valorunitario * elem.quantidade

        const calcImposto = calcularImposto(elem.tipoproduto, parseFloat(total))

        let valorTotal = total + calcImposto
        const inputQuant = document.createElement('input')
        inputQuant.setAttribute('type', 'number')
        inputQuant.setAttribute('name', `qtde${i}`)
        inputQuant.setAttribute('id', `qtde${i}`)
        inputQuant.setAttribute('class', 'input-num-qtde')
        inputQuant.setAttribute('required', 'required')
        inputQuant.setAttribute('value', elem.quantidade)

        inputQuant.addEventListener('input', (evt) => {
            produtos[i].quantidade = parseInt(evt.target.value)
            total = elem.valorunitario * parseInt(evt.target.value)

            const spanTotal = divItemProduto.querySelector('.total')
            spanTotal.innerHTML = parseFloat(total).toFixed(2).replace('.', ',')

            valorTotal = calcImposto + total
            
            const spanValorTotal = divItemProduto.querySelector('.valorTotal')
            spanValorTotal.innerHTML = parseFloat(valorTotal).toFixed(2).replace('.', ',')
        })

        

        const divItemProduto = document.createElement('div')
        divItemProduto.setAttribute('class', 'item-produto')
        divItemProduto.innerHTML = `<span class='colTp01'>${i + 1}</span><span class='colTp02'>${elem.descricaoproduto}</span><span class='colTp03'>${parseFloat(elem.valorunitario).toFixed(2).replace(".", ",")} ${elem.unidade}</span><span class='colTp03 col-input'></span><span class='colTp01'>${elem.tipoproduto}</span><span class='colTp03 total'>${parseFloat(total).toFixed(2).replace('.', ',')}</span><span class='colTp0 ${elem.tipoproduto == 1 ? 'isento':''}'>${elem.tipoproduto != 1 ? parseFloat(calcImposto).toFixed(2).replace('.', ','): 'Isento'}</span><span class='colTp03 valorTotal'>${parseFloat(valorTotal).toFixed(2).replace('.', ',')}</span><span class='colBtn btnAlterar'></span><span class='colBtn btnExcluir'></span>`

        const btnExcluir = document.createElement('img')
        btnExcluir.setAttribute('src', 'imagens/btn_excluir.png')
        btnExcluir.setAttribute('alt', 'Excluir')
        btnExcluir.setAttribute('title', 'Excluir')

        btnExcluir.addEventListener('click', () => {
            if (confirm(`Deseja excluir ${elem.descricaoproduto}?`)) {
                excluirPessoa(elem.idprodutos)
                window.location = 'index.html'
            }
        })

        const btnAlterar = document.createElement('img')
        btnAlterar.setAttribute('src', 'imagens/btn_alterar.png')
        btnAlterar.setAttribute('alt', 'Alterar')
        btnAlterar.setAttribute('title', 'Alterar')

        btnAlterar.addEventListener('click', () => {
            carregaForm(elem)
            btnEnviar.innerHTML = 'ALTERAR'
            window.location.href = '#tito'

            sessionStorage.setItem('objPessoaId', elem.idprodutos)
        })

        // pega o span onde o input será inserido
        const spanInput = divItemProduto.querySelector('.col-input')
        const spanBtnAlterar = divItemProduto.querySelector('.btnAlterar')
        const spanBtnExcluir = divItemProduto.querySelector('.btnExcluir')

        // adiciona o input
        spanInput.appendChild(inputQuant)
        spanBtnAlterar.appendChild(btnAlterar)
        spanBtnExcluir.appendChild(btnExcluir)

        divListaItem.appendChild(divItemProduto)
    })

}

//CALCULAR IMPOSTO
const calcularImposto = (tipo, valor) => {
    let valorImposto = 0.0

    if (tipo == 1) {
        valorImposto = 0
    } else if (tipo == 2) {
        valorImposto = valor * 0.08
    } else if (tipo == 3) {
        valorImposto = valor * 0.10
    } else if (tipo == 4) {
        valorImposto = valor * 0.12
    } else {
        valorImposto = valor * 0.17
    }

    return valorImposto

}

listarProdutos()