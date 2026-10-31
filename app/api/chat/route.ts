import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = "force-dynamic";

function buildFallbackReply(kinName: string, location: string, userText: string): string {
  const lower = userText.toLowerCase();
  if (lower.includes("surf") || lower.includes("wave") || lower.includes("cloud 9")) {
    return `Tide looks clean at ${location} right now! I'm heading toward the boardwalk in 20 mins if you want to paddle out together.`;
  }
  if (lower.includes("food") || lower.includes("eat") || lower.includes("dinner") || lower.includes("lunch")) {
    return `I'm definitely keen to grab food in ${location}—there's a great coastal spot near the pier where the crew splits grilled catch of the day.`;
  }
  if (lower.includes("boat") || lower.includes("lagoon") || lower.includes("tour")) {
    return `We still have 2 spots left on our early outrigger from ${location} tomorrow morning! Shall I hold a seat for you?`;
  }
  return `Sounds like a plan! I'm just wrapping up near ${location}—drop a Trust Handshake pin whenever you're ready to link up.`;
}

export async function POST(req: Request) {
  let kinName = "Suki";
  let location = "General Luna, Siargao";
  let userText = "";

  try {
    const body = await req.json();
    userText = String(body?.userText || "").trim();
    kinName = String(body?.kinName || "Suki");
    const kinVibe = String(body?.kinVibe || "Island Explorer");
    location = String(body?.location || "General Luna, Siargao");
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!userText) {
      return NextResponse.json({ text: "Hey! Let me know where you're heading on the island today." });
    }

    const systemContent = `Role: You are ${kinName}, a friendly verified solo traveller in ${location}.
Vibe: ${kinVibe}.
Rules:
- Be conversational, warm, and concise (1-2 sentences).
- Mention real local details in ${location} naturally.
- Use British English spelling.`;

    // 1. Optional Gemini API path if GEMINI_API_KEY is configured in Vercel
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `${systemContent}\n\nRecent chat:\n${history
          .slice(-4)
          .map((m: any) => `${m.fromMe ? "Traveller" : kinName}: ${m.text}`)
          .join("\n")}\nTraveller: ${userText}\n${kinName}:`;
        const result = await model.generateContent(prompt);
        const reply = result.response.text().trim();
        if (reply) {
          return NextResponse.json({ text: reply });
        }
      } catch (geminiErr) {
        console.warn("Gemini API fallback triggered:", geminiErr);
      }
    }

    // 2. Pollinations AI with strict 6-second AbortController timeout for Vercel Hobby compatibility
    const messages = [
      { role: "system", content: systemContent },
      ...history.slice(-4).map((m: any) => ({
        role: m.fromMe ? "user" : "assistant",
        content: String(m.text || ""),
      })),
      { role: "user", content: userText },
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        signal: controller.signal,
        body: JSON.stringify({
          messages,
          model: "openai",
          private: true,
          seed: Math.floor(Math.random() * 1000),
        }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const replyText = (await response.text()).trim();
        if (replyText) {
          return NextResponse.json({ text: replyText });
        }
      }
    } catch {
      clearTimeout(timeoutId);
    }

    // 3. Deterministic persona fallback so Vercel never returns 500/504
    return NextResponse.json({
      text: buildFallbackReply(kinName, location, userText),
    });
  } catch {
    return NextResponse.json({
      text: buildFallbackReply(kinName, location, userText),
    });
  }
}
