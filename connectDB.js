import mongoose from "mongoose";

const DATABASE_URL = "mongodb+srv://vivaancut:3CSbUcGEb1NQiYZb@mentoriaiwdhack.pudfq.mongodb.net/?retryWrites=true&w=majority&appName=mentoriaiwdhack";

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}
  //
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;