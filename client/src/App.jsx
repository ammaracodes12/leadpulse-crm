import React, { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("pipeline");
  const [theme, setTheme] = useState("dark"); // 'dark' ya 'light'

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      hospital: "City Care Medical Center",
      email: "s.jenkins@citycare.org",
      value: "$45,000",
      stage: "Qualified",
      risk: "Low Risk",
      score: 92,
      aiSummary:
        "High intent. Looking to upgrade patient intake workflow before Q4.",
    },
    {
      id: 2,
      name: "Ahmed Raza",
      hospital: "MedLife Diagnostics",
      email: "ahmed@medlifelabs.pk",
      value: "$28,500",
      stage: "New Lead",
      risk: "Medium Risk",
      score: 68,
      aiSummary:
        "Requested pricing tier details; follow up with compliance docs.",
    },
    {
      id: 3,
      name: "Dr. Elena Rostova",
      hospital: "Apex Surgical Institute",
      email: "erostova@apexsurgical.io",
      value: "$82,000",
      stage: "Proposal",
      risk: "High Risk",
      score: 45,
      aiSummary: "Decision delayed due to legacy EHR integration concerns.",
    },
  ]);

  const [activities, setActivities] = useState([
    "AI Risk Engine analyzed Dr. Sarah Jenkins (92% Match)",
    "New lead captured: MedLife Diagnostics",
    "Automated HIPAA compliance brief queued for Apex Surgical",
  ]);

  const [newLead, setNewLead] = useState({
    name: "",
    hospital: "",
    email: "",
    value: "",
  });

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.hospital) return;

    const createdLead = {
      id: Date.now(),
      ...newLead,
      value: newLead.value || "$15,000",
      stage: "New Lead",
      risk: "Low Risk",
      score: 85,
      aiSummary:
        "AI analyzed profile: Strong fit for automated clinical scheduling.",
    };

    setLeads([createdLead, ...leads]);
    setActivities([
      `AI Scored new lead: ${newLead.name} (${newLead.hospital})`,
      ...activities,
    ]);
    setNewLead({ name: "", hospital: "", email: "", value: "" });
  };

  // Theme styles variables
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex font-sans transition-colors duration-300 ${isDark ? "bg-[#07090e] text-slate-100" : "bg-slate-100 text-slate-800"}`}
    >
      {/* Enterprise Sidebar */}
      <aside
        className={`w-64 p-6 flex flex-col justify-between border-r transition-colors duration-300 ${isDark ? "bg-[#0d111a] border-slate-800/80" : "bg-white border-slate-200"}`}
      >
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold text-lg">
              ✨
            </div>
            <div>
              <h1
                className={`font-bold text-lg tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
              >
                LeadPulse AI
              </h1>
              <span className="text-[11px] uppercase tracking-widest text-cyan-500 font-semibold">
                HealthTech CRM
              </span>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === "pipeline"
                  ? "bg-cyan-500/15 text-cyan-500 border border-cyan-500/30 font-semibold"
                  : isDark
                    ? "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📊 Pipeline Kanban
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === "analytics"
                  ? "bg-cyan-500/15 text-cyan-500 border border-cyan-500/30 font-semibold"
                  : isDark
                    ? "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📈 AI Analytics & Risk
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === "settings"
                  ? "bg-cyan-500/15 text-cyan-500 border border-cyan-500/30 font-semibold"
                  : isDark
                    ? "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              ⚙️ AI Engine Settings
            </button>
          </nav>
        </div>

        {/* Theme Toggle & Live Activity Stream */}
        <div className="space-y-4">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold border transition ${
              isDark
                ? "bg-slate-800/80 border-slate-700 text-amber-400 hover:bg-slate-800"
                : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {isDark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
          </button>

          <div
            className={`border rounded-xl p-4 transition-colors duration-300 ${isDark ? "bg-slate-900/80 border-slate-800" : "bg-slate-50 border-slate-200"}`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              LIVE AI STREAM
            </div>
            <div
              className={`space-y-2.5 text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              {activities.slice(0, 3).map((act, i) => (
                <div
                  key={i}
                  className="border-l-2 border-cyan-500/50 pl-2.5 py-0.5 leading-relaxed"
                >
                  {act}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2
              className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
            >
              {activeTab === "pipeline" && "Enterprise Deal Pipeline"}
              {activeTab === "analytics" && "AI Risk & Conversion Intelligence"}
              {activeTab === "settings" && "Gemini AI Engine Configuration"}
            </h2>
            <p
              className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Real-time HealthTech lead scoring & automated risk mitigation
            </p>
          </div>
          <div
            className={`flex items-center gap-2 border px-4 py-2 rounded-xl text-xs text-emerald-500 ${isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Gemini 2.5 Flash Active
          </div>
        </header>

        {/* Add New Lead Form */}
        <form
          onSubmit={handleAddLead}
          className={`border p-5 rounded-2xl mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 transition-colors duration-300 ${isDark ? "bg-[#0d111a] border-slate-800/80" : "bg-white border-slate-200 shadow-sm"}`}
        >
          <input
            type="text"
            placeholder="Doctor / Decision Maker"
            value={newLead.name}
            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 ${isDark ? "bg-slate-900/90 border-slate-700/70 text-white placeholder-slate-500" : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"}`}
          />
          <input
            type="text"
            placeholder="Hospital / Clinic Name"
            value={newLead.hospital}
            onChange={(e) =>
              setNewLead({ ...newLead, hospital: e.target.value })
            }
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 ${isDark ? "bg-slate-900/90 border-slate-700/70 text-white placeholder-slate-500" : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"}`}
          />
          <input
            type="email"
            placeholder="Work Email"
            value={newLead.email}
            onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 ${isDark ? "bg-slate-900/90 border-slate-700/70 text-white placeholder-slate-500" : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"}`}
          />
          <input
            type="text"
            placeholder="Deal Value (e.g. $50,000)"
            value={newLead.value}
            onChange={(e) => setNewLead({ ...newLead, value: e.target.value })}
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 ${isDark ? "bg-slate-900/90 border-slate-700/70 text-white placeholder-slate-500" : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"}`}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl px-4 py-2.5 text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20"
          >
            ➕ Analyze & Add
          </button>
        </form>

        {/* TAB 1: PIPELINE */}
        {activeTab === "pipeline" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className={`border rounded-2xl p-6 transition shadow-xl ${isDark ? "bg-[#0d111a]/90 border-slate-800 hover:border-cyan-500/40" : "bg-white border-slate-200 hover:border-cyan-500/50 shadow-sm"}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3
                      className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                      {lead.name}
                    </h3>
                    <p
                      className={`text-xs flex items-center gap-1.5 mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                    >
                      🏥 {lead.hospital}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      lead.risk === "Low Risk"
                        ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                        : lead.risk === "Medium Risk"
                          ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                          : "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                    }`}
                  >
                    {lead.risk}
                  </span>
                </div>

                <div
                  className={`flex justify-between items-center py-3 border-y my-4 text-sm ${isDark ? "border-slate-800/80 text-slate-400" : "border-slate-100 text-slate-600"}`}
                >
                  <span>Contract Value</span>
                  <span className="font-bold text-cyan-500">{lead.value}</span>
                </div>

                <div
                  className={`rounded-xl p-3.5 mb-4 border ${isDark ? "bg-slate-900/90 border-slate-800" : "bg-slate-50 border-slate-200"}`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-cyan-500 font-semibold flex items-center gap-1">
                      ✨ AI Insight
                    </span>
                    <span
                      className={isDark ? "text-slate-400" : "text-slate-500"}
                    >
                      Score:{" "}
                      <strong
                        className={isDark ? "text-white" : "text-slate-900"}
                      >
                        {lead.score}/100
                      </strong>
                    </span>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}
                  >
                    {lead.aiSummary}
                  </p>
                </div>

                <div
                  className={`flex justify-between items-center text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  <span>{lead.email || "contact@hospital.org"}</span>
                  <span
                    className={`px-2.5 py-1 rounded-lg ${isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"}`}
                  >
                    {lead.stage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`border p-6 rounded-2xl ${isDark ? "bg-[#0d111a] border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
            >
              <p
                className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                Total Pipeline Value
              </p>
              <h3
                className={`text-3xl font-bold mt-2 ${isDark ? "text-white" : "text-slate-900"}`}
              >
                $155,500
              </h3>
              <span className="text-xs text-emerald-500 mt-2 inline-block">
                +18.4% vs last month
              </span>
            </div>
            <div
              className={`border p-6 rounded-2xl ${isDark ? "bg-[#0d111a] border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
            >
              <p
                className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                Average AI Win Probability
              </p>
              <h3 className="text-3xl font-bold text-cyan-500 mt-2">78.5%</h3>
              <span
                className={`text-xs mt-2 inline-block ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                Based on HIPAA & EHR readiness
              </span>
            </div>
            <div
              className={`border p-6 rounded-2xl ${isDark ? "bg-[#0d111a] border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
            >
              <p
                className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                High-Risk Deals Flagged
              </p>
              <h3 className="text-3xl font-bold text-rose-500 mt-2">1 Deal</h3>
              <span
                className={`text-xs mt-2 inline-block ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                Requires executive follow-up
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS */}
        {activeTab === "settings" && (
          <div
            className={`border p-6 rounded-2xl max-w-xl ${isDark ? "bg-[#0d111a] border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
          >
            <h3
              className={`font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              AI Scoring Model
            </h3>
            <p
              className={`text-sm mb-4 ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Connected to Google Gemini 2.5 Flash for real-time healthcare lead
              qualification and churn risk detection.
            </p>
            <div
              className={`p-4 rounded-xl border text-xs text-emerald-500 flex items-center gap-2 ${isDark ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"}`}
            >
              ✅ System healthy — Automatic fallback enabled.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
