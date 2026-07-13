import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Design Insights | JP Enterprises",
  description: "Read the latest design guides, civil contracting specifications, material guides, and luxury interior design trends in Pune.",
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const posts: BlogPost[] = [
  {
    slug: "rcc-concrete-structural-stability",
    title: "Understanding RCC Structural Stability in Villa Construction",
    excerpt: "Learn how certified structural design calculations, plinth reinforcement grids, and soil load factors keep modern multi-level villas structurally stable.",
    date: "July 12, 2026",
    readTime: "8 min read",
    category: "Civil Construction",
    image: "/images/civil_construction.png"
  },
  {
    slug: "luxury-modular-kitchen-wood-finishes",
    title: "A Complete Guide to Luxury Modular Kitchen Wood & Acrylic Finishes",
    excerpt: "Explore the durability, aesthetics, and termite protection capabilities of IS 710 BWR plywood versus HDMR boards with high-gloss laminates.",
    date: "June 28, 2026",
    readTime: "6 min read",
    category: "Interior Design",
    image: "/images/interior_kitchen.png"
  },
  {
    slug: "corporate-office-acoustic-drywall-design",
    title: "Acoustic Drywall Design Solutions for High-Performance Workspaces",
    excerpt: "How selecting STC acoustic fiberglass board core framing isolates boardroom sound and boosts corporate team productivity levels.",
    date: "May 15, 2026",
    readTime: "5 min read",
    category: "Commercial Office",
    image: "/images/commercial_office.png"
  }
];

export default function BlogPage() {
  return (
    <div className="bg-bg min-h-screen text-fg py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase block">Insights</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">Design &amp; Engineering Journal</h1>
          <p className="text-sm text-foreground/50 font-light max-w-xl mx-auto">
            Expert articles covering structural safety standards, material comparisons, and luxury interior design advice.
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-primary text-card border border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  {/* Meta */}
                  <div className="flex items-center space-x-4 text-[10px] text-foreground/45 font-semibold uppercase tracking-wider">
                    <span className="flex items-center space-x-1">
                      <Calendar size={11} />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock size={11} />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="font-serif text-lg text-foreground font-bold leading-tight hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs text-foreground/60 leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs text-primary font-bold uppercase tracking-widest flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
