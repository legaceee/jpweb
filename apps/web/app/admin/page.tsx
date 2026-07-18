import { cookies } from "next/headers";
import { prisma } from "db";
import AdminDashboardClient from "./admin-client";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return <AdminDashboardClient isAuthenticated={false} appointments={[]} referrals={[]} projects={[]} />;
  }

  let appointments: any[] = [];
  let referrals: any[] = [];
  let projects: any[] = [];

  try {
    appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
    });
    referrals = await prisma.referral.findMany({
      orderBy: { createdAt: "desc" },
    });
    projects = await prisma.project.findMany({
      include: { updates: true },
      orderBy: { updatedAt: "desc" },
    });
  } catch (e) {
    console.error("Admin DB query error:", e);
  }

  return (
    <AdminDashboardClient
      isAuthenticated={true}
      appointments={appointments}
      referrals={referrals}
      projects={projects}
    />
  );
}
