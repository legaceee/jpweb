"use client";

import { useState } from "react";
import { Lock, LogOut, Plus, RefreshCw, Copy, Check } from "lucide-react";
import { loginAdminAction, logoutAdminAction, updateProjectStageAction, createProjectAction } from "../actions";

interface AdminClientProps {
  isAuthenticated: boolean;
  appointments: any[];
  referrals: any[];
  projects: any[];
}

export default function AdminDashboardClient({
  isAuthenticated,
  appointments,
  referrals,
  projects,
}: AdminClientProps) {
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // New project state
  const [newClientName, setNewClientName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  // Update stage state
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedStage, setSelectedStage] = useState("ENQUIRY");
  const [stageNote, setStageNote] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginAdminAction(password);
    if (res.success) {
      window.location.reload();
    } else {
      setLoginError(res.error || "Login failed");
    }
  };

  const handleLogout = async () => {
    await logoutAdminAction();
    window.location.reload();
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newPhone) return;
    await createProjectAction(newClientName, newPhone);
    window.location.reload();
  };

  const handleUpdateStage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) return;
    await updateProjectStageAction(selectedProjectId, selectedStage, stageNote);
    window.location.reload();
  };

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/status/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-md mx-auto min-h-screen">
        <div className="bg-card-bg border border-card-border rounded-2xl p-8 space-y-6 shadow-sm">
          <div className="text-center space-y-2">
            <Lock size={36} className="text-accent mx-auto" />
            <h1 className="text-2xl font-serif font-semibold text-fg">Internal Admin Portal</h1>
            <p className="text-xs text-muted">Owner & Team Access Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label-text text-muted/70 block mb-1">Admin Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-bg border border-card-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent"
              />
            </div>
            {loginError && <p className="text-xs text-red-500">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-hover text-paper py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer"
            >
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 max-w-6xl mx-auto min-h-screen space-y-12">
      {/* Admin Bar */}
      <div className="flex justify-between items-center border-b border-card-border pb-4">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-fg">JP Enterprises Owner Dashboard</h1>
          <p className="text-xs text-muted">Manage Appointments, Client Projects & Referrals</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-card-border text-xs text-muted hover:text-fg transition-colors"
        >
          <LogOut size={13} /> Logout
        </button>
      </div>

      {/* Projects Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Project Form */}
        <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-serif font-semibold text-fg flex items-center gap-2">
            <Plus size={16} className="text-accent" /> Create New Client Project
          </h2>

          <form onSubmit={handleCreateProject} className="space-y-3">
            <input
              type="text"
              required
              placeholder="Client Name (e.g. Meera Patel)"
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              className="w-full bg-bg border border-card-border rounded-lg px-3 py-2 text-xs text-fg outline-none"
            />
            <input
              type="tel"
              required
              placeholder="Client Phone Number"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full bg-bg border border-card-border rounded-lg px-3 py-2 text-xs text-fg outline-none"
            />
            <button
              type="submit"
              className="w-full bg-accent text-paper py-2 rounded-lg text-xs font-semibold hover:bg-accent-hover transition-all"
            >
              Generate Project Tracking Link
            </button>
          </form>
        </div>

        {/* Update Project Stage */}
        <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-serif font-semibold text-fg flex items-center gap-2">
            <RefreshCw size={16} className="text-accent" /> Update Project Stage
          </h2>

          <form onSubmit={handleUpdateStage} className="space-y-3">
            <select
              required
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full bg-bg border border-card-border rounded-lg px-3 py-2 text-xs text-fg outline-none"
            >
              <option value="">Select Existing Project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.clientName} ({p.currentStage})
                </option>
              ))}
            </select>

            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full bg-bg border border-card-border rounded-lg px-3 py-2 text-xs text-fg outline-none"
            >
              <option value="ENQUIRY">1. ENQUIRY</option>
              <option value="DESIGN">2. DESIGN & PLANNING</option>
              <option value="APPROVAL">3. CLIENT SIGN-OFF</option>
              <option value="EXECUTION">4. SITE EXECUTION</option>
              <option value="HANDOVER">5. KEYS HANDOVER</option>
            </select>

            <input
              type="text"
              placeholder="Stage update note (optional)"
              value={stageNote}
              onChange={(e) => setStageNote(e.target.value)}
              className="w-full bg-bg border border-card-border rounded-lg px-3 py-2 text-xs text-fg outline-none"
            />

            <button
              type="submit"
              className="w-full bg-accent text-paper py-2 rounded-lg text-xs font-semibold hover:bg-accent-hover transition-all"
            >
              Post Stage Update
            </button>
          </form>
        </div>
      </div>

      {/* Active Client Projects List */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-serif font-semibold text-fg">Active Client Tracking Links</h2>
        <div className="divide-y divide-card-border">
          {projects.map((p) => (
            <div key={p.id} className="py-3 flex justify-between items-center text-xs">
              <div>
                <span className="font-semibold text-fg">{p.clientName}</span> ({p.phone}) —{" "}
                <span className="text-accent font-bold">{p.currentStage}</span>
              </div>

              <button
                onClick={() => copyLink(p.statusToken)}
                className="inline-flex items-center gap-1 text-accent hover:underline font-semibold"
              >
                {copiedToken === p.statusToken ? <Check size={12} /> : <Copy size={12} />}
                {copiedToken === p.statusToken ? "Link Copied!" : "Copy Status Link"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Appointments & Leads Table */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-serif font-semibold text-fg">
          Site Appointments ({appointments.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-muted">
            <thead className="border-b border-card-border text-fg font-semibold uppercase">
              <tr>
                <th className="py-2">Client</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Service</th>
                <th className="py-2">Slot Date</th>
                <th className="py-2">Source</th>
                <th className="py-2">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {appointments.map((app) => (
                <tr key={app.id}>
                  <td className="py-2 font-medium text-fg">{app.name}</td>
                  <td className="py-2">{app.phone}</td>
                  <td className="py-2">{app.serviceType}</td>
                  <td className="py-2">{app.preferredDate}</td>
                  <td className="py-2 text-accent font-semibold">{app.source}</td>
                  <td className="py-2 max-w-xs truncate">{app.message || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-serif font-semibold text-fg">Referrals ({referrals.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-muted">
            <thead className="border-b border-card-border text-fg font-semibold uppercase">
              <tr>
                <th className="py-2">Code</th>
                <th className="py-2">Referrer</th>
                <th className="py-2">Referrer Phone</th>
                <th className="py-2">Referee (Friend)</th>
                <th className="py-2">Referee Phone</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {referrals.map((ref) => (
                <tr key={ref.id}>
                  <td className="py-2 font-mono font-bold text-accent">{ref.code}</td>
                  <td className="py-2 font-medium text-fg">{ref.referrerName}</td>
                  <td className="py-2">{ref.referrerPhone}</td>
                  <td className="py-2 font-medium text-fg">{ref.refereeName}</td>
                  <td className="py-2">{ref.refereePhone}</td>
                  <td className="py-2">{ref.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
