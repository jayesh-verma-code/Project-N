"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  UserCheck,
  Languages,
  Clock,
  Star,
} from "lucide-react";
import Link from "next/link";

// Inline style to ensure the default mouse pointer is shown
const cursorStyle = {
  cursor: "auto",
};

// Style for consistent particle background overlay (visual effect, non-interactive)
const particleBackgroundStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  opacity: 0.3,
  pointerEvents: "none",
};

// Emergency modules shown as feature cards in the first section
const emergencyModules = [
  {
    title: "SOS Emergency",
    description: "Trigger instant SOS alerts to nearest ambulance & hospital.",
    icon: Flame,
    color: "from-red-600 to-red-900",
    bgColor: "bg-black/30",
    borderColor: "border-white/10",
  },
  {
    title: "Live Tracking",
    description: "Track ambulance location and ETA in real-time.",
    icon: Clock, 
    color: "from-blue-600 to-blue-900",
    bgColor: "bg-black/30",
    borderColor: "border-white/10",
  },
  {
    title: "Hospital Connect",
    description: "Direct connection to nearest emergency hospitals.",
    icon: UserCheck,
    color: "from-green-600 to-green-900",
    bgColor: "bg-black/30",
    borderColor: "border-white/10",
  },
  {
    title: "Emergency Contacts",
    description: "Quick dial to saved family & doctors.",
    icon: Languages,
    color: "from-indigo-600 to-indigo-900",
    bgColor: "bg-black/30",
    borderColor: "border-white/10",
  },
];

// Core features of AmboRapid (displayed in the second section)
const features = [
  {
    title: "SOS Button",
    description: "One-tap SOS alert to nearest ambulance and hospital.",
    icon: Flame, 
    color: "bg-red-600",
  },
  {
    title: "Real-Time Tracking",
    description: "See your ambulance moving live on the map with ETA.",
    icon: Clock, 
    color: "bg-blue-600",
  },
  {
    title: "AI Support",
    description: "Preliminary AI-based guidance while ambulance arrives.",
    icon: Star, 
    color: "bg-purple-600",
  },
  {
    title: "Cross-Service Sync",
    description: "Integrated with NirveonX Omnicare ecosystem.",
    icon: UserCheck,
    color: "bg-green-600",
  },
];

// Steps for onboarding new users (displayed in onboarding section)
const onboardingSteps = [
  {
    title: "Login",
    description: "Sign in with NirveonX SSO for secure access.",
    icon: UserCheck,
    color: "bg-blue-500",
  },
  {
    title: "Location Access",
    description: "Enable GPS for accurate ambulance dispatch.",
    icon: Languages, // replace with MapPin
    color: "bg-red-500",
  },
  {
    title: "Emergency Profile",
    description: "Add your medical info & emergency contacts.",
    icon: Clock, // replace with FileText
    color: "bg-purple-500",
  },
];


// Frequently Asked Questions (displayed at the bottom)
const faqs = [
  {
    question: "How does AmboRapid help in emergencies?",
    answer: "AmboRapid connects you instantly to nearby ambulances, provides live tracking, and alerts hospitals in real time.",
  },
  {
    question: "Can I add emergency contacts?",
    answer: "Yes, you can save family, friends, and doctors for one-tap calling during SOS.",
  },
  {
    question: "Is my location shared?",
    answer: "Your live location is shared only with authorized ambulance & hospital staff during emergencies.",
  },
  {
    question: "Does it work across India?",
    answer: "Yes, AmboRapid integrates with NirveonX partner networks across India for wide coverage.",
  },
];



