"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Compass, Phone, Mail, MapPin, User, CheckCircle2, ChevronRight, Loader2, RefreshCw } from "lucide-react";
import { bookAppointment, rescheduleAppointment } from "../app/actions";

const purposes = [
  { value: "interior", name: "Interior Design Consultation" },
  { value: "civil", name: "Civil Contracting Survey" },
  { value: "site", name: "Site Level Inspection" },
  { value: "quote", name: "Quotation Discussion" },
  { value: "emergency", name: "Emergency Site Visit" }
];

const timeSlots = [
  { value: "Morning", time: "09:30 AM - 12:30 PM", desc: "Morning Slot" },
  { value: "Afternoon", time: "01:30 PM - 04:30 PM", desc: "Afternoon Slot" },
  { value: "Evening", time: "05:00 PM - 07:00 PM", desc: "Evening Slot" }
];

// Generate next 7 days
const getNextSevenDays = () => {
  const dates = [];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    // Skip Sunday
    if (d.getDay() === 0) continue;
    dates.push({
      dateStr: d.toISOString().split("T")[0]!,
      dayLabel: daysOfWeek[d.getDay()]!,
      monthLabel: months[d.getMonth()]!,
      dateNum: d.getDate()
    });
  }
  return dates;
};

const bookingSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  message: z.string().optional(),
});

type BookingData = z.infer<typeof bookingSchema>;

