import { useEffect, useState } from "react";
import MiniaturaCard from "../components/MiniaturaCard";

const Home = () => {
  const [miniaturas, setMiniaturas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/miniaturas")
      .then((res) => res.json())
      .then((data) => setMiniaturas(data))
      .catch((err) => console.error("Erro ao carregar miniaturas", err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {miniaturas.map((miniatura) => (
        <MiniaturaCard key={miniatura.id} miniatura={miniatura} />
      ))}
    </div>
  );
};

export default Home;
