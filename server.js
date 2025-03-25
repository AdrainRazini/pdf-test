// server.js - Servidor Node.js para gerar PDF
const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/generate-pdf', (req, res) => {
    const { nomeCliente, telefone, origem, destino, itens } = req.body;
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, 'public', 'inventario.pdf');
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(18).text('INVENTÁRIO DE MUDANÇA', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Nome: ${nomeCliente}`);
    doc.text(`Telefone: ${telefone}`);
    doc.text(`Endereço de Origem: ${origem}`);
    doc.text(`Endereço de Destino: ${destino}`);
    doc.moveDown();

    doc.fontSize(12).text('Itens:', { underline: true });
    itens.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.nome} - Qtd: ${item.qtd} - Valor: R$ ${item.valor}`);
    });

    doc.end();
    stream.on('finish', () => {
        res.json({ url: '/inventario.pdf' });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});