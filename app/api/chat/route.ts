import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userText, kinName, kinVibe, history, location } = await req.json();

    // System prompt to keep the AI in character
    const systemPrompt = `You are ${kinName}, a traveler in ${location}. 
Your vibe is "${kinVibe}". 
Use natural, casual travel language. 
Keep responses concise (max 2 sentences). 
Don't use overly formal language or AI clichés. 
Be helpful and friendly. 
Reference food, local spots, or travel tips related to your vibe.`;

    // Pollinations AI takes a simple GET or POST request. 
    // We'll use the OpenAI-compatible endpoint they provide for free.
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          ...history.slice(-4).map((m: any) => ({
            role: m.fromMe ? "user" : "assistant",
            content: m.text
          })),
          { role: "user", content: userText }
        ],
        model: "openai", // This defaults to a good general purpose model (usually Llama or similar)
        private: true
      })
    });

    if (!response.ok) throw new Error("AI service busy");
    
    const text = await response.text();

    return NextResponse.json({ text: text.trim() });
  } catch (error: any) {
    console.error("Pollinations AI Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
