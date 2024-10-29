import Counter from "../models/Counter.js";
import Organizador from "../models/Organizador.js";
import Pelada from "../models/Pelada.js";

async function getNextSequence(name) {
  const counter = await Counter.findOneAndUpdate(
    { name: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

async function getOrganizadores(request, response) {
  try {
    const organizadores = await Organizador.find().populate({
      path: "peladas",
      model: "Pelada"
    });

    return response.json(organizadores);
  } catch (error) {
    console.error("Erro ao obter organizadores:", error);
    return response.status(500).json({ error: "Erro ao obter organizadores" });
  }
}

async function createOrganizador(request, response) {
  try {
    const { nome, email, usuario, senha } = request.body;

    const novoOrganizador = await Organizador.create({
      organizadorId: await getNextSequence("organizadorId"),
      nome,
      email,
      usuario,
      senha,
      peladas: [],
    });

    const pelada = await Pelada.create({
      peladaId: await getNextSequence("peladaId"),
      organizador: novoOrganizador._id,
      atletas: [],
    });

    novoOrganizador.peladas.push(pelada._id);
    await novoOrganizador.save();

    await novoOrganizador.populate({
      path: "peladas",
      model: "Pelada",
    });

    return response.json({
      message: "Organizador e pelada criados com sucesso!",
      organizador: novoOrganizador,
    });
  } catch (error) {
    console.error("Erro ao cadastrar organizador e pelada:", error);
    return response.status(500).json({ error: "Erro ao cadastrar organizador e pelada" });
  }
}



async function deleteOrganizador(request, response) {
  const { id } = request.params;

  try {
    const organizadorDeletado = await Organizador.findOneAndDelete({ organizadorId: parseInt(id) });

    if (!organizadorDeletado) {
      return response.status(404).json({ error: "Organizador não encontrado" });
    }

    return response.json({ message: "Organizador deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar organizador:", error);
    return response.status(500).json({ error: "Erro ao deletar organizador" });
  }
}

async function deleteAllOrganizadores(request, response) {
  try {
    const resultado = await Organizador.deleteMany({});

    if (resultado.deletedCount === 0) {
      return response.status(404).json({ message: "Nenhum organizador encontrado para deletar." });
    }

    return response.json({ message: "Todos os organizadores foram deletados com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar todos organizadores:", error);
    return response.status(500).json({ error: "Erro ao deletar todos organizadores" });
  }
}


export { getOrganizadores, createOrganizador, deleteOrganizador, deleteAllOrganizadores };
