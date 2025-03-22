import { NextRequest } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import connectDB from "@/connectDB"
import Class from "@/models/Class";

export async function POST(request: NextRequest) {

 

  await connectDB();

  const data = await Class.find();

  return Response.json(data);


  

  
 
  
}
