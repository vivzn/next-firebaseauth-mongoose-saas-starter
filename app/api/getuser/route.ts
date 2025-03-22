import { NextRequest } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import connectDB from "@/connectDB"
import User from "@/models/User";

export async function POST(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
 

  await connectDB();

  const data = await User.findOne({ email: email });

  return Response.json(data);

  

  
 
  
}
