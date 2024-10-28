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
    unique: true,
  },
  usuario: {
    type: String,
    unique: true,
  },
  senha: {
    type: String,
  }

});

export default mongoose.model("Organizador", organziadorSchema);