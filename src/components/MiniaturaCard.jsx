import { useEffect, useState } from "react";

const MiniaturaCard = ({ miniatura }) => {
  const [curtidas, setCurtidas] = useState(miniatura.curtidas || 0);
  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Verificando se a miniatura e a imagem foram recebidas corretamente
  console.log("Miniatura recebida:", miniatura);

  useEffect(() => {
    fetch(`http://localhost:8080/api/comentarios/${miniatura.id}`)
      .then((res) => res.json())
      .then((data) => setComentarios(data))
      .catch((err) => console.error("Erro ao carregar comentários", err));
  }, [miniatura.id]);

  const curtirMiniatura = () => {
    setCurtidas((prev) => prev + 1);
  };

  const comentarMiniatura = () => {
    if (!comentario.trim()) return;

    fetch(`http://localhost:8080/api/comentarios/${miniatura.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ usuario: "Usuário", mensagem: comentario }),
    })
      .then(() => {
        setComentarios([...comentarios, { usuario: "Usuário", mensagem: comentario }]);
        setComentario("");
      })
      .catch((err) => console.error("Erro ao comentar", err));
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      {/* Exibir a imagem apenas se existir uma URL válida */}
      {miniatura.imagemUrl ? (
        <img
          src={miniatura.imagemUrl}
          alt={miniatura.nome}
          className="w-full h-48 object-cover rounded"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500">
          Imagem não disponível
        </div>
      )}

      <h2 className="text-xl font-bold mt-2">{miniatura.nome}</h2>
      <p>{miniatura.descricao || "Sem descrição disponível"}</p>

      <div className="mt-2">
        <button
          onClick={curtirMiniatura}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Curtir ({curtidas})
        </button>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Ver Detalhes
        </button>
      </div>

      {/* Campo de comentário */}
      <div className="mt-2">
        <input
          type="text"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Digite um comentário"
          className="border p-2 w-full mt-2"
        />
        <button
          onClick={comentarMiniatura}
          className="bg-green-500 text-white p-2 rounded w-full mt-2"
        >
          Comentar
        </button>
      </div>

      {/* Modal de detalhes */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold">{miniatura.nome}</h2>
            <p>{miniatura.descricao || "Sem descrição disponível"}</p>

            <button
              onClick={() => setModalOpen(false)}
              className="bg-red-500 text-white p-2 rounded mt-2"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniaturaCard;
