"use server";

import { z } from "zod";
import nodemailer from "nodemailer";
import { headers } from "next/headers";
import { prisma } from "@repo/database";
import { contactConfig } from "../lib/config";
import { analyzeRoomSpace } from "../lib/ai-service";

// ----------------------------------------------------
// Validation Schemas
// ----------------------------------------------------

const appointmentSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  preferredDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  preferredTime: z.string().min(1, "Preferred time slot is required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

const quotationSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  location: z.string().min(3, "Please enter project location"),
  projectDetails: z.string().min(10, "Details must be at least 10 characters"),
});

const contactSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

// ----------------------------------------------------
// Helper: Send Nodemailer Email
// ----------------------------------------------------
async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.mailtrap.io",
      port: parseInt(process.env.SMTP_PORT || "2525"),
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASSWORD || "",
      },
    });

    const info = await transporter.sendMail({
      from: '"JP Enterprises Support" <no-reply@jpenterprises.com>',
      to,
      subject,
      html,
    });

    console.log(`[Email Sent] MessageID: ${info.messageId} to ${to}`);
    return true;
  } catch (error) {
    console.error("[Email Error] Failed to send email via SMTP:", error);
    return false;
  }
}

// ----------------------------------------------------
// Helper: WhatsApp Business API Simulator
// ----------------------------------------------------
function sendWhatsAppNotification({ phone, text, type }: { phone: string; text: string; type: "business" | "customer" }) {
  console.log(`\n======================================================`);
  console.log(`[WHATSAPP API DISPATCH - ${type.toUpperCase()}]`);
  console.log(`Recipient Phone: ${phone}`);
  console.log(`Message Content:\n${text}`);
  console.log(`======================================================\n`);
  
  // Real integration endpoint example:
  // fetch(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
  //   method: 'POST',
  //   headers: { 'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ messaging_product: 'whatsapp', to: phone, type: 'text', text: { body: text } })
  // })
}

// ----------------------------------------------------
// Server Action: Book Appointment
// ----------------------------------------------------
export async function bookAppointment(formData: unknown) {
  try {
    const parsed = appointmentSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, errors: parsed.error.flatten().fieldErrors };
    }

    const { fullName, phone, email, address, preferredDate, preferredTime, service, message } = parsed.data;

    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || undefined;
    const device = userAgent && /mobile/i.test(userAgent) ? "Mobile" : "Desktop";
    const confirmationNumber = "JP-2026-" + Math.random().toString(36).substring(2,6).toUpperCase();

    // 1. Save to Database
    const appointment = await prisma.appointment.create({
      data: {
        fullName,
        phone,
        email,
        address,
        preferredDate: new Date(preferredDate),
        preferredTime,
        service,
        message: message || null,
        confirmationNumber,
        device,
        userAgent,
        status: "PENDING",
      },
    });

    // 2. Format Notifications Text
    const dateFormatted = new Date(preferredDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const leadMessage = `*New Appointment Lead - JP Enterprises*\n\n` +
      `*Client:* ${fullName}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Service:* ${service}\n` +
      `*Date:* ${dateFormatted}\n` +
      `*Time:* ${preferredTime}\n` +
      `*Address:* ${address}\n` +
      `*Message:* ${message || "N/A"}`;

    const customerConfirmationText = `Hello ${fullName},\n\nThank you for choosing *JP Enterprises*.\n\nYour appointment for *${service}* has been received for *${dateFormatted}* during the *${preferredTime}* slot. Our engineer will contact you shortly to confirm and align site visitation.\n\nBest regards,\nJP Enterprises Team`;

    // Send to business WhatsApp
    sendWhatsAppNotification({
      phone: contactConfig.whatsapp,
      text: leadMessage,
      type: "business",
    });

    // Send confirmation to client
    sendWhatsAppNotification({
      phone,
      text: customerConfirmationText,
      type: "customer",
    });

    // 4. Send Confirmation Email to Customer
    const emailHtml = `
      <div style="font-family: 'Outfit', Arial, sans-serif; background-color: #f7f7f7; padding: 40px; color: #121212;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #eaeaea; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background-color: #121212; padding: 30px; text-align: center; border-bottom: 2px solid #C5A880;">
            <h1 style="color: #ffffff; margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 26px; letter-spacing: 2px;">JP ENTERPRISES</h1>
            <p style="color: #C5A880; margin: 5px 0 0 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase;">Interiors & Civil Contractors</p>
          </div>
          <div style="padding: 40px; line-height: 1.6;">
            <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; margin-top: 0; color: #121212;">Appointment Confirmed</h2>
            <p style="font-size: 14px; color: #555555; font-weight: 300;">Dear ${fullName},</p>
            <p style="font-size: 14px; color: #555555; font-weight: 300;">We have received your appointment request. Here are the booking details:</p>
            
            <table style="width: 100%; margin: 24px 0; border-collapse: collapse; font-size: 13px;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; font-weight: 600; color: #121212; width: 35%;">Service Selected:</td>
                <td style="padding: 10px 0; color: #555555;">${service}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; font-weight: 600; color: #121212;">Preferred Date:</td>
                <td style="padding: 10px 0; color: #555555;">${dateFormatted}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; font-weight: 600; color: #121212;">Preferred Slot:</td>
                <td style="padding: 10px 0; color: #555555;">${preferredTime}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; font-weight: 600; color: #121212;">Address:</td>
                <td style="padding: 10px 0; color: #555555;">${address}</td>
              </tr>
            </table>

            <p style="font-size: 14px; color: #555555; font-weight: 300;">Our expert consultant will review your specifications and contact you to schedule a home consultation or virtual presentation.</p>
            
            <div style="margin-top: 30px; border-top: 1px solid #eaeaea; padding-top: 20px; font-size: 12px; color: #999999; font-weight: 300;">
              <p style="margin: 0;">Have questions? Contact our projects helpline directly at <strong>${contactConfig.phone}</strong> or email <strong>${contactConfig.email}</strong>.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: `Appointment Confirmed: ${service} | JP Enterprises`,
      html: emailHtml,
    });

    return { success: true, data: appointment };
  } catch (error) {
    console.error("[Submit Error] Appointment booking failed:", error);
    return { success: false, errors: { global: "Something went wrong on our end. Please try again." } };
  }
}

// ----------------------------------------------------
// Server Action: Request Free Quotation
// ----------------------------------------------------
export async function submitQuotationRequest(formData: unknown) {
  try {
    const parsed = quotationSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, errors: parsed.error.flatten().fieldErrors };
    }

    const { fullName, phone, email, service, budget, location, projectDetails } = parsed.data;

    // 1. Create DB Record
    const quotation = await prisma.quotationRequest.create({
      data: {
        fullName,
        phone,
        email,
        service,
        budget,
        location,
        projectDetails,
        status: "PENDING",
      },
    });

    // 2. Format notifications
    const whatsappLeadMessage = `*New Quotation Request - JP Enterprises*\n\n` +
      `*Client:* ${fullName}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Service:* ${service}\n` +
      `*Budget Range:* ${budget}\n` +
      `*Location:* ${location}\n` +
      `*Details:* ${projectDetails}`;

    // Send business WhatsApp
    sendWhatsAppNotification({
      phone: contactConfig.whatsapp,
      text: whatsappLeadMessage,
      type: "business",
    });

    // Send customer acknowledgment
    sendWhatsAppNotification({
      phone,
      text: `Hello ${fullName},\n\nWe have received your request for a free quotation estimation regarding *${service}* at *${location}*.\nOur engineers are reviewing your description details. We will email your estimation or contact you shortly.\n\nBest regards,\nJP Enterprises`,
      type: "customer",
    });

    // 3. Send Email
    const emailHtml = `
      <div style="font-family: 'Outfit', Arial, sans-serif; background-color: #f7f7f7; padding: 40px; color: #121212;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #eaeaea; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background-color: #121212; padding: 30px; text-align: center; border-bottom: 2px solid #C5A880;">
            <h1 style="color: #ffffff; margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 26px; letter-spacing: 2px;">JP ENTERPRISES</h1>
            <p style="color: #C5A880; margin: 5px 0 0 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase;">Interiors & Civil Contractors</p>
          </div>
          <div style="padding: 40px; line-height: 1.6;">
            <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; margin-top: 0; color: #121212;">Quotation Request Acknowledged</h2>
            <p style="font-size: 14px; color: #555555; font-weight: 300;">Dear ${fullName},</p>
            <p style="font-size: 14px; color: #555555; font-weight: 300;">We have received your estimation inquiry. Our estimators will review your requirements and provide a preliminary feasibility report.</p>
            
            <table style="width: 100%; margin: 24px 0; border-collapse: collapse; font-size: 13px;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; font-weight: 600; color: #121212; width: 35%;">Service Scope:</td>
                <td style="padding: 10px 0; color: #555555;">${service}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; font-weight: 600; color: #121212;">Budget Bracket:</td>
                <td style="padding: 10px 0; color: #555555;">${budget}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; font-weight: 600; color: #121212;">Project Location:</td>
                <td style="padding: 10px 0; color: #555555;">${location}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; font-weight: 600; color: #121212;">Project Specs:</td>
                <td style="padding: 10px 0; color: #555555;">${projectDetails}</td>
              </tr>
            </table>

            <p style="font-size: 14px; color: #555555; font-weight: 300;">We will contact you with a customized design layout plan and rough commercial estimation within 48 business hours.</p>
            
            <div style="margin-top: 30px; border-top: 1px solid #eaeaea; padding-top: 20px; font-size: 12px; color: #999999; font-weight: 300;">
              <p style="margin: 0;">Need immediate changes to your request? Call: <strong>${contactConfig.phone}</strong></p>
            </div>
          </div>
        </div>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: `Quotation Acknowledgment: ${service} | JP Enterprises`,
      html: emailHtml,
    });

    return { success: true, data: quotation };
  } catch (error) {
    console.error("[Submit Error] Quotation submission failed:", error);
    return { success: false, errors: { global: "Submission failed. Please verify fields." } };
  }
}

// ----------------------------------------------------
// Server Action: Contact Form Submission
// ----------------------------------------------------
export async function submitContactForm(formData: unknown) {
  try {
    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, errors: parsed.error.flatten().fieldErrors };
    }

    const { fullName, phone, email, subject, message } = parsed.data;

    const contact = await prisma.contactForm.create({
      data: {
        fullName,
        phone,
        email,
        subject,
        message,
      },
    });

    // Notify business via email/WhatsApp log
    console.log(`[Contact Form Received] From: ${fullName}, Subject: ${subject}`);
    
    return { success: true, data: contact };
  } catch (error) {
    console.error("[Submit Error] Contact form failed:", error);
    return { success: false, errors: { global: "Failed to send message. Try again." } };
  }
}

// ----------------------------------------------------
// Server Action: Newsletter Subscription
// ----------------------------------------------------
export async function subscribeNewsletter(formData: unknown) {
  try {
    const parsed = newsletterSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, errors: parsed.error.flatten().fieldErrors };
    }

    const { email } = parsed.data;

    const subscription = await prisma.newsletter.create({
      data: {
        email,
      },
    });

    return { success: true, data: subscription };
  } catch (error: any) {
    // Handle unique constraint check for email
    if (error.code === 'P2002') {
      return { success: false, errors: { email: "This email is already subscribed!" } };
    }
    console.error("[Newsletter Error] Subscription failed:", error);
    return { success: false, errors: { global: "Failed to subscribe. Try again." } };
  }
}

// ----------------------------------------------------
// Server Action: Save AI Report Assessment
// ----------------------------------------------------
export async function createAIReport(data: {
  fullName: string;
  phone: string;
  email: string;
  roomType: string;
  analysisData: any;
  maintenanceIssues: any;
  approxCost: string;
  approxTimeline: string;
}) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || undefined;
    const device = userAgent && /mobile/i.test(userAgent) ? "Mobile" : "Desktop";

    const report = await prisma.aIReport.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        roomType: data.roomType,
        analysisData: data.analysisData,
        maintenanceIssues: data.maintenanceIssues,
        approxCost: data.approxCost,
        approxTimeline: data.approxTimeline,
        userAgent,
        device
      }
    });
    return { success: true, data: report };
  } catch (error) {
    console.error("[Action Error] AIReport save failed:", error);
    return { success: false };
  }
}

// ----------------------------------------------------
// Server Action: Save AI Visualization Render
// ----------------------------------------------------
export async function createAIVisualization(data: {
  roomType: string;
  style: string;
  budget: string;
  materials: any;
  beforeImage: string;
  afterImage: string;
  email?: string;
  phone?: string;
}) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || undefined;
    const device = userAgent && /mobile/i.test(userAgent) ? "Mobile" : "Desktop";

    const visual = await prisma.aIVisualization.create({
      data: {
        roomType: data.roomType,
        style: data.style,
        budget: data.budget,
        materials: data.materials,
        beforeImage: data.beforeImage,
        afterImage: data.afterImage,
        email: data.email || null,
        phone: data.phone || null,
        userAgent,
        device
      }
    });
    return { success: true, data: visual };
  } catch (error) {
    console.error("[Action Error] AIVisualization save failed:", error);
    return { success: false };
  }
}

// ----------------------------------------------------
// Server Action: Save Cost Estimate Record
// ----------------------------------------------------
export async function createCostEstimate(data: {
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  area: number;
  budgetTier: string;
  location: string;
  services: string;
  estimatedCost: string;
  estimatedTimeline: string;
}) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || undefined;
    const device = userAgent && /mobile/i.test(userAgent) ? "Mobile" : "Desktop";

    const estimate = await prisma.costEstimate.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        propertyType: data.propertyType,
        area: data.area,
        budgetTier: data.budgetTier,
        location: data.location,
        services: data.services,
        estimatedCost: data.estimatedCost,
        estimatedTimeline: data.estimatedTimeline,
        userAgent,
        device
      }
    });
    return { success: true, data: estimate };
  } catch (error) {
    console.error("[Action Error] CostEstimate save failed:", error);
    return { success: false };
  }
}

// ----------------------------------------------------
// Server Action: Save AI Chat session Logs
// ----------------------------------------------------
export async function saveAIChat(data: {
  fullName?: string;
  phone?: string;
  email?: string;
  messages: any;
}) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || undefined;
    const device = userAgent && /mobile/i.test(userAgent) ? "Mobile" : "Desktop";

    const chat = await prisma.aIChatSession.create({
      data: {
        fullName: data.fullName || null,
        phone: data.phone || null,
        email: data.email || null,
        messages: data.messages,
        device
      }
    });
    return { success: true, data: chat };
  } catch (error) {
    console.error("[Action Error] AIChatSession save failed:", error);
    return { success: false };
  }
}

// ----------------------------------------------------
// Server Action: Reschedule Appointment
// ----------------------------------------------------
export async function rescheduleAppointment(confirmationNumber: string, newDate: Date, newSlot: string) {
  try {
    const appointment = await prisma.appointment.update({
      where: { confirmationNumber },
      data: {
        preferredDate: newDate,
        preferredTime: newSlot
      }
    });
    return { success: true, data: appointment };
  } catch (error) {
    console.error("[Action Error] Reschedule failed:", error);
    return { success: false };
  }
}

