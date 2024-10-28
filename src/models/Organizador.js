import mongoose from "mongoose";

const organziadorSchema = new mongoose.Schema({

  organizadorId: {
    type: Number,
    unique: true,
  },
  nome: {
    type: String,
  },
  email: {
    type: String,
  },
  senha: {
    type: String,
  }

  //NOME, EMAIL, SENHA

});

export default mongoose.model("Organizador", organziadorSchema);