export interface ServiceDetail {
  slug: string;
  title: string;
  category: "Interior" | "Civil" | "Commercial" | "Turnkey";
  tagline: string;
  description: string;
  image: string;
  benefits: string[];
  subServices: string[];
  faqs: { question: string; answer: string }[];
}

export const servicesData: Record<string, ServiceDetail> = {
  "interior-design": {
    slug: "interior-design",
    title: "Bespoke Interior Design",
    category: "Interior",
    tagline: "Transforming empty spaces into luxury sanctuaries.",
    description: "Our comprehensive interior design service covers end-to-end concept design, 3D visualizations, material selection, and turnkey execution. We tailor every color palette, texture, and furniture piece to reflect your status, taste, and lifestyle.",
    image: "/images/hero_bg.png",
    benefits: [
      "Custom 3D modeling and detailed blueprint layouts",
      "Curated luxury material procurement",
      "Seamless execution with skilled site engineers",
      "Fixed project timelines and transparent budgets"
    ],
    subServices: [
      "Living Room & Lounge Design",
      "Master Bedroom Suites",
      "Home Theaters & Entertainment Zones",
      "Dining Room & Bar Setup",
      "Custom Furniture & Millwork Design"
    ],
    faqs: [
      {
        question: "What is your interior design process?",
        answer: "We follow a 6-step method: Consultation, Site Visit, Design Concept with 3D Rendering, Material Selection, Construction & Execution, and final Handover."
      },
      {
        question: "How long does a typical interior project take?",
        answer: "A standard residential design project takes between 45 to 90 days depending on the size and complexity of custom woodwork."
      }
    ]
  },
  "civil-contracting": {
    slug: "civil-contracting",
    title: "Civil Contracting & Engineering",
    category: "Civil",
    tagline: "Solid foundations for modern architectural structures.",
    description: "JP Enterprises stands as a premier civil contractor specializing in house construction, structural concrete work (RCC), brickwork, plastering, and site engineering supervision. Our team of certified structural engineers guarantees durability and high build-standards.",
    image: "/images/civil_construction.png",
    benefits: [
      "Certified structural engineers & architects",
      "Premium graded RCC and steel reinforcements",
      "Precise site alignment and excavation safety",
      "Strict compliance with building codes and approvals"
    ],
    subServices: [
      "Foundation Excavation & Piling",
      "Reinated Cement Concrete (RCC) Frames",
      "Structural Column & Beam Castings",
      "Brick Laying & Plastering Work",
      "Retaining Walls & Structural Underpinning"
    ],
    faqs: [
      {
        question: "Do you handle structural consulting?",
        answer: "Yes, our certified structural engineers analyze soil conditions, blueprint requirements, and design column-beam layouts for safety and structural load distribution."
      },
      {
        question: "What materials do you use for RCC work?",
        answer: "We use only premium brand TMT steel rods and certified M20/M25 concrete mix design to ensure high compression strengths."
      }
    ]
  },
  "construction": {
    slug: "construction",
    title: "Premium Building Construction",
    category: "Civil",
    tagline: "Building your dream home from the ground up.",
    description: "We provide complete end-to-end residential building construction. From excavation, foundation casting, column raising, blockwork, roof casting, to final external rendering. We manage municipal approvals, contractor scheduling, and material logistics.",
    image: "/images/civil_construction.png",
    benefits: [
      "Turnkey construction management under one roof",
      "High grade materials with laboratory testing reports",
      "Rigorous quality inspections at every stage",
      "On-schedule delivery with milestone reporting"
    ],
    subServices: [
      "Residential Villa Construction",
      "Commercial Building Framing",
      "Foundation & Footing Casting",
      "Roof Slab Formwork & Casting",
      "Boundary Walls & Site Development"
    ],
    faqs: [
      {
        question: "Do you assist with building permits?",
        answer: "Yes, we coordinate with local planning authorities to prepare architectural site plans, structural drawings, and obtain approval certificates."
      },
      {
        question: "What is your payment schedule for construction?",
        answer: "We divide payments into transparent milestones, beginning with advanced booking, foundation completion, plinth level, slab castings, and final plastering."
      }
    ]
  },
  "renovation": {
    slug: "renovation",
    title: "Structural Renovation & Remodeling",
    category: "Civil",
    tagline: "Restoring, modernizing, and upgrading older structures.",
    description: "Whether it is reinforcing an older foundation, modifying room partitions, changing exterior plastering, or upgrading bathrooms, our renovation service breathes new life into structures while keeping them structurally safe.",
    image: "/images/hero_bg.png",
    benefits: [
      "Non-destructive structural testing of older buildings",
      "Clean demolition with modern dust-control",
      "Precise load-bearing structural column reinforcement",
      "High-grade waterproofing integration"
    ],
    subServices: [
      "Home & Villa Extensions",
      "Kitchen & Bathroom Layout Upgrades",
      "Structural Repair & Retrofitting",
      "Exterior Facade Remodeling",
      "Wall Demolition & Layout Restructuring"
    ],
    faqs: [
      {
        question: "Can we modify load-bearing walls during renovation?",
        answer: "Only after our structural engineer designs appropriate steel beam support (I-beams) to redistribute the overhead loads safely."
      },
      {
        question: "Do you handle dampness and waterproofing during renovation?",
        answer: "Yes, we integrate chemical inject-grouting and membrane waterproofing to permanently solve damp wall issues."
      }
    ]
  },
  "painting": {
    slug: "painting",
    title: "Painting & Luxurious Finishing",
    category: "Interior",
    tagline: "Premium textures and colors that bring rooms to life.",
    description: "We deliver flawless interior and exterior painting services. From plaster checking, wall sanding, waterproofing primer base coatings, texture application (stucco, metallic, Italian finishes), to final coat application using premium dust-resistant paints.",
    image: "/images/interior_bedroom.png",
    benefits: [
      "Premium premium texture finishes",
      "Dust-free mechanized sanding and preparation",
      "Durable weather-coat protection for exteriors",
      "Zero-VOC and eco-friendly paint formulations"
    ],
    subServices: [
      "Luxurious Interior Wall Finishes",
      "High-Performance Weatherproof Exterior Paints",
      "Italian Texture & Stucco Wall Finishes",
      "Premium Wood Polishing & PU Coatings",
      "Metal Railing & Door Protective Paints"
    ],
    faqs: [
      {
        question: "Do you handle wall crack repairs before painting?",
        answer: "Absolutely, we open cracks, inject polymer sealant, apply fiber mesh tape, and level it with double coat wall putty for a seamless paint job."
      },
      {
        question: "What brand of paints do you use?",
        answer: "We use premium luxury lines from Asian Paints (Royale), Berger (Silk), and Dulux (Velvet) depending on client preference."
      }
    ]
  },
  "electrical": {
    slug: "electrical",
    title: "Electrical & Smart Home Integration",
    category: "Interior",
    tagline: "Safe, premium electrical wiring and aesthetic lighting solutions.",
    description: "Our certified electricians handle full-house concealed wiring, distribution board layouts, smart home control modules, high-end ambient and cove lighting installation, and electrical safety certification.",
    image: "/images/commercial_office.png",
    benefits: [
      "Concealed FR-LSH (Flame Retardant Low Smoke) wiring",
      "Dedicated heavy-appliance load distribution boards",
      "Smart home lighting and automation ready",
      "Proper copper earth-plate grounding installations"
    ],
    subServices: [
      "Full House Concealed Conduit Piping & Wiring",
      "Aesthetic Cove & Ambient LED Lighting Installations",
      "Smart Automation Touch Panels & Controls",
      "Acoustic Home Theater System Wiring",
      "Uninterrupted Power Backup (UPS/Generator) Provisioning"
    ],
    faqs: [
      {
        question: "Do you provide electrical layouts beforehand?",
        answer: "Yes, our electrical engineers produce detailed CAD wiring and switchboard placement layouts before cutting wall slots."
      },
      {
        question: "What safety standards do you follow?",
        answer: "We strictly follow the National Electrical Code, using double-pole MCBs, ELCBs (Earth Leakage Circuit Breakers), and premium multi-strand copper cables."
      }
    ]
  },
  "plumbing": {
    slug: "plumbing",
    title: "Plumbing, Piping & Waterproofing",
    category: "Civil",
    tagline: "Concealed piping and water systems built for decades.",
    description: "We offer professional plumbing design and installation. From concealed CPVC/UPVC pipeline systems, high-pressure booster pumps, premium bathroom sanitaryware fitting (concealed flush valves, wall-hung WC), to advanced pressure-testing.",
    image: "/images/interior_kitchen.png",
    benefits: [
      "Leak-proof joint fusing with CPVC piping",
      "Strict pressure-testing before wall tiling",
      "Premium sanitaryware alignment and fixture care",
      "Multi-stage drainage slopes to prevent blockages"
    ],
    subServices: [
      "Concealed Bathroom Piping & Water Inlets",
      "High-End Sanitaryware & Fitting Installation",
      "Sewage & Drain Line Layouts",
      "Water Pressure Booster Pump Installations",
      "Terrace and Bathroom Chemical Waterproofing"
    ],
    faqs: [
      {
        question: "Do you pressure-test the pipes?",
        answer: "Yes, we run a pneumatic pressure test at 10 Bar for 24 hours to ensure there are no micro-leaks in joint fusions."
      },
      {
        question: "What brands of fittings do you install?",
        answer: "We frequently install luxury fittings from Jaquar, Kohler, Grohe, and Toto based on project specifications."
      }
    ]
  },
  "flooring": {
    slug: "flooring",
    title: "Flooring & Luxurious Tiling",
    category: "Interior",
    tagline: "Premium marble, vitrified tiles, and wooden flooring.",
    description: "Elevate your floors with premium materials. We specialize in Italian marble dry-laying and polishing, large-format vitrified tile installation, engineering hardwood flooring, and epoxy grout lining.",
    image: "/images/hero_bg.png",
    benefits: [
      "Laser-guided slope and level measurement",
      "Mirror-finish diamond polishing for Italian marble",
      "Seamless large-format tile laying",
      "Premium epoxy grout for water and stain protection"
    ],
    subServices: [
      "Italian Marble Dry-Laying & Diamond Polishing",
      "Vitrified & Ceramic Large-Format Tiles",
      "Engineered Wood & Laminate Flooring",
      "Luxury Granite Counters & Cladding",
      "Bathroom & Balcony Sloped Tiling"
    ],
    faqs: [
      {
        question: "Why do you recommend epoxy grout?",
        answer: "Epoxy grout doesn't absorb water, stain, or breed mold, making it highly durable and easy to clean compared to white cement."
      },
      {
        question: "What is Italian marble dry-laying?",
        answer: "We lay out marble slabs on the floor before cementing to align patterns and colors naturally for a cohesive luxury look."
      }
    ]
  },
  "false-ceiling": {
    slug: "false-ceiling",
    title: "False Ceiling & Drywalls",
    category: "Interior",
    tagline: "Aesthetic ceilings that frame light and sound.",
    description: "Our design team transforms overhead spaces with gypsum board false ceilings, modular grid panels, wooden ceiling rafters, and acoustic board integrations, ensuring perfect spaces for concealed LED cove lighting.",
    image: "/images/interior_bedroom.png",
    benefits: [
      "Rust-proof GI metal frameworks for structural safety",
      "Seamless joint-taping preventing cracks",
      "Perfect integration for air-conditioning and light fixtures",
      "Acoustic and thermal insulation options"
    ],
    subServices: [
      "Designer Gypsum Board Ceiling Panels",
      "Elegant Wooden Ceiling Rafter Accents",
      "Acoustic Board Ceiling for Home Theaters",
      "Concealed LED Cove & Magnetic Track Lighting Tracks",
      "Moisture-Resistant Ceiling Boards for Bathrooms"
    ],
    faqs: [
      {
        question: "What framework do you use for ceilings?",
        answer: "We use only ultra-durable galvanized iron (GI) metal channels from top-tier brands like Saint-Gobain Gyproc."
      },
      {
        question: "Do false ceilings crack over time?",
        answer: "We use special fiber-mesh joint tape and jointing compound to absorb building vibrations, preventing cracks."
      }
    ]
  },
  "pop": {
    slug: "pop",
    title: "Plaster of Paris (POP) Artistry",
    category: "Interior",
    tagline: "Exquisite molding, wall punning, and ceiling medallions.",
    description: "Our master craftsmen design custom Plaster of Paris moldings, classical cornices, Roman columns, and smooth punning on brick walls to create a perfectly level velvet-like finish before painting.",
    image: "/images/hero_bg.png",
    benefits: [
      "Handcrafted classical design details",
      "Flawless level punning on rough masonry walls",
      "Durable, fine-grained plaster materials",
      "Excellent paint adhesion base"
    ],
    subServices: [
      "Smooth Plaster of Paris Wall Punning",
      "Hand-carved Ceiling Cornices & Moldings",
      "Classical Pillar and Arch Design",
      "Custom Wall Panels and Wall Trims"
    ],
    faqs: [
      {
        question: "What is the difference between POP punning and putty?",
        answer: "POP punning is a thicker layer (6mm to 12mm) applied to level out wave-like walls, while putty is a thin micro-coat (1-2mm) for paint base."
      },
      {
        question: "Is POP moisture resistant?",
        answer: "POP is not ideal for high moisture zones. For bathrooms and kitchens, we use cement plaster or moisture-resistant gypsum boards."
      }
    ]
  },
  "modular-kitchen": {
    slug: "modular-kitchen",
    title: "Luxury Modular Kitchens",
    category: "Interior",
    tagline: "Ergonomic designs with soft-close mechanisms.",
    description: "Cook with pleasure in our ergonomically designed kitchens. We specialize in straight, L-shaped, U-shaped, and Parallel layouts with boiling water resistant (BWR) plywood, soft-close hardware, pull-out storage, and built-in appliance cabinetry.",
    image: "/images/interior_kitchen.png",
    benefits: [
      "Boiling Water Resistant (BWR) marine plywood core",
      "German soft-close hinges and tandem drawers (Blum/Hettich)",
      "Premium quartz and granite countertops",
      "10-year warranty against termites and delamination"
    ],
    subServices: [
      "Parallel & U-Shape Modular Kitchen Configurations",
      "Premium Tandem Drawer & Cutlery Systems",
      "Pull-Out Pantry Tower & Corner Organizers",
      "Concealed Chimney & Built-In Microwave Cabinets",
      "Quartz Countertops with Seamless Sink Fusing"
    ],
    faqs: [
      {
        question: "What wood material do you use for kitchens?",
        answer: "We use only IS 303 or IS 710 Boiling Water Resistant (BWR) marine grade plywood, laminated with premium high-gloss acrylic or PU finishes."
      },
      {
        question: "What hardware brands are standard?",
        answer: "We use Hettich, Blum, and Hafele soft-close slides, lift-ups, and hinges as standard specifications."
      }
    ]
  },
  "wardrobes": {
    slug: "wardrobes",
    title: "Premium Wardrobes & Storage",
    category: "Interior",
    tagline: "Smart storage customized for your lifestyle.",
    description: "Maximize your bedroom space with our custom-built walk-in closets, sliding-door wardrobes, and hinged wardrobes. Outfitted with LED clothing rods, velvet accessory drawers, tie rack pull-outs, and premium glass facades.",
    image: "/images/interior_bedroom.png",
    benefits: [
      "High-density moisture-resistant (HDMR) wooden base",
      "Laminated/Polished internals for scratch resistance",
      "Integrated motion-sensing LED wardrobe lights",
      "Heavy duty aluminum sliding tracking systems"
    ],
    subServices: [
      "Sliding Glass and Lacquered Glass Wardrobes",
      "Classic Hinged Wardrobes with PU Finish",
      "Bespoke Walk-in Closets & Organizers",
      "Velvet-lined Accessory & Watch Drawers",
      "Built-in Vanity and Study Console Extensions"
    ],
    faqs: [
      {
        question: "Do you offer modular wardrobes?",
        answer: "Yes, our wardrobes are factory-manufactured in precision sizes and assembled at your site within 3-4 days."
      },
      {
        question: "What profile options do you have for sliding doors?",
        answer: "We offer slim anodized aluminum profile frames in Rose Gold, Champagne Gold, and Matte Black with tinted or clear glass."
      }
    ]
  },
  "commercial-interiors": {
    slug: "commercial-interiors",
    title: "Commercial & Corporate Interiors",
    category: "Commercial",
    tagline: "Bespoke corporate spaces that boost productivity and prestige.",
    description: "We design and build high-end office spaces, conference rooms, retail stores, cafes, and executive lobbies. We integrate professional acoustics, ergonomic layouts, data/power wiring grids, and building fire safety regulations.",
    image: "/images/commercial_office.png",
    benefits: [
      "Compliance with commercial fire safety and exits",
      "Acoustical isolation paneling for conference rooms",
      "Premium brand modular office workstation setups",
      "Energy efficient smart lighting layouts"
    ],
    subServices: [
      "Corporate Headquarters & Open Workspaces",
      "Executive Boardrooms & CEO Suites",
      "Luxury Lobbies & Reception Counters",
      "Boutique Retail & Showroom Interiors",
      "Cafe and Restaurant Dine-In Interiors"
    ],
    faqs: [
      {
        question: "Do you work during off-office hours for renovations?",
        answer: "Yes, for operational offices, we coordinate night shifts and weekend work to minimize business disruptions."
      },
      {
        question: "Can you provide acoustic design?",
        answer: "Yes, we integrate fabric-wrapped acoustic panels, glass double-glazing, and specialized drywall partitions to achieve excellent STC (Sound Transmission Class) ratings."
      }
    ]
  },
  "residential-interiors": {
    slug: "residential-interiors",
    title: "Luxury Residential Interiors",
    category: "Interior",
    tagline: "Timeless elegance crafted for premium living.",
    description: "Elevate your private residence with custom interior design. We design and deliver complete packages for apartments, villas, and penthouses. This service covers bespoke false ceilings, wall treatments, designer lighting, and custom woodwork.",
    image: "/images/hero_bg.png",
    benefits: [
      "Fully personalized designs tailored to your family's needs",
      "Exclusive sourcing of luxury lighting and accent decor",
      "Post-handover warranty and support assistance",
      "Detailed project tracking and daily photo updates"
    ],
    subServices: [
      "Complete 3BHK/4BHK/Villa Design & Setup",
      "Luxury Living & Dining Room Renovations",
      "Kid's Room Theme Interiors & Storage",
      "Home Offices & Study Rooms",
      "Balcony Gardening & Deck Flooring"
    ],
    faqs: [
      {
        question: "What is included in a residential turnkey interior package?",
        answer: "It includes design renderings, false ceiling, painting, modular kitchen, wardrobes, electrical work, plumbing modifications, select furniture pieces, and lighting fixtures."
      },
      {
        question: "What after-sales service do you provide?",
        answer: "We offer a 5-year warranty on all custom woodwork and hardware, with a prompt 48-hour response for checkup requests."
      }
    ]
  },
  "turnkey-projects": {
    slug: "turnkey-projects",
    title: "Turnkey Contracting Solutions",
    category: "Turnkey",
    tagline: "Single point of contact from conceptualization to key handover.",
    description: "Avoid dealing with multiple vendors. JP Enterprises takes full responsibility for architectural drafting, municipal liaison, civil excavation, structural concrete, interior modular woodwork, electrical, plumbing, painting, and deep cleaning. You receive a ready-to-move-in property.",
    image: "/images/civil_construction.png",
    benefits: [
      "Zero coordination hassle with multiple subcontractors",
      "Unified project timeline and milestone billing",
      "Direct accountability for quality control and design matching",
      "Deep post-construction cleaning before key handover"
    ],
    subServices: [
      "Turnkey Villa Design & Civil Construction",
      "Commercial Building Build-Outs",
      "Complete Apartment Renovation Packages",
      "Corporate Office Fit-Out Projects"
    ],
    faqs: [
      {
        question: "What are the benefits of Turnkey over traditional contracting?",
        answer: "Turnkey eliminates conflicts between designers and civil builders since one engineering team is responsible for structural calculations, quality of materials, and interior aesthetics."
      },
      {
        question: "How do you control cost overruns?",
        answer: "We sign a detailed itemized contract with fixed pricing before starting. Unless the client requests design modifications, there are no cost overruns."
      }
    ]
  }
};
