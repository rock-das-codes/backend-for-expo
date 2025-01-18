// app/api/processImage/route.js (for app directory in Next.js)
import { Client } from "@gradio/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the incoming JSON body
    const { imageBlob, prompts } = await request.json();
  console.log("Starting process...");
  const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
  if (!response_0.ok) {
    console.log("Image fetch failed:", response_0.status, response_0.statusText);
    return new Response(JSON.stringify({ error: "Failed to fetch example image" }), { status: 500 });
  }
  const exampleImage = await response_0.blob();
  console.log("Image fetched successfully");
    if (!imageBlob) {
      return NextResponse.json(
        { error: "Both 'imageBlob' and 'prompts' are required." },
        { status: 400 }
      );
    }

    // Connect to the Gradio client
    const client = await Client.connect("lllyasviel/iclight-v2");

    // Predict using the Gradio API
    const result = await client.predict("/process", {
      input_fg: exampleImage,
      bg_source: "None",
      prompt: prompts,
      image_width: 256,
      image_height: 256,
      num_samples: 1,
      seed: 3,
      steps: 1,
      n_prompt: "Hello!!",
      cfg: 1,
      gs: 1,
      rs: 0,
      init_denoise: 0.1,
    });

    // Return the processed data
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "API is working!" },
    { status: 200 }
  );
}
