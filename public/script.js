

document.getElementById('inventoryForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const nomeCliente = document.getElementById('nomeCliente').value;
    const telefone = document.getElementById('telefone').value;
    const origem = document.getElementById('origem').value;
    const destino = document.getElementById('destino').value;
    
    const items = document.querySelectorAll('.item-row');
    let itens = [];
    items.forEach(item => {
        const nome = item.querySelector('.item-nome').value;
        const qtd = item.querySelector('.item-qtd').value;
        const valor = item.querySelector('.item-valor').value;
        itens.push({ nome, qtd, valor });
    });
    
    const response = await fetch('/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomeCliente, telefone, origem, destino, itens })
    });
    
    const data = await response.json();
    const link = document.getElementById('downloadLink');
    link.href = data.url;
    link.style.display = 'block';
    link.textContent = 'Baixar PDF';
});

function addItem() {
    const container = document.getElementById('itemsContainer');
    const div = document.createElement('div');
    div.classList.add('item-row');
    div.innerHTML = `
        <input type="text" class="item-nome" placeholder="Nome do item" required>
        <input type="number" class="item-qtd" placeholder="Qtd" required>
        <input type="text" class="item-valor" placeholder="Valor R$" required>
        <button type="button" onclick="this.parentElement.remove()">Remover</button>
        <br>
    `;
    container.appendChild(div);
}

