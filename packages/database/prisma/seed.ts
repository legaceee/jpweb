import { prisma } from "../src/index";

const sampleTestimonials = [
  {
    clientName: "Priya S.",
    area: "Kandivali",
    quote:
      "JP Enterprises handled our full flat renovation — from breaking down old walls to the final coat of paint. The owner visited our site personally at every stage. We never had to chase anyone for updates, which made all the difference.",
  },
  {
    clientName: "Rajesh M.",
    area: "Borivali",
    quote:
      "We wanted a modular kitchen that actually worked for Indian cooking, not just something that looked good in a catalogue. Their team understood that immediately and designed deeper counters, proper masala storage, and ventilation that handles daily tadka without staining the ceiling.",
  },
  {
    clientName: "Sunita K.",
    area: "Thane West",
    quote:
      "Our building is 30 years old and needed serious structural repair before we could even think about interiors. JP Enterprises assessed the whole situation, handled the civil work first, then moved into the interior fit-out. Having one team for both saved us months of coordination headaches.",
  },
  {
    clientName: "Amit D.",
    area: "Andheri",
    quote:
      "What impressed us most was the transparent quoting. Every material, every labour charge was itemised upfront. There were zero surprise costs at the end, which is rare in this industry. The final result matched exactly what was promised during the site visit.",
  },
];

async function main() {
  console.log("🌱 Starting database seed...");

  // Seed testimonials if table is empty
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: sampleTestimonials,
    });
    console.log(`✅ Seeded ${sampleTestimonials.length} sample testimonials.`);
  } else {
    console.log(`ℹ️  Testimonials already exist (${testimonialCount} items) — skipping.`);
  }

  // Seed a sample project for tracking test if none exist
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    const demoProject = await prisma.project.create({
      data: {
        clientName: "Sanjay Sharma",
        phone: "+91 98200 12345",
        statusToken: "JP-DEMO-2026",
        currentStage: "APPROVAL",
        updates: {
          create: [
            {
              stage: "ENQUIRY",
              note: "Initial site visit completed at Thakur Complex flat.",
            },
            {
              stage: "DESIGN",
              note: "Modular kitchen and master bedroom 3D layouts finalised.",
            },
            {
              stage: "APPROVAL",
              note: "Cost estimate and material selections approved by client.",
            },
          ],
        },
      },
    });
    console.log(`✅ Seeded demo project with tracking token: ${demoProject.statusToken}`);
  } else {
    console.log(`ℹ️  Projects already exist (${projectCount} items) — skipping.`);
  }

  console.log("🎉 Seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
