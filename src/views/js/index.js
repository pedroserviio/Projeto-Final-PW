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
                cardBody.appendChild(link);

                card.appendChild(cardBody);
                cardsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
});
