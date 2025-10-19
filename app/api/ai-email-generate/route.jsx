import { GenerateEmailTemplateAIModel } from "@/config/AIModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const result = await GenerateEmailTemplateAIModel.sendMessage(prompt);
    const aiRes = result.response.text();
    console.log(aiRes);

    //saving the response to DB

    return NextResponse.json(JSON.parse(aiRes));
  } catch (e) {
    return NextResponse.json({error:e});
  }
}
