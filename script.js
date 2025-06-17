
document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.getElementById("tabela-produtos");
    const produtos = [
        { codigo: "001", nome: "Dipirona", fabricante: "Genérico", estoque: 120, preco: "4.50" },
        { codigo: "002", nome: "Amoxicilina", fabricante: "EMS", estoque: 75, preco: "12.30" },
        { codigo: "003", nome: "Losartana", fabricante: "Medley", estoque: 200, preco: "8.90" }
    ];
    produtos.forEach(p => {
        const linha = `<tr>
            <td>${p.codigo}</td>
            <td>${p.nome}</td>
            <td>${p.fabricante}</td>
            <td>${p.estoque}</td>
            <td>R$ ${p.preco}</td>
        </tr>`;
        tabela.innerHTML += linha;
    });
});
