document.addEventListener('DOMContentLoaded', function () {
    fetch('/produtos')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('table-body');
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
                            Toastify({
                                text: "Produto deletado com sucesso!",
                                duration: 3000,
                                gravity: "top",
                                style: {
                                    background: "#4CAF50",
                                }
                            }).showToast();
                        })
                        .catch(error => console.error('Erro ao excluir produto:', error));
                });
                acoesCell.appendChild(excluirBtn);

                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';
                editarBtn.className = 'btn btn-primary btn-sm';
                editarBtn.addEventListener('click', function () {
                    const nome = prompt('Novo nome:', produto.nome);
                    const preco = prompt('Novo preço:', produto.preco);
                    const descricao = prompt('Nova descrição:', produto.descricao);

                    if (nome && preco && descricao) {
                        fetch(`/produto/${produto._id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ nome, preco, descricao })
                        })
                            .then(response => response.json())
                            .then(() => {
                                nomeCell.textContent = nome;
                                precoCell.textContent = preco;
                                descricaoCell.textContent = descricao;
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
});
