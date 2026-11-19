const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Yeh pehle se 2 dummy clients hain taake dashboard khali na lage
let leads = [
  {
    id: "1",
    name: "Dr. Kamran Tariq",
    company: "City Care Hospital",
    email: "kamran@citycare.pk",
    budget: 4500,
    requirement:
      "Need custom pharmacy inventory and patient billing portal urgently.",
    stage: "Proposal Sent",
    aiScore: "Hot",
    aiTip:
      "High budget & urgent timeline. Schedule a live demo within 24 hours.",
  },
  {
    id: "2",
    name: "Sara Ahmed",
    company: "Nova Tech Solutions",
    email: "sara@novatech.io",
    budget: 1800,
    requirement:
      "Looking for a company portfolio website with basic admin panel.",
    stage: "New",
    aiScore: "Warm",
    aiTip:
      "Standard web project. Send portfolio samples and fixed-price package.",
  },
];

// Saari leads dekhne ke liye
app.get("/api/leads", (req, res) => {
  res.json(leads);
});

// Nayi lead add karne ke liye + Gemini AI se score karwane ke liye
app.post("/api/leads", async (req, res) => {
  try {
    const { name, company, email, budget, requirement } = req.body;
    let aiScore = "Warm";
    let aiTip = "Follow up with a discovery call to understand exact scope.";

    if (
      process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY !== "YAHAN_APNI_GEMINI_API_KEY_DALEIN"
    ) {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `Analyze this sales lead for a software house:
      Client: ${name} (${company}), Budget: $${budget}, Requirement: "${requirement}".
      Return ONLY valid JSON with two keys:
      "score": must be either "Hot", "Warm", or "Cold"
      "tip": a 1-sentence actionable sales advice.`;

      const result = await model.generateContent(prompt);
      const text = result.response
        .text()
        .replace(/```json|```/g, "")
        .trim();
      const parsed = JSON.parse(text);
      aiScore = parsed.score || "Warm";
      aiTip = parsed.tip || aiTip;
    }

    const newLead = {
      id: Date.now().toString(),
      name,
      company,
      email,
      budget: Number(budget) || 0,
      requirement,
      stage: "New",
      aiScore,
      aiTip,
    };

    leads.unshift(newLead);
    res.status(201).json(newLead);
  } catch (error) {
    const fallbackLead = {
      id: Date.now().toString(),
      ...req.body,
      budget: Number(req.body.budget) || 0,
      stage: "New",
      aiScore: Number(req.body.budget) >= 3000 ? "Hot" : "Warm",
      aiTip: "Reach out promptly and share relevant case studies.",
    };
    leads.unshift(fallbackLead);
    res.status(201).json(fallbackLead);
  }
});

// Lead ka stage change karne ke liye (New -> Contacted -> Won)
app.patch("/api/leads/:id", (req, res) => {
  const { stage } = req.body;
  leads = leads.map((lead) =>
    lead.id === req.params.id ? { ...lead, stage } : lead,
  );
  res.json({ success: true });
});

// AI se follow-up email generate karwane ke liye
app.post("/api/leads/:id/followup", async (req, res) => {
  const lead = leads.find((l) => l.id === req.params.id);
  if (!lead) return res.status(404).json({ error: "Lead not found" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Write a short, persuasive B2B follow-up email from a Software House to:
    Client Name: ${lead.name}, Company: ${lead.company}, Requirement: ${lead.requirement}.
    Keep it under 120 words and end with a call-to-action for a 15-minute call.`;

    const result = await model.generateContent(prompt);
    res.json({ emailDraft: result.response.text() });
  } catch (error) {
    res.json({
      emailDraft: `Subject: Quick follow-up regarding ${lead.company}'s project\n\nHi ${lead.name},\n\nI wanted to follow up regarding your requirement (${lead.requirement}). Our team has built similar scalable solutions and would love to show you a quick 15-minute demo.\n\nAre you available tomorrow at 3 PM?\n\nBest regards,\nBusiness Development Team`,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`CRM Server running on http://localhost:${PORT}`),
);