// Main landing page component for AmboRapid
const AmboRapidLandingPage = () => {
  // State to track which onboarding step is active
  const [activeOnboardingStep, setActiveOnboardingStep] = useState(0);

  return (
    <div className="min-h-screen bg-black" style={cursorStyle}>
      {/* ================= Hero Section ================= */}
      {/* Main headline, description, and CTA buttons */}
      <section
        className="relative bg-gradient-to-br from-black via-gray-900 to-black py-20"
        style={cursorStyle}
      >
        {/* Particle background overlay */}
        <div style={particleBackgroundStyle}>
          <div className="noise"></div>
        </div>
        <div
          className="container mx-auto px-4 relative z-10"
          style={cursorStyle}
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* App name and subtitle */}
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                <span className="text-emerald-400">AmboRapid</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
                NirveonX Omnicare
              </h2>
              {/* Main description */}
              <p className="text-xl text-gray-300 mb-4 font-medium">
                Fast, reliable emergency ambulance response with real-time tracking.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Get immediate medical help with SOS alerts, ambulance tracking, 
                and seamless hospital integration across India.
              </p>
              {/* Call-to-action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg backdrop-blur-sm border border-white/10"
                >
                  Request Emergency Help
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold transition-colors backdrop-blur-sm"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

  {/* ================= Emergency Modules Section ================= */}
  {/* Cards for each emergency feature/module */}
      <section
        className="py-20 bg-gray-900/50 backdrop-blur-sm relative"
        style={cursorStyle}
      >
        <div style={particleBackgroundStyle}>
          <div className="noise"></div>
        </div>
        <div
          className="container mx-auto px-4 relative z-10"
          style={cursorStyle}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Emergency Response Features
            </h2>
            <p className="text-xl text-gray-300">
              Tools designed to save lives in critical moments
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {emergencyModules.map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 20px rgba(255,255,255,0.1)",
                }}
                className={`${path.bgColor} ${path.borderColor} border backdrop-blur-md rounded-xl p-6 text-center transition-all duration-300 glass`}
              >
                <div
                  className={`inline-flex p-4 rounded-full bg-gradient-to-r ${path.color} text-white mb-4`}
                >
                  <path.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {path.title}
                </h3>
                <p className="text-gray-300">{path.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  {/* ================= Core Features Section ================= */}
  {/* Cards for core AmboRapid features */}
      <section className="py-20 bg-black relative" style={cursorStyle}>
        <div style={particleBackgroundStyle}>
          <div className="noise"></div>
        </div>
        <div
          className="container mx-auto px-4 relative z-10"
          style={cursorStyle}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Core AmboRapid Features
            </h2>
            <p className="text-xl text-gray-300">
              Real-time emergency tools to ensure your safety
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(255,255,255,0.12)",
                }}
                className="bg-black/40 backdrop-blur-md rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 text-center"
              >
                <div
                  className={`inline-flex p-4 rounded-full ${feature.color} text-white mb-6`}
                >
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  {/* ================= Onboarding Section ================= */}
  {/* Steps for onboarding new users, with animated details */}
      <section className="py-20 bg-gray-900/30 backdrop-blur-sm relative" style={cursorStyle}>
        <div style={particleBackgroundStyle}><div className="noise"></div></div>
        <div className="container mx-auto px-4 relative z-10" style={cursorStyle}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Fast Onboarding
            </h2>
            <p className="text-xl text-gray-300">
              Setup in under a minute for emergencies
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {onboardingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-center cursor-pointer p-4 rounded-lg transition-all duration-300 ${activeOnboardingStep === index ? "bg-emerald-900/40 border border-emerald-500/30 backdrop-blur-sm" : "hover:bg-gray-800/50 border border-transparent"}`}
                  onClick={() => setActiveOnboardingStep(index)}
                >
                  <div className={`inline-flex p-3 rounded-full ${step.color} text-white mb-3`}>
                    <step.icon size={28} />
                  </div>
                  <div className="text-lg font-semibold text-white mb-1">{step.title}</div>
                  <div className="text-xs text-gray-400">{step.description}</div>
                </motion.div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOnboardingStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-black/40 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10 text-center"
              >
                <div
                  className={`inline-flex p-4 rounded-full ${onboardingSteps[activeOnboardingStep].color} text-white mb-4`}
                >
                  {(() => {
                    const IconComp = onboardingSteps[activeOnboardingStep].icon;
                    return <IconComp size={32} />;
                  })()}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {onboardingSteps[activeOnboardingStep].title}
                </h3>
                <p className="text-lg text-gray-300">
                  {onboardingSteps[activeOnboardingStep].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

  {/* ================= FAQs Section ================= */}
  {/* Frequently asked questions about AmboRapid */}
      <section className="py-20 bg-black relative" style={cursorStyle}>
        <div style={particleBackgroundStyle}><div className="noise"></div></div>
        <div className="container mx-auto px-4 relative z-10" style={cursorStyle}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Answering your AmboRapid queries
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ scale: 1.01, borderColor: "rgba(255,255,255,0.18)" }}
                className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  {/* ================= Final Call-to-Action Section ================= */}
  {/* Final CTA and contact info */}
      <section
        className="py-20 bg-gradient-to-r from-emerald-900/70 to-blue-800/70 backdrop-blur-md relative"
        style={cursorStyle}
      >
        <div style={particleBackgroundStyle}><div className="noise"></div></div>
        <div className="container mx-auto px-4 text-center relative z-10" style={cursorStyle}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Need Emergency Assistance Now?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Use AmboRapid to get real-time ambulance response and hospital care
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-emerald-900 hover:bg-gray-200 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              >
                Request Ambulance Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white text-white hover:bg-emerald-800/50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors backdrop-blur-sm"
              >
                Contact Support
              </motion.button>
            </div>
            <div className="mt-8 text-emerald-100 text-sm">
              <p>
                Questions? Contact us at{" "}
                <a
                  href="mailto:wellip@nirveonx.com"
                  className="underline hover:text-white"
                >
                  amborapid@nirveonx.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

  {/* ================= Footer Section ================= */}
  {/* Footer with company info, links, and copyright */}
      <footer
        className="bg-black text-white py-12 border-t border-white/10"
        style={cursorStyle}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">NirveonX Omnicare</h3>
              <p className="text-gray-400">
                Enabling fast and reliable emergency medical response with cutting-edge technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/HealthMateLanding"
                    className="hover:text-white transition-colors"
                  >
                    HealthMate
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mindease"
                    className="hover:text-white transition-colors"
                  >
                    MindEase
                  </Link>
                </li>
                <li>
                  <Link
                    href="/goldencare"
                    className="hover:text-white transition-colors"
                  >
                    GoldenCare
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pet-ai"
                    className="hover:text-white transition-colors"
                  >
                    PetAI
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/forum"
                    className="hover:text-white transition-colors"
                  >
                    CuraForgeX
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="hover:text-white transition-colors"
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Pioneers"
                    className="hover:text-white transition-colors"
                  >
                    Leadership
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="mailto:support@nirveonx.com"
                    className="hover:text-white transition-colors"
                  >
                    Contact Support
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919491689462"
                    className="hover:text-white transition-colors"
                  >
                    +91 94916 89462
                  </a>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 NirveonX. All rights reserved. | Empowering Wellness by Design
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AmboRapidLandingPage;
