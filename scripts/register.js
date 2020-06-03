function popularUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then( resp => resp.json() ).then( estados => {
        for(const estado of estados) {
            ufSelect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
        }
    })
}

popularUFs()

function pegarCidades(event) {
    const cidadeSelect = document.querySelector("select[name=cidade]")
    const estadoInput = document.querySelector("input[name=estado]")

    const UF = event.target.value

    const indexEstadoSelecionado = event.target.selectedIndex
    estadoInput.value = event.target.options[indexEstadoSelecionado].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`

    fetch(url).then( resp => resp.json() ).then( cidades => {
        for(const cidade of cidades) {
            cidadeSelect.innerHTML += `<option value="${cidade.id}">${cidade.nome}</option>`
        }

        cidadeSelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", pegarCidades)