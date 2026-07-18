import { prisma } from "db";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";

interface StatusPageProps {
  params: Promise<{ token: string }>;
}

const STAGES = [
  { key: "ENQUIRY", label: "Initial Enquiry" },
  { key: "DESIGN", label: "Design & Planning" },
  { key: "APPROVAL", label: "Client Sign-off" },
  { key: "EXECUTION", label: "Site Execution" },
  { key: "HANDOVER", label: "Keys Handover" },
];

export default async function ProjectStatusPage({ params }: StatusPageProps) {
  const { token } = await params;

  const project = await prisma.project.findUnique({
    where: { statusToken: token },
    include: {
      updates: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const currentIdx = STAGES.findIndex((s) => s.key === project.currentStage);

  return (
    <div className="pt-28 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="mb-12 text-center space-y-3">
        <span className="label-text text-accent flex items-center justify-center gap-1.5">
          <ShieldCheck size={14} />
          Private Client Tracking
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-fg">
          Project Status: {project.clientName}
        </h1>
        <p className="text-muted text-sm">
          Live stage progress for your project in Mumbai. Updated directly by our engineering team.
        </p>
      </div>

      <div className="bg-card-bg border border-card-border rounded-2xl p-8 mb-10">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-8">
          Current Progress Timeline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {STAGES.map((s, idx) => {
            const isCompleted = idx <= currentIdx;
            const isCurrent = idx === currentIdx;

            return (
              <div key={s.key} className="flex flex-col items-center text-center space-y-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    isCurrent
                      ? "bg-accent text-paper ring-4 ring-accent/20"
                      : isCompleted
                      ? "bg-accent/80 text-paper"
                      : "bg-bg border border-card-border text-muted"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={18} /> : idx + 1}
                </div>
                <span
                  className={`text-xs font-semibold ${
                    isCurrent ? "text-accent font-bold" : isCompleted ? "text-fg" : "text-muted/50"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-card-bg border border-card-border rounded-2xl p-8 space-y-6">
        <h2 className="text-lg font-serif font-semibold text-fg border-b border-card-border pb-3">
          Site Update History
        </h2>

        {project.updates.length === 0 ? (
          <p className="text-xs text-muted">No updates recorded yet.</p>
        ) : (
          <div className="space-y-6">
            {project.updates.map((update: { id: string; stage: string; note: string | null; createdAt: Date }) => (
              <div key={update.id} className="relative pl-6 border-l-2 border-accent/40 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-fg">{update.stage}</span>
                  <span className="text-muted text-[11px] flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(update.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {update.note && <p className="text-xs text-muted font-light">{update.note}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
