import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userText, kinName, kinVibe, history, location } = await req.json();
    console.log(`[AI Request] Kin: ${kinName}, User: ${userText}`);

    // System prompt to keep the AI in character
    const systemContent = `Role: You are ${kinName}, a casual traveler in ${location}. 
Vibe: ${kinVibe}. 
Rules: 
- Be conversational and concise.
- Talk like a real person traveling (mention local spots or feelings).
- Avoid AI talk like "As a language model...".
- Respond in 1-2 sentences.`;

    // Reconstruct history for the thread
    const messages = [
      { role: "system", content: systemContent },
      ...history.slice(-4).map((m: any) => ({
        role: m.fromMe ? "user" : "assistant",
        content: m.text
      })),
      { role: "user", content: userText }
    ];

    // Use Pollinations AI (OpenAI compatible POST to root)
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        model: "openai",
        private: true,
        seed: Math.floor(Math.random() * 1000) // Ensure variety
      })
    });

    if (!response.ok) {
      console.error(`Pollinations API Error: ${response.status}`);
      throw new Error("AI service too busy. Try again soon!");
    }
    
    const replyText = await response.text();
    console.log(`[AI Response] for ${kinName}: ${replyText}`);

    return NextResponse.json({ text: replyText.trim() });
  } catch (error: any) {
    console.error("Pollinations AI Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
