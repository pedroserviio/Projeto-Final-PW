document.addEventListener('DOMContentLoaded', function() {
    fetch('/usuario/dados_usuario_sessao')
        .then(response => response.json())
        .then(data => {
            if (data) {
                document.getElementById('nome').value = data.nome;
                document.getElementById('email').value = data.email;
                
            } else {
                alert('Erro ao carregar dados do usuário');
            }
        })
        .catch(error => console.error('Erro:', error));
});

document.getElementById('editarForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch('/usuario/editar_usuario', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            window.location.href = '/';
        } else if (data.error) {
            alert(data.error);
        }
    })
    .catch(error => console.error('Erro:', error));
});