import mongoose from "mongoose";

const peladaSchema = new mongoose.Schema({
  peladaId: {
    type: Number,
    unique: true,
  },
  organizador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizador',
  },
  atletas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Atleta',
    },
  ],
});

export default mongoose.model("Pelada", peladaSchema);