// ----------------------------------------------------
// Server Action: Check if AI Image Key is Configured
// ----------------------------------------------------
export async function checkAIConfigured() {
  const isConfigured = !!(process.env.STABILITY_API_KEY || process.env.REPLICATE_API_TOKEN || process.env.OPENAI_API_KEY);
  return { success: true, isConfigured };
}

// ----------------------------------------------------
// Server Action: Execute Real Stability AI Image-to-Image Generation
// ----------------------------------------------------
export async function visualizeRoomAction(input: {
  roomType: string;
  style: string;
  budget: string;
  materials: {
    flooring?: string;
    wallFinish?: string;
    lighting?: string;
    cabinetFinish?: string;
  };
  beforeImage: string; // Base64 data string
}) {
  try {
    const isConfigured = !!process.env.STABILITY_API_KEY;
    if (!isConfigured) {
      return {
        success: false,
        error: "AI visualization is currently unavailable because no image generation provider has been configured."
      };
    }

    // Convert Base64 beforeImage to a Blob and package in FormData
    const base64Data = input.beforeImage.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const formData = new FormData();
    const fileBlob = new Blob([buffer], { type: "image/png" });
    formData.append("init_image", fileBlob, "init_image.png");
    formData.append("init_image_mode", "IMAGE_STRENGTH");
    formData.append("image_strength", "0.35"); // 0.35 image strength preserves perspective, bounds, and structures

    const promptText = `Bespoke ultra luxury finished interior of ${input.roomType} designed in a custom ${input.style} style, utilizing ${input.materials.flooring || "Carrara marble"} and ${input.materials.wallFinish || "satin paint"} wood accents. Photorealistic, 8k resolution, award-winning architectural digest photography, realistic shadows.`;
    formData.append("text_prompts[0][text]", promptText);
    formData.append("text_prompts[0][weight]", "1.0");
    formData.append("cfg_scale", "7");
    formData.append("steps", "30");

    const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      console.error("[Stability AI Error Response]:", errorMsg);
      return { success: false, error: "Stability AI API request failed. Please check credentials." };
    }

    const data = await response.json();
    if (data.artifacts && data.artifacts[0]) {
      const afterImage = `data:image/png;base64,${data.artifacts[0].base64}`;

      // Register transaction in Database
      const headersList = await headers();
      const userAgent = headersList.get("user-agent") || undefined;
      const device = userAgent && /mobile/i.test(userAgent) ? "Mobile" : "Desktop";

      await prisma.aIVisualization.create({
        data: {
          roomType: input.roomType,
          style: input.style,
          budget: input.budget,
          materials: input.materials,
          beforeImage: input.beforeImage.substring(0, 500) + "...(truncated)", // Save layout representation prefix
          afterImage,
          device,
          userAgent
        }
      });

      return { success: true, beforeImage: input.beforeImage, afterImage };
    }

    return { success: false, error: "No image artifact returned from AI model." };
  } catch (error) {
    console.error("[Action Error] AI Visualization failed:", error);
    return { success: false, error: "An unexpected error occurred during rendering." };
  }
}

// ----------------------------------------------------
// Server Action: Execute AI Room Space Scanning Analysis
// ----------------------------------------------------
export async function analyzeRoomAction(roomType: string, imageBase64?: string) {
  try {
    const isConfigured = !!(process.env.STABILITY_API_KEY || process.env.REPLICATE_API_TOKEN || process.env.OPENAI_API_KEY);
    if (!isConfigured) {
      return {
        success: false,
        error: "AI room analysis is currently unavailable because no structural scanner provider has been configured."
      };
    }

    const analysis = await analyzeRoomSpace(roomType, imageBase64);
    return { success: true, analysis };
  } catch (error) {
    console.error("[Action Error] AI room scan failed:", error);
    return { success: false, error: "An unexpected error occurred during structural scan." };
  }
}
