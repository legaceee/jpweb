import { prisma } from "db";
import Hero from "../components/hero";
import TrustStrip from "../components/trust-strip";
import Services from "../components/services";
import Process from "../components/process";
import Portfolio from "../components/portfolio";
import Testimonials from "../components/testimonials";
import WhyJP from "../components/why-jp";
import ServiceAreaMap from "../components/service-area-map";
import AppointmentForm from "../components/appointment-form";

async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial?.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        clientName: true,
        area: true,
        quote: true,
      },
    });
    return testimonials;
  } catch (error) {
    console.error("[Testimonials] DB fetch failed:", error);
    return [
      {
        id: "fallback-1",
        clientName: "Priya S.",
        area: "Kandivali",
        quote:
          "JP Enterprises handled our full flat renovation — from breaking down old walls to the final coat of paint. The owner visited our site personally at every stage.",
      },
      {
        id: "fallback-2",
        clientName: "Rajesh M.",
        area: "Borivali",
        quote:
          "We wanted a modular kitchen that actually worked for Indian cooking. Their team understood that immediately and designed something practical, not just pretty.",
      },
    ];
  }
}

export default async function Home() {
  const testimonials = await getTestimonials();

  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials testimonials={testimonials} />
      <WhyJP />
      <ServiceAreaMap />
      <AppointmentForm />
    </>
  );
}
