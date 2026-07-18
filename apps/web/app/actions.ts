"use server";

import { z } from "zod";
import { prisma } from "@repo/database";

const appointmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  serviceType: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a date"),
  message: z.string().optional(),
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
    await prisma.appointment.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        serviceType: parsed.data.serviceType,
        preferredDate: parsed.data.preferredDate,
        message: parsed.data.message || null,
        status: "NEW",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("[Appointment] DB write failed:", error);
    // Return success: false but the client-side code will still open WhatsApp
    return { success: false };
  }
}
