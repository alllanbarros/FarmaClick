document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.getElementById("tabela-produtos");

    fetch("https://farmaclick-backend-production.up.railway.app/estoque")
        .then(response => response.json())
        .then(produtos => {
            produtos.forEach(p => {
                const linha = `<tr>
                    <td>${p.codigo}</td>
                    <td>${p.nome}</td>
                    <td>${p.fabricante}</td>
                    <td>${p.estoque}</td>
                    <td>R$ ${p.preco.toFixed(2)}</td>
                </tr>`;
                tabela.innerHTML += linha;
            });
        })
        .catch(error => {
            console.error("Erro ao buscar produtos:", error);
            tabela.innerHTML += `<tr><td colspan="5">Erro ao carregar os produtos.</td></tr>`;
        });
});