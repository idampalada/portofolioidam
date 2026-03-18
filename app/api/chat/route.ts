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

    const session_id: string = body.session_id;
    const name: string = body.name;
    const email: string = body.email;
    const message: string = body.message;

    console.log("USER MESSAGE:", message);

    // =========================
    // Simpan pesan user
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
    // Ambil FAQ dari database
    // =========================
    const { data: faqs, error: faqError } = await supabase
      .from("faq")
      .select("*");

    console.log("FAQ ERROR:", faqError);
    console.log("FAQ DATA:", faqs);

    const lowerMsg = message.toLowerCase();

    // =========================
    // Cek apakah pesan cocok FAQ
    // =========================
const matchedFAQ = faqs?.find((f: any) => {
  const words = f.question
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ");

  return words.some((word: string) =>
    lowerMsg.includes(word)
  );
});
    console.log("MATCHED FAQ:", matchedFAQ);

    if (matchedFAQ) {
      console.log("FAQ FOUND:", matchedFAQ.answer);

      await supabase.from("messages").insert([
        {
          session_id,
          name: "Idam AI",
          email: null,
          sender: "admin",
          message: matchedFAQ.answer,
        },
      ]);

      return Response.json({
        success: true,
        reply: matchedFAQ.answer,
      });
    }

    // =========================
    // Jika tidak ada FAQ cocok → pakai AI
    // =========================
    const faqText =
      faqs
        ?.map(
          (f: any) =>
            `Pertanyaan: ${f.question}\nJawaban: ${f.answer}`
        )
        .join("\n\n") || "";

    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
Kamu adalah AI assistant di website portfolio Idam.

Gunakan FAQ berikut jika relevan.

${faqText}

Jawab dengan ramah dan gunakan bahasa Indonesia.
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
    // Simpan balasan AI
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

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}