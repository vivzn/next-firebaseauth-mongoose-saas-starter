import { NextRequest } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import connectDB from "@/connectDB"
import Class from "@/models/Class";

export async function POST(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const topic = searchParams.get("topic");
  const info = searchParams.get("info");

  await connectDB();

  const data = await Class.insertOne({email, topic, info})


  return Response.json(data);


  

  
 
  
}
