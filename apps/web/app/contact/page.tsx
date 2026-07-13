"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2, MessageSquare } from "lucide-react";
import { submitContactForm } from "../actions";

const schema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    setErrorMessage("");
    try {
      const response = (await submitContactForm(data)) as any;
      if (response.success) {
        setIsSuccess(true);
        reset();
      } else {
        setErrorMessage(response.errors?.global || "Message send failed. Please review input fields.");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  const contactCards = [
    {
      icon: <Phone className="text-primary w-6 h-6" />,
      title: "Call Us Directly",
      details: "+91 98765 43210",
      link: "tel:+919876543210",
      linkText: "Call Now",
    },
    {
      icon: <MessageSquare className="text-primary w-6 h-6" />,
      title: "WhatsApp Chat",
      details: "+91 98765 43210",
      link: "https://wa.me/919876543210",
      linkText: "Chat Now",
    },
    {
      icon: <Mail className="text-primary w-6 h-6" />,
      title: "Email Assistance",
      details: "info@jpenterprises.com",
      link: "mailto:info@jpenterprises.com",
      linkText: "Send Mail",
    },
    {
      icon: <MapPin className="text-primary w-6 h-6" />,
      title: "Office Headquarters",
      details: "MG Road, Camp, Pune, MH",
      link: "https://maps.google.com/?q=MG+Road+Camp+Pune",
      linkText: "Directions",
    },
  ];

  return (
    <div className="bg-[#121212] min-h-screen text-white/90 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-3 block">
            Reach Out
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Contact JP Enterprises
          </h1>
          <p className="text-sm md:text-base text-white/60 font-light max-w-xl mx-auto">
            Get in touch with our operations desk, visit our office, or submit a message below.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#1A1A1A] border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-primary/20 transition-all duration-300 shadow-lg"
            >
              <div className="space-y-4">
                <div className="p-3 bg-[#121212] rounded-xl w-fit">{card.icon}</div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-white">{card.title}</h3>
                  <p className="text-xs text-white/60 font-light pt-1">{card.details}</p>
                </div>
              </div>
              <a
                href={card.link}
                target={card.link.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="text-xs text-primary font-semibold tracking-wider uppercase mt-6 flex items-center space-x-1 hover:text-white transition-colors"
              >
                <span>{card.linkText}</span>
                <span>→</span>
              </a>
            </div>
          ))}
        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl space-y-6">
            <div>
              <h2 className="text-2xl font-serif text-white font-semibold">Send a Quick Message</h2>
              <p className="text-xs text-white/50 leading-relaxed font-light pt-1">
                Have a general inquiry or feedback? Drop us a line and we will get back to you.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-light text-center">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-white/50 font-medium uppercase tracking-wider block">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register("fullName")}
                        className="w-full bg-[#121212] border border-white/5 focus:border-primary/50 text-white rounded-xl py-3 px-4 text-sm font-light focus:outline-none transition-colors"
                      />
                      {errors.fullName && <p className="text-red-400 text-xs font-light">{errors.fullName.message}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-white/50 font-medium uppercase tracking-wider block">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register("phone")}
                        className="w-full bg-[#121212] border border-white/5 focus:border-primary/50 text-white rounded-xl py-3 px-4 text-sm font-light focus:outline-none transition-colors"
                      />
                      {errors.phone && <p className="text-red-400 text-xs font-light">{errors.phone.message}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-white/50 font-medium uppercase tracking-wider block">Email Address</label>
                    <input
                      type="email"
                      placeholder="johndoe@email.com"
                      {...register("email")}
                      className="w-full bg-[#121212] border border-white/5 focus:border-primary/50 text-white rounded-xl py-3 px-4 text-sm font-light focus:outline-none transition-colors"
                    />
                    {errors.email && <p className="text-red-400 text-xs font-light">{errors.email.message}</p>}
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-white/50 font-medium uppercase tracking-wider block">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Design Collaboration"
                      {...register("subject")}
                      className="w-full bg-[#121212] border border-white/5 focus:border-primary/50 text-white rounded-xl py-3 px-4 text-sm font-light focus:outline-none transition-colors"
                    />
                    {errors.subject && <p className="text-red-400 text-xs font-light">{errors.subject.message}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-white/50 font-medium uppercase tracking-wider block">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Write your message details..."
                      {...register("message")}
                      className="w-full bg-[#121212] border border-white/5 focus:border-primary/50 text-white rounded-xl py-3 px-4 text-sm font-light focus:outline-none transition-colors resize-none"
                    />
                    {errors.message && <p className="text-red-400 text-xs font-light">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary hover:bg-primary-hover text-dark py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={13} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="flex justify-center">
                    <CheckCircle className="text-primary w-14 h-14" />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-white">Message Sent!</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light max-w-sm mx-auto">
                    Thank you for reaching out. Your message has been saved in our customer record book, and our coordinator will respond to your email shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-transparent border border-white/20 hover:border-white/50 text-white px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all hover:bg-white/5 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Google Map Map */}
          <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-4 shadow-2xl flex flex-col justify-between h-[500px] lg:h-auto overflow-hidden">
            <div className="w-full h-full rounded-2xl overflow-hidden relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.3768233762885!2d73.8727402!3d18.5118742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzQyLjciTiA3M8KwNTInMjEuOSJFOg!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
