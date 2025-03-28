import mongoose from "mongoose";


  //
const User = new mongoose.Schema(
  {
    name: String,
    email: String,
    photoUrl: String,
    role: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", User);