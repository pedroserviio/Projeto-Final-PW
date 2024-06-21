document.getElementById("toggleMenu").addEventListener("click", function () {
	const sidebar = document.getElementById("sidebar");
    const content = document.getElementById('content');
	sidebar.classList.toggle("open-state");

	const icon = this.querySelector("i");
	if (sidebar.classList.contains("open-state")) {
		icon.classList.remove("fa-bars");
		icon.classList.add("fa-bars-staggered");
        content.classList.toggle('move-right');
	} else {
		icon.classList.remove("fa-bars-staggered");
		icon.classList.add("fa-bars");
        content.classList.remove('move-right');
	}
});

let successMessage = document.getElementById('success-message');
if (successMessage) {
	setTimeout(() => {			
		successMessage.style.display = 'none';
	}, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
    let isUserLoggedIn = false;

    // Verifica se o usuário está logado
    fetch('/usuario/dados_usuario_sessao')
    .then(response => response.json())
    .then(data => {
        if (data && !data.error) {
            isUserLoggedIn = true;
        }
    })
    .catch(error => console.error('Erro ao verificar sessão do usuário:', error));

    fetch('/listar_produtos')
        .then(response => response.json())
        .then(data => {
            const cardsContainer = document.querySelector('.cards-products');

            data.forEach(produto => {
                const card = document.createElement('div');
                card.classList.add('card', 'border-dark');
                card.style.width = '18rem';

                const img = document.createElement('img');
                img.src = produto.url; 
                img.classList.add('card-img-top');
                img.alt = produto.nome;
                card.appendChild(img);

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const titulo = document.createElement('h5');
                titulo.classList.add('card-title');
                titulo.textContent = produto.nome;
                cardBody.appendChild(titulo);

                const preco = document.createElement('p');
                preco.textContent = `R$ ${produto.preco.toFixed(2)}`;
                cardBody.appendChild(preco);

                const link = document.createElement('a');
                link.href = '#';
                link.classList.add('btn', 'btn-outline-dark');
                link.textContent = 'Adicionar ao carrinho';
                link.setAttribute('data-id', produto._id);
                link.addEventListener('click', (event) => adicionarAoCarrinho(event, isUserLoggedIn));
                cardBody.appendChild(link);

                card.appendChild(cardBody);
                cardsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
});

function adicionarAoCarrinho(event, isUserLoggedIn) {
    event.preventDefault();

    if (!isUserLoggedIn) {
        alert('Você precisa estar logado para adicionar produtos ao carrinho.');
        return;
    }

    const produtoId = event.target.getAttribute('data-id');
    console.log(produtoId);

    fetch('/carrinho/adicionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ produtoId, quantidade: 1 })
    })
    .then(response => response.json())
    .then(data => {
        showToast("Produto adicionado ao carrinho!", "#4CAF50");
    })
    .catch(error => {
        console.error('Erro ao adicionar produto ao carrinho:', error);
    });
}

function showToast(message, backgroundColor) {
    Toastify({
        text: message,
        duration: 1000,
        gravity: "top",
        backgroundColor: backgroundColor,
    }).showToast();
}