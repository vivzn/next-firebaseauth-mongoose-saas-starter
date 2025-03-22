import { NextRequest } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import connectDB from "@/connectDB"
import User from "@/models/User";


export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const photo = searchParams.get("photo");

  await connectDB();

  const data = await User.findOne({ email });

  if(data) {
    return Response.json({data: data});
  } else {
    const data = await User.insertOne({ email, name: name ?? "", photoUrl: photo ?? "", role: "" });
    return Response.json({data: data});
  }


  

  
 
  
}
