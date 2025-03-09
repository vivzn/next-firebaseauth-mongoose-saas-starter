import { NextRequest } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import connectDB from "@/connectDB"
import User from "@/models/User";


export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  await connectDB();

  const data = await User.findOne({ email });

  if(data) {
    return Response.json({data: data});
  } else {
    const data = await User.insertOne({ email, name: `Guest-${uuidv4().substring(0, 8)}`, photoUrl: "" });
    return Response.json({data: data});
  }


  

  
 
  
}
