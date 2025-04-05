import { NextResponse } from "next/server";
import axios from "axios";
import { LANGUAGE_VERSIONS } from "@/lib/constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export async function POST(req) {
  try {
    const { language, sourceCode } = await req.json();

    const response = await API.post("/execute", {
      language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Server API Error:", error);
    return NextResponse.json(
      { error: "Failed to execute code" },
      { status: 500 }
    );
  }
}
