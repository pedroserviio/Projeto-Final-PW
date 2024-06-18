document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('table-body');

    function fetchProdutos() {
        fetch('/listar_produtos')
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = ''; // Limpa o conteúdo atual da tabela

                data.forEach(produto => {
                    const row = document.createElement('tr');

                    const acoesCell = document.createElement('td');

                    const excluirBtn = document.createElement('button');
                    excluirBtn.textContent = 'Excluir';
                    excluirBtn.className = 'btn btn-danger btn-sm';
                    excluirBtn.addEventListener('click', function () {
                        fetch(`/produto/${produto._id}`, {
                            method: 'DELETE',
                        })
                            .then(response => response.json())
                            .then(() => {
                                row.remove();
                                showToast("Produto deletado com sucesso!", "#4CAF50");
                            })
                            .catch(error => console.error('Erro ao excluir produto:', error));
                    });
                    acoesCell.appendChild(excluirBtn);

                    const editarBtn = document.createElement('button');
                    editarBtn.textContent = 'Editar';
                    editarBtn.className = 'btn btn-primary btn-sm';
                    editarBtn.value = produto._id;
                    editarBtn.addEventListener('click', function () {
                        const nome = prompt('Novo nome:', produto.nome);
                        const preco = prompt('Novo preço:', produto.preco);
                        const descricao = prompt('Nova descrição:', produto.descricao);

                        if (nome && preco || descricao) {
                            fetch(`/produto/${editarBtn.value}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ nome, preco, descricao })
                            })
                                .then(response => response.json())
                                .then(() => {
                                    produto.nome = nome; // Atualiza os dados do produto
                                    produto.preco = preco;
                                    produto.descricao = descricao;

                                    // Atualiza as células da linha na tabela
                                    nomeCell.textContent = nome;
                                    precoCell.textContent = preco;
                                    descricaoCell.textContent = descricao;

                                    showToast("Produto editado com sucesso!", "#4CAF50");
                                })
                                .catch(error => console.error('Erro ao editar produto:', error));
                        }
                    });
                    acoesCell.appendChild(editarBtn);

                    row.appendChild(acoesCell);

                    const nomeCell = document.createElement('td');
                    nomeCell.textContent = produto.nome;
                    row.appendChild(nomeCell);

                    const precoCell = document.createElement('td');
                    precoCell.textContent = produto.preco;
                    row.appendChild(precoCell);

                    const descricaoCell = document.createElement('td');
                    descricaoCell.textContent = produto.descricao;
                    row.appendChild(descricaoCell);

                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }

    fetchProdutos();

    function showToast(message, backgroundColor) {
        Toastify({
            text: message,
            duration: 3000,
            gravity: "top",
            backgroundColor: backgroundColor,
        }).showToast();
    }
});
