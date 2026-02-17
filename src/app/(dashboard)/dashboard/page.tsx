"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Hammer, Rocket, Sparkles } from "lucide-react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set a target date 30 days from now for demonstration
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-orange-500/5 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl bg-[#0F172A]/80 backdrop-blur-2xl rounded-[40px] border border-slate-800 p-8 md:p-16 shadow-2xl shadow-orange-950/20">

        {/* Top Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full w-fit mx-auto mb-10"
        >
          <Hammer className="h-4 w-4 text-orange-500 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-orange-500">System Upgrade in Progress</span>
        </motion.div>

        {/* Main Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <h1 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter leading-none">
              Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">Legendary</span><br />
              is Coming Soon
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto"
          >
            We&apos;re meticulously crafting a new dimension for your musical journey.
            Stay tuned as we orchestrate the perfect experience.
          </motion.p>
        </div>

        {/* The Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="relative group p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col items-center justify-center transition-all hover:border-orange-500/30 hover:bg-slate-900/80"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <AnimatePresence mode="wait">
                <motion.span
                  key={unit.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-4xl md:text-6xl font-black text-white relative z-10 tabular-nums"
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>

              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-500 mt-2 relative z-10 group-hover:text-orange-400 transition-colors">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 border-t border-slate-800 pt-12">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Rocket size={20} />
            </div>
            <span className="text-sm font-bold text-slate-300">Fast Deploy</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
              <Sparkles size={20} />
            </div>
            <span className="text-sm font-bold text-slate-300">Premium UI</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Clock size={20} />
            </div>
            <span className="text-sm font-bold text-slate-300">24/7 Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
      <CountdownTimer />
    </div>
  );
};

export default page
