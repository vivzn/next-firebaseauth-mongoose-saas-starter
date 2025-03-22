import mongoose from "mongoose";


  //
const Class = new mongoose.Schema(
  {
    email: String,
    topic: String,
    info: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Class || mongoose.model("Class", Class);