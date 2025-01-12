// app/api/processImage/route.js (for app directory in Next.js)
import { Client } from "@gradio/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { imageBlob, prompt } = req.body;

  try {
    const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
const exampleImage = await response_0.blob();
    const client = await Client.connect("lllyasviel/iclight-v2");
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

    return new Response(JSON.stringify(result.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
