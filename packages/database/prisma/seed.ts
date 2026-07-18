import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * SAMPLE TESTIMONIALS — PLACEHOLDER DATA
 * ========================================
 * These are sample/placeholder testimonials written to sound believable.
 * Replace them with real client testimonials as they become available.
 * Since testimonials are fetched from the database, swapping them requires
 * no code changes — just update the rows in the Testimonial table.
 */
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
  console.log("🌱 Seeding sample testimonials...");

  for (const testimonial of sampleTestimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.clientName }, // Will always create since IDs are UUIDs
      update: {},
      create: testimonial,
    });
  }

  // Use createMany for clean inserts (skip duplicates if re-run)
  const count = await prisma.testimonial.count();
  if (count === 0) {
    await prisma.testimonial.createMany({
      data: sampleTestimonials,
    });
    console.log(`✅ Created ${sampleTestimonials.length} sample testimonials.`);
  } else {
    console.log(`ℹ️  ${count} testimonials already exist — skipping seed.`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
