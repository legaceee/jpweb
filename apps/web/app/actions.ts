"use server";

import { z } from "zod";
import { prisma } from "db";
import { cookies } from "next/headers";

const appointmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  serviceType: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a date"),
  scheduledSlot: z.string().optional(),
  message: z.string().optional(),
  source: z.enum(["booking", "checklist", "estimate"]).default("booking"),
});

interface ActionResult {
  success: boolean;
  errors?: Record<string, string[]>;
}

export async function submitAppointment(
  data: Record<string, string>
): Promise<ActionResult> {
  const parsed = appointmentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    let slotDate: Date | null = null;
    if (parsed.data.preferredDate && parsed.data.scheduledSlot) {
      slotDate = new Date(`${parsed.data.preferredDate}T${parsed.data.scheduledSlot}:00`);
    }

    await prisma.appointment.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        serviceType: parsed.data.serviceType,
        preferredDate: parsed.data.preferredDate,
        scheduledSlot: slotDate,
        message: parsed.data.message || null,
        source: parsed.data.source,
        status: "NEW",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("[Appointment] DB write failed:", error);
    return { success: false };
  }
}

/**
 * Fetch list of booked time slots for a given YYYY-MM-DD string
 */
export async function getBookedSlotsAction(dateStr: string): Promise<string[]> {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        preferredDate: dateStr,
        scheduledSlot: { not: null },
      },
      select: { scheduledSlot: true },
    });

    return appointments
      .map((app: { scheduledSlot: Date | null }) => {
        if (!app.scheduledSlot) return "";
        const hours = app.scheduledSlot.getHours().toString().padStart(2, "0");
        const minutes = app.scheduledSlot.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      })
      .filter(Boolean);
  } catch (error) {
    console.error("[Slots] DB query error:", error);
    return [];
  }
}

/**
 * Referral Submission
 */
const referralSchema = z.object({
  referrerName: z.string().min(2),
  referrerPhone: z.string().min(10),
  refereeName: z.string().min(2),
  refereePhone: z.string().min(10),
});

export async function submitReferralAction(data: Record<string, string>) {
  const parsed = referralSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const code = "JP-REF-" + Math.random().toString(36).substring(2, 7).toUpperCase();
    const referral = await prisma.referral.create({
      data: {
        referrerName: parsed.data.referrerName,
        referrerPhone: parsed.data.referrerPhone,
        refereeName: parsed.data.refereeName,
        refereePhone: parsed.data.refereePhone,
        code,
        status: "PENDING",
      },
    });

    return { success: true, code: referral.code };
  } catch (error) {
    console.error("[Referral] Error:", error);
    return { success: false, error: "Database save failed." };
  }
}

/**
 * Admin Login & Cookie Management
 */
export async function loginAdminAction(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || "jpadmin123";
  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return { success: true };
  }
  return { success: false, error: "Invalid password" };
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}

export async function updateProjectStageAction(projectId: string, stage: string, note?: string) {
  try {
    await prisma.project.update({
      where: { id: projectId },
      data: { currentStage: stage },
    });

    await prisma.stageUpdate.create({
      data: {
        projectId,
        stage,
        note: note || null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("[ProjectStage] Error:", error);
    return { success: false };
  }
}

export async function createProjectAction(clientName: string, phone: string) {
  try {
    const project = await prisma.project.create({
      data: {
        clientName,
        phone,
        currentStage: "ENQUIRY",
      },
    });

    await prisma.stageUpdate.create({
      data: {
        projectId: project.id,
        stage: "ENQUIRY",
        note: "Project registered.",
      },
    });

    return { success: true, token: project.statusToken };
  } catch (error) {
    console.error("[CreateProject] Error:", error);
    return { success: false };
  }
}
