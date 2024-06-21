document.addEventListener('DOMContentLoaded', function() {
  fetch('/carrinho/itens')
    .then(response => response.json())
    .then(data => {
      renderCartItems(data);
    })
    .catch(error => console.error('Erro ao carregar itens do carrinho:', error));

  document.getElementById('finalizar-compra').addEventListener('click', function() {
    fetch('/pedidos/criar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
      showToast("Pedido enviado!", "#4CAF50");
      clearCart();
      renderCartItems([]);
    })
    .catch(error => console.error('Erro ao enviar pedido:', error));
  });
});

function renderCartItems(data) {
  const tabelaCarrinho = document.querySelector('#carrinho tbody');
  tabelaCarrinho.innerHTML = ''; // Clear existing items
  let total = 0;

  if (data.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.setAttribute('colspan', '3');
    cell.textContent = 'Não há itens no carrinho';
    cell.style.textAlign = 'center';
    row.appendChild(cell);
    tabelaCarrinho.appendChild(row);
  } else {
    data.forEach(item => {
      const row = document.createElement('tr');

      const cellNome = document.createElement('td');
      cellNome.textContent = item.nome;
      row.appendChild(cellNome);

      const cellQuantidade = document.createElement('td');
      cellQuantidade.textContent = item.quantidade;
      row.appendChild(cellQuantidade);

      const cellPreco = document.createElement('td');
      cellPreco.textContent = `R$ ${item.produto.preco.toFixed(2)}`;
      row.appendChild(cellPreco);

      tabelaCarrinho.appendChild(row);

      total += item.produto.preco * item.quantidade;
    });
  }

  document.getElementById('valor-total').textContent = `R$ ${total.toFixed(2)}`;
}

function clearCart() {
  const tabelaCarrinho = document.querySelector('#carrinho tbody');
  tabelaCarrinho.innerHTML = ''; // Clear the cart table
  document.getElementById('valor-total').textContent = 'R$ 0.00';
}

function showToast(message, backgroundColor) {
  Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      backgroundColor: backgroundColor,
  }).showToast();
}