export default function AppointmentCalendar() {
  const [activeTab, setActiveTab] = useState<"book" | "reschedule">("book");
  
  // Booking state
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0]!);
  const [selectedPurpose, setSelectedPurpose] = useState(purposes[0]!);
  const [isPending, setIsPending] = useState(false);
  const [successData, setSuccessData] = useState<{ code: string; date: string; time: string } | null>(null);

  // Reschedule state
  const [rescheduleCode, setRescheduleCode] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleSlot, setRescheduleSlot] = useState(timeSlots[0]!);
  const [rescheduleMessage, setRescheduleMessage] = useState("");

  const datesList = getNextSevenDays();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmitBooking = async (data: BookingData) => {
    if (!selectedDate) {
      alert("Please select a date from the calendar ribbon.");
      return;
    }
    setIsPending(true);
    try {
      const formattedDate = new Date(selectedDate);
      const res = await bookAppointment({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        preferredDate: formattedDate,
        preferredTime: selectedSlot.value,
        service: selectedPurpose.name,
        message: data.message
      });

      if (res.success && res.data) {
        setSuccessData({
          code: (res.data as any).confirmationNumber || "JP-2026-X1",
          date: selectedDate,
          time: selectedSlot.value
        });
        reset();
      } else {
        alert("Booking failed. Please check date/time availability.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const executeReschedule = async () => {
    if (!rescheduleCode || !rescheduleDate) {
      alert("Please specify confirmation code and new date.");
      return;
    }
    setIsPending(true);
    try {
      const formattedDate = new Date(rescheduleDate);
      const res = await rescheduleAppointment(
        rescheduleCode,
        formattedDate,
        rescheduleSlot.value
      );
      if (res.success) {
        setRescheduleMessage("Reschedule request registered successfully!");
        setRescheduleCode("");
      } else {
        setRescheduleMessage("Verification failed. Confirmation code not found.");
      }
    } catch (err) {
      console.error(err);
      setRescheduleMessage("An error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-2xl space-y-8">
      
      {/* Toggles */}
      <div className="flex border-b border-border">
        <button
          onClick={() => { setActiveTab("book"); setSuccessData(null); setRescheduleMessage(""); }}
          className={`pb-3 text-xs font-bold uppercase tracking-widest cursor-pointer px-4 ${
            activeTab === "book" ? "text-primary border-b-2 border-primary" : "text-foreground/50 hover:text-foreground"
          }`}
        >
          Book Appointment
        </button>
        <button
          onClick={() => { setActiveTab("reschedule"); setSuccessData(null); setRescheduleMessage(""); }}
          className={`pb-3 text-xs font-bold uppercase tracking-widest cursor-pointer px-4 ${
            activeTab === "reschedule" ? "text-primary border-b-2 border-primary" : "text-foreground/50 hover:text-foreground"
          }`}
        >
          Reschedule Booking
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "book" ? (
          !successData ? (
            <motion.div
              key="book-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left calendar configuration */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Purpose */}
                <div className="space-y-2">
                  <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">1. Consult Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {purposes.map((p) => (
                      <button
                        key={p.value}
                        onClick={() => setSelectedPurpose(p)}
                        className={`px-3 py-2.5 rounded-xl border text-[10px] font-semibold text-left cursor-pointer transition-colors ${
                          selectedPurpose.value === p.value
                            ? "bg-primary text-card border-primary"
                            : "bg-background text-foreground/75 border-border hover:border-foreground/20"
                        }`}
                      >
                        {p.name.split(" ")[0]} {p.name.split(" ")[1] || ""}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Date Ribbon */}
                <div className="space-y-2">
                  <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">2. Select Day</label>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {datesList.map((d) => (
                      <button
                        key={d.dateStr}
                        onClick={() => setSelectedDate(d.dateStr)}
                        className={`flex flex-col items-center justify-between p-3 h-20 w-16 shrink-0 rounded-2xl border text-center cursor-pointer transition-colors ${
                          selectedDate === d.dateStr
                            ? "bg-primary text-card border-primary"
                            : "bg-background text-foreground/60 border-border hover:border-foreground/20"
                        }`}
                      >
                        <span className="text-[9px] uppercase font-bold tracking-wider">{d.dayLabel}</span>
                        <span className="text-xl font-bold font-sans">{d.dateNum}</span>
                        <span className="text-[8px] uppercase">{d.monthLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Slots Grid */}
                <div className="space-y-2">
                  <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">3. Preferred Slot</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.value}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                          selectedSlot.value === slot.value
                            ? "bg-primary/5 border-primary text-foreground"
                            : "bg-background text-foreground/60 border-border hover:border-foreground/15"
                        }`}
                      >
                        <h4 className="text-xs font-bold text-foreground">{slot.desc}</h4>
                        <p className="text-[9px] text-foreground/50 font-light mt-0.5 font-sans">{slot.time}</p>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right client contact fields */}
              <form onSubmit={handleSubmit(onSubmitBooking)} className="lg:col-span-5 bg-background/50 border border-border p-6 rounded-2xl space-y-4">
                <h4 className="font-serif text-base text-foreground font-semibold">Contact Details</h4>

                <div className="space-y-1">
                  <label className="text-[9px] text-foreground/50 uppercase font-sans">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    {...register("fullName")}
                    className="w-full bg-card border border-border text-foreground rounded-lg py-2 px-3 text-xs focus:outline-none"
                  />
                  {errors.fullName && <p className="text-red-400 text-[9px]">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-foreground/50 uppercase font-sans">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter phone"
                    {...register("phone")}
                    className="w-full bg-card border border-border text-foreground rounded-lg py-2 px-3 text-xs focus:outline-none"
                  />
                  {errors.phone && <p className="text-red-400 text-[9px]">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-foreground/50 uppercase font-sans">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    {...register("email")}
                    className="w-full bg-card border border-border text-foreground rounded-lg py-2 px-3 text-xs focus:outline-none"
                  />
                  {errors.email && <p className="text-red-400 text-[9px]">{errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-foreground/50 uppercase font-sans">Site Address</label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    {...register("address")}
                    className="w-full bg-card border border-border text-foreground rounded-lg py-2 px-3 text-xs focus:outline-none"
                  />
                  {errors.address && <p className="text-red-400 text-[9px]">{errors.address.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-primary-hover text-card py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Securing Slot...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Appointment</span>
                      <ChevronRight size={12} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="book-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center space-y-4 max-w-xl mx-auto shadow-xl"
            >
              <div className="flex justify-center">
                <CheckCircle2 className="text-primary w-12 h-12" />
              </div>
              <h4 className="font-serif text-xl text-foreground font-semibold">Appointment Scheduled</h4>
              <p className="text-xs text-foreground/60 leading-relaxed font-light">
                Your consultation slot has been reserved. A confirmation email and calendar invite has been sent to your inbox.
              </p>
              
              <div className="bg-card border border-border p-4 rounded-xl text-xs font-semibold space-y-1">
                <div className="flex justify-between">
                  <span className="text-foreground/45">Confirmation ID:</span>
                  <span className="text-primary font-sans uppercase font-bold">{successData.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/45">Reserved Date:</span>
                  <span className="text-foreground font-sans">{successData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/45">Preferred Slot:</span>
                  <span className="text-foreground">{successData.time}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => { setSuccessData(null); }}
                  className="bg-transparent border border-border text-foreground px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors hover:bg-foreground/5 cursor-pointer"
                >
                  Schedule Another Visit
                </button>
              </div>
            </motion.div>
          )
        ) : (
          <motion.div
            key="reschedule-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto bg-background/50 border border-border p-6 md:p-8 rounded-2xl space-y-6 shadow-inner"
          >
            <div>
              <h4 className="font-serif text-lg text-foreground font-bold">Reschedule Consult Slot</h4>
              <p className="text-[10px] text-foreground/50 leading-relaxed font-light">
                Enter your confirmation number to select a new date and adjust your project visitation parameters.
              </p>
            </div>

            {rescheduleMessage && (
              <div className="bg-primary/10 border border-primary/20 text-foreground text-xs p-3 rounded-lg text-center font-light">
                {rescheduleMessage}
              </div>
            )}

            <div className="space-y-4 text-xs font-light">
              <div className="space-y-1">
                <label className="text-[9px] text-foreground/50 uppercase block">Confirmation ID</label>
                <input
                  type="text"
                  placeholder="e.g. JP-2026-1F4F"
                  value={rescheduleCode}
                  onChange={(e) => setRescheduleCode(e.target.value)}
                  className="w-full bg-card border border-border text-foreground rounded-lg py-2.5 px-3 uppercase font-sans font-bold tracking-wider focus:outline-none"
                />
              </div>

              {/* Date selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">Select New Day</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {datesList.map((d) => (
                    <button
                      key={d.dateStr}
                      onClick={() => setRescheduleDate(d.dateStr)}
                      className={`flex flex-col items-center justify-between p-2 h-16 w-14 shrink-0 rounded-xl border text-center cursor-pointer transition-colors ${
                        rescheduleDate === d.dateStr
                          ? "bg-primary text-card border-primary"
                          : "bg-card text-foreground/60 border-border hover:border-foreground/20"
                      }`}
                    >
                      <span className="text-[8px] uppercase font-bold">{d.dayLabel}</span>
                      <span className="text-base font-bold font-sans">{d.dateNum}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">Select New Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.value}
                      onClick={() => setRescheduleSlot(slot)}
                      className={`py-2 rounded-lg border text-[10px] font-semibold text-center cursor-pointer transition-colors ${
                        rescheduleSlot.value === slot.value
                          ? "bg-primary text-card border-primary font-bold"
                          : "bg-card text-foreground/70 border-border hover:border-foreground/15"
                      }`}
                    >
                      {slot.value}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={executeReschedule}
                disabled={isPending}
                className="w-full bg-primary hover:bg-primary-hover text-card py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Rescheduling Slot...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw size={12} />
                    <span>Apply Reschedule</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
