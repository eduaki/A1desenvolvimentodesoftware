const tabela = document.querySelector('table tbody')

// Atualiza os cards da dashboard com dados reais da API
const apiUrl = "http://localhost:5116/api";

async function fetchCount(endpoint) {
	try {
		const res = await fetch(`${apiUrl}/${endpoint}`);
		const data = await res.json();
		return data.length;
	} catch (err) {
		console.error("Erro ao buscar", endpoint, err);
		return "--";
	}
}

const API_REQ = "http://localhost:5116/api/Requisicoes";
const API_USU = "http://localhost:5116/api/Usuarios";
const API_ITEM = "http://localhost:5116/api/Itens";
const API_TIPO = "http://localhost:5116/api/Tipos";


async function carregaQtdItens() {
	const resItem = await fetch(API_ITEM);
	const resTipo = await fetch(API_TIPO);

	const dados = await resTipo.json();
	const dadosItens = await resItem.json();	

	const tabelaNova = []

	
	dados.forEach(t => {

		dadosItens.forEach(i => {

			let quantidadeItem = 0

			if(i.iD_tipo === t.id){
				quantidadeItem++
			}


			tabelaNova.push({
				tipo: t.nome,
				quantidadeItem
			})
			
		})
	})


	tabela.innerHTML = "";


	tabelaNova.forEach(async (t) => {
		const linha = document.createElement("tr");

		linha.innerHTML = `
			<td>${t.tipo}</td>
			<td>${t.quantidadeItem}</td>
			`;
		tabela.appendChild(linha);
	});

}


async function loadDashboard() {
	const itens = await fetchCount("Itens");
	const usuarios = await fetchCount("Usuarios");
	const tipos = await fetchCount("Tipos");
	const requisicoes = await fetchCount("Requisicoes");

	document.querySelector("#card-itens p").textContent = itens;
	document.querySelector("#card-usuarios p").textContent = usuarios;
	document.querySelector("#card-tipos p").textContent = tipos;
	document.querySelector("#card-requisicoes p").textContent = requisicoes;
}

loadDashboard();
carregaQtdItens()