// app/api/processImage/route.js (for app directory in Next.js)
import { Client } from "@gradio/client";

export async function POST(req) {
  const { imageBlob, prompt } = await req.json();

  try {
    const client = await Client.connect("lllyasviel/iclight-v2");
    const result = await client.predict("/process", {
      input_fg: imageBlob,
      bg_source: "None",
      prompt:prompt,
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

    return new Response(JSON.stringify(result.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
