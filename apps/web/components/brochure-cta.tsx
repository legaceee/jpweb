"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Download, Loader2, CheckCircle2, Mail } from "lucide-react";
import { subscribeNewsletter } from "../app/actions";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

export default function BrochureCta() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    setErrorMessage("");
    try {
      const response = await subscribeNewsletter(data);
      if (response.success) {
        setIsSuccess(true);
        reset();
        
        // Simulate PDF download by redirecting/opening a mock link
        const link = document.createElement("a");
        link.href = "#";
        link.setAttribute("download", "JP_Enterprises_Brochure.pdf");
        document.body.appendChild(link);
        // We log the download triggers instead of actually navigating to make it mock-friendly
        console.log("[Brochure Download Triggered]");
      } else {
        const errorVal = response.errors?.email;
        const errMsg = Array.isArray(errorVal) ? errorVal[0] : errorVal;
        setErrorMessage(errMsg || "Failed to process request.");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-card border border-border p-8 rounded-3xl space-y-6 max-w-xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
      
      <div className="space-y-2 text-center md:text-left">
        <h3 className="font-serif text-2xl text-foreground font-bold">Download Company Brochure</h3>
        <p className="text-xs text-foreground/50 leading-relaxed font-light">
          Get detailed breakdowns of our quality specifications, turnkey stages, and completed residential design projects.
        </p>
      </div>

      {!isSuccess ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errorMessage && (
            <p className="text-red-400 text-xs font-light text-center">{errorMessage}</p>
          )}

          <div className="relative">
            <Mail size={14} className="absolute left-4 top-3.5 text-foreground/30" />
            <input
              type="email"
              placeholder="Enter your email to download"
              {...register("email")}
              className="w-full bg-background border border-border focus:border-primary/50 text-foreground rounded-2xl py-3 pl-12 pr-4 text-xs font-light focus:outline-none transition-colors"
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-xs font-light pl-1">{errors.email.message}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary-hover text-card py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Preparing PDF...</span>
              </>
            ) : (
              <>
                <Download size={14} />
                <span>Instant Download Brochure</span>
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="text-center py-4 space-y-3">
          <div className="flex justify-center">
            <CheckCircle2 className="text-primary w-10 h-10" />
          </div>
          <h4 className="font-serif text-lg text-foreground font-semibold">Download Initiated!</h4>
          <p className="text-xs text-foreground/60 leading-relaxed font-light">
            Your PDF copy is preparing. We have also added you to our newsletter mailing catalog.
          </p>
        </div>
      )}
    </div>
  );
}
