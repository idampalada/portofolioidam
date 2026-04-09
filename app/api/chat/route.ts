import { NextRequest } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { session_id, name, email, message } = body;

    console.log("USER MESSAGE:", message);

    // =========================
    // SIMPAN USER MESSAGE
    // =========================
    await supabase.from("messages").insert([
      {
        session_id,
        name,
        email,
        sender: "user",
        message,
      },
    ]);

    // =========================
    // AMBIL FAQ
    // =========================
    const { data: faqs } = await supabase
      .from("faq")
      .select("question, answer");

    // =========================
    // FORMAT FAQ (JADI KNOWLEDGE)
    // =========================
    const faqContext =
      faqs?.map((f: any) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n") ||
      "";

    // =========================
    // PANGGIL AI (HYBRID MODE)
    // =========================
    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `
Kamu adalah AI assistant di website portfolio Idam.

🎯 TUGAS KAMU:
- Jawab SEMUA pertanyaan user (umum atau spesifik)
- Jika pertanyaan tentang Idam → gunakan data FAQ
- Jika bukan tentang Idam → jawab seperti ChatGPT biasa

📚 DATA TENTANG IDAM:
${faqContext}

📌 ATURAN:
- Jangan mengarang data tentang Idam di luar FAQ
- Jika tidak ada di FAQ → bilang tidak tahu
- Jawab dengan ramah, natural, dan profesional
- Gunakan bahasa Indonesia

`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const aiReply = completion.choices[0].message.content;

    // =========================
    // SIMPAN BALASAN AI
    // =========================
    await supabase.from("messages").insert([
      {
        session_id,
        name: "Idam AI",
        email: null,
        sender: "admin",
        message: aiReply,
      },
    ]);

    return Response.json({
      success: true,
      reply: aiReply,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
