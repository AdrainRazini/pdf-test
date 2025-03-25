const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static('public')); // Para servir arquivos HTML e JS

app.post('/generate-pdf', (req, res) => {
    const { nome, idade, cidade } = req.body; // Dados recebidos do frontend

    const doc = new PDFDocument();
    const fileName = `output.pdf`;
    const filePath = `./public/${fileName}`;

    doc.pipe(fs.createWriteStream(filePath));

    // Criando um layout com bloquinhos
    doc.fontSize(20).text('Dados do Usuário', { align: 'center' });

    doc.rect(50, 100, 500, 30).stroke();
    doc.text(`Nome: ${nome}`, 60, 110);

    doc.rect(50, 150, 500, 30).stroke();
    doc.text(`Idade: ${idade}`, 60, 160);

    doc.rect(50, 200, 500, 30).stroke();
    doc.text(`Cidade: ${cidade}`, 60, 210);

    doc.end();

    res.json({ url: `/${fileName}` }); // Retorna a URL do PDF
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

