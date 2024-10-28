import mongoose from "mongoose";

const peladaSchema = new mongoose.Schema({
  peladaId: {
    type: Number,
    unique: true,
  },
  organizadorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizador'
  }
});

export default mongoose.model("Pelada", peladaSchema);
