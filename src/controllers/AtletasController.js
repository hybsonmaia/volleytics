import Counter from "../models/Counter.js";
import Atleta from "../models/Atleta.js";

async function getNextSequence(name) {
  const counter = await Counter.findOneAndUpdate(
    { name: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

async function getAtletas(request, response) {
  try {
    const atletas = await Atleta.find();
    return response.json(atletas);
  } catch (error) {
    console.error("Erro ao buscar atletas:", error);
    return response.status(500).json({ error: "Erro ao buscar atletas" });
  }
}

async function createAtleta(request, response) {
  try {
    const atleta = request.body;

    const { passe, ataque, saque, toque } = atleta;
    const media = (passe + ataque + saque + toque) / 4;
    atleta.media = media;

    const nextId = await getNextSequence("atletaId");
    atleta.id = nextId;

    const novoAtleta = await Atleta.create(atleta);
    return response.json(novoAtleta);
  } catch (error) {
    console.error("Erro ao cadastrar atleta:", error);
    return response.status(500).json({ error: "Erro ao cadastrar atleta" });
  }
}

async function deleteAtleta(request, response) {
  const { id } = request.params;

  try {
    const atletaDeletado = await Atleta.findOneAndDelete({ id: parseInt(id) });

    if (!atletaDeletado) {
      return response.status(404).json({ error: "Atleta não encontrado" });
    }

    return response.json({ message: "Atleta deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar atleta:", error);
    return response.status(500).json({ error: "Erro ao deletar atleta" });
  }
}

export { getAtletas, createAtleta, deleteAtleta };
