async function fetchAndDisplayData() {
    try {
        const response = await fetch('/dados/listar');
        const data = await response.json();

        const tableBody = document.getElementById('table-body');

        tableBody.innerHTML = '';

        // Popula a tabela com os dados dos produtos
        data.produtos.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.preco}</td>
                <td>${produto.descricao}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar e exibir dados:', error);
    }
}

window.onload = fetchAndDisplayData;