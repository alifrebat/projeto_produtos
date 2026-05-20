//ADICIONAR NO BANCO DE DADOS
const salvarDados = async (objVeiculo) => {
    const endPoint = 'https://localhost:7031/api/Produto'

    try {
        const resposta = await fetch(
            endPoint, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objVeiculo)
        })

        if (!resposta.ok) {
            const txtErro = await resposta.text();
            throw new Error(txtErro);
        }

        const dados = await resposta.json()
        
        return dados

    } catch (erro) {
        console.log("ERRO AO CADASTRAR ", erro)
    }
}

//CONSULTAR PESSOAS
const consultarDados = async () => {
    const endPoint = 'https://localhost:7031/api/Produto'

    try {
        return await fetch(endPoint)
            .then(resp => resp.json())
            .catch(erro => {
                return []
            })

    } catch (erro) {
        console.log("ERRO AO CONSULTAR ", erro)
    }

}

//EXCLUIR PESSOA 
const excluirDados = async (idProduto) => {
    const endPoint = `https://localhost:7031/api/Produto/${idProduto}`

    try {
        const resposta_status = await fetch(endPoint, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })

        return resposta_status

    } catch (erro) {
        console.error("Erro ao criar:", erro)
    }
}

//ADICIONAR NO BANCO DE DADOS
const alterarDados = async (objVeiculo) => {
    const endPoint = `https://localhost:7031/api/Produto/${objVeiculo.idProduto}`

    try {
        const resposta = await fetch(
            endPoint, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objVeiculo)
        })

        if (!resposta.ok) {
            const txtErro = await resposta.text();
            throw new Error(txtErro);
        }

        const dados = await resposta.json()
        return dados

    } catch (erro) {
        console.log("ERRO AO CADASTRAR ", erro)
    }
}
export {salvarDados, consultarDados, excluirDados, alterarDados}

