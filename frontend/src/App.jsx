import React, { useEffect, useState } from "react";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    fetch("https://farmaclick-backend-production.up.railway.app/estoque")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch(() => alert("Erro ao carregar produtos."));
  }, []);

  const adicionarQuantidade = (codigo, valor) => {
    setQuantidades((prev) => ({ ...prev, [codigo]: valor }));
  };

  const gerarOrcamento = () => {
    const selecionados = produtos.filter(p => quantidades[p.codigo] > 0);
    if (selecionados.length === 0) return alert("Nenhum produto selecionado.");
    let texto = "*Pedido FarmaClick*%0A";
    let total = 0;
    selecionados.forEach(p => {
      const qtd = parseInt(quantidades[p.codigo]);
      const subtotal = qtd * p.preco;
      total += subtotal;
      texto += `• ${p.produto} | ${qtd} und. | R$ ${p.preco.toFixed(2)} = R$ ${subtotal.toFixed(2)}%0A`;
    });
    texto += `%0A*Total: R$ ${total.toFixed(2)}*`;
    window.open(`https://wa.me/558596869664?text=${texto}`, "_blank");
  };

  const produtosFiltrados = produtos.filter(p =>
    p.produto.toLowerCase().includes(pesquisa.toLowerCase()) ||
    p.codigo.includes(pesquisa)
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">FarmaClick</h1>
      <input
        type="text"
        placeholder="Buscar produto ou código..."
        className="w-full p-2 border rounded mb-4"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />
      <div className="grid gap-4">
        {produtosFiltrados.map((p) => (
          <div key={p.codigo} className="border rounded-lg p-4 shadow">
            <div className="font-semibold">{p.produto}</div>
            <div className="text-sm text-gray-500">{p.fabricante}</div>
            <div className="text-sm">Estoque: {p.estoque}</div>
            <div className="text-sm">Preço: R$ {p.preco.toFixed(2)}</div>
            <input
              type="number"
              min="0"
              className="mt-2 w-full border rounded p-1"
              placeholder="Qtd"
              value={quantidades[p.codigo] || ""}
              onChange={(e) => adicionarQuantidade(p.codigo, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button
        onClick={gerarOrcamento}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Enviar Orçamento via WhatsApp
      </button>
    </div>
  );
}

export default App;