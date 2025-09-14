"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Link from "next/link";


import {
  Package,
  Truck,
  Stethoscope,
  CreditCard,
  ShieldCheck,
  Users,
  Clock,
  HeartPulse,
  Languages,
  UserCheck,
  MapPin,
} from "lucide-react";

const cursorStyle = {
  cursor: "auto !important",
};

// Style for consistent particle background
const particleBackgroundStyle = {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  opacity: 0.3,
  pointerEvents: "none", // Ensure clicks pass through to elements below
};

const services = [
  {
    title: "Medicine Delivery",
    description:
      "Order medicines online and get them delivered safely and quickly to your doorstep.",
    icon: Package,
    color: "from-emerald-600 to-emerald-900",
    bgColor: "bg-black/30",
    borderColor: "border-white/10",
  },
  {
    title: "Doctor Consultation",
    description:
      "Book virtual consultations with certified doctors for convenient healthcare access.",
    icon: Stethoscope,
    color: "from-blue-600 to-blue-900",
    bgColor: "bg-black/30",
    borderColor: "border-white/10",
  },
  {
    title: "Health Subscriptions",
    description:
      "Subscribe to monthly medicine packs and never miss your critical refills.",
    icon: CreditCard,
    color: "from-purple-600 to-purple-900",
    bgColor: "bg-black/30",
    borderColor: "border-white/10",
  },
  {
    title: "Wellness Guidance",
    description:
      "Track your health, get lifestyle tips, and earn rewards for healthy choices.",
    icon: HeartPulse,
    color: "from-pink-600 to-pink-900",
    bgColor: "bg-black/30",
    borderColor: "border-white/10",
  },
];

// ⚡ Features
const features = [
  {
    title: "Fast Delivery",
    description: "Timely doorstep delivery across major cities in India.",
    icon: Truck,
    color: "bg-green-500",
  },
  {
    title: "Secure Payments",
    description: "Safe transactions with multiple payment options available.",
    icon: ShieldCheck,
    color: "bg-blue-500",
  },
  {
    title: "24/7 Support",
    description: "Our pharmacy experts are always ready to assist you.",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Refill Reminders",
    description: "Never miss a dose—get notified when it’s time to restock.",
    icon: Clock,
    color: "bg-orange-500",
  },
];

// 🌀 Onboarding Steps
// const onboardingSteps = [
//   {
//     title: "Login",
//     description:
//       "Sign in or register with PharmXPlus for a personalized experience.",
//     icon: Users,
//     color: "bg-emerald-500",
//   },
//   {
//     title: "Language",
//     description:
//       "Choose your preferred language for all guidance and interactions.",
//     icon: Languages,
//     color: "bg-emerald-500",
//   },
//   {
//     title: "Age",
//     description: "Select your age group to receive age-appropriate resources.",
//     icon: Clock,
//     color: "bg-purple-500",
//   },
//   {
//     title: "Upload Prescription",
//     description: "Easily upload your doctor’s prescription to place orders.",
//     icon: Package,
//     color: "bg-blue-500",
//   },
//   {
//     title: "Get Medicines",
//     description: "Enjoy hassle-free delivery of medicines at your doorstep.",
//     icon: Truck,
//     color: "bg-purple-500",
//   },
// ];

const onboardingSteps = [
  {
    title: "Login",
    description:
      "Sign in or register with PharmXPlus for a personalized experience.",
    icon: Users,
    color: "bg-emerald-500",
  },
  {
    title: "Language",
    description:
      "Choose your preferred language for all guidance and interactions.",
    icon: Languages,
    color: "bg-emerald-500",
  },
  {
    title: "Age",
    description: "Select your age group to receive age-appropriate resources.",
    icon: Clock,
    color: "bg-purple-500",
  },
  {
    title: "Upload Prescription",
    description: "Easily upload your doctor’s prescription to place orders.",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    title: "Get Medicines",
    description: "Enjoy hassle-free delivery of medicines at your doorstep.",
    icon: Truck,
    color: "bg-purple-500",
  },
  {
    title: "Track Orders",
    description:
      "Stay updated with real-time order tracking and delivery status.",
    icon: MapPin,
    color: "bg-pink-500",
  },
];

// ❓ FAQs
const faqs = [
  {
    question: "What is PharmXPlus?",
    answer:
      "PharmXPlus is a digital pharmacy platform providing medicine delivery, doctor consultations, and wellness guidance.",
  },
  {
    question: "Do I need a prescription to order?",
    answer:
      "Yes, for certain medicines you will need to upload a valid prescription.",
  },
  {
    question: "Is PharmXPlus available across India?",
    answer:
      "We are expanding rapidly and currently cover major cities. Check availability during checkout.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Your health records and personal data are stored securely and never shared without consent.",
  },
];

const PharmXPlusLandingPage = () => {
  const [activeOnboardingStep, setActiveOnboardingStep] = useState(0);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-black via-gray-900 to-black py-20"
        style={cursorStyle}
      >
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
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                <span className="text-emerald-400">PharmXPlus</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
                Digital Pharmacy Platform
              </h2>
              <p className="text-xl text-gray-300 mb-4 font-medium">
                Seamless medicine delivery, subscriptions, and holistic
                healthcare solutions
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                India’s most engaging pharmacy & wellness companion—bringing
                medicines, doctors, and health rewards together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg backdrop-blur-sm border border-white/10"
                >
                  Start My Journey
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

      {/* Services */}
      <section className="py-20 bg-gray-900/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-300">
              Comprehensive healthcare solutions for everyone
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 20px rgba(255,255,255,0.1)",
                }}
                className={`${service.bgColor} ${service.borderColor} border backdrop-blur-md rounded-xl p-6 text-center`}
              >
                <div
                  className={`inline-flex p-4 rounded-full bg-gradient-to-r ${service.color} text-white mb-4`}
                >
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose PharmXPlus?
            </h2>
            <p className="text-xl text-gray-300">
              Trusted, fast, and secure healthcare solutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(255,255,255,0.12)",
                }}
                className="bg-black/40 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10 text-center"
              >
                <div
                  className={`inline-flex p-4 rounded-full ${f.color} text-white mb-6`}
                >
                  <f.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {f.title}
                </h3>
                <p className="text-gray-300 text-lg">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding */}
      <section
        className="py-20 bg-gray-900/30 backdrop-blur-sm relative"
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
              Simple Onboarding
            </h2>
            <p className="text-xl text-gray-300">
              Get started in just a few steps
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
                  className={`text-center cursor-pointer p-4 rounded-lg transition-all duration-300 ${
                    activeOnboardingStep === index
                      ? "bg-emerald-900/40 border border-emerald-500/30 backdrop-blur-sm"
                      : "hover:bg-gray-800/50 border border-transparent"
                  }`}
                  onClick={() => setActiveOnboardingStep(index)}
                >
                  <div
                    className={`inline-flex p-3 rounded-full ${step.color} text-white mb-3`}
                  >
                    <step.icon size={28} />
                  </div>
                  <div className="text-lg font-semibold text-white mb-1">
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400">
                    {step.description}
                  </div>
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



      {/* FAQs */}
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">FAQs</h2>
            <p className="text-xl text-gray-300">Everything you need to know about PharmXPlus</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }} className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-900/70 to-blue-800/70 backdrop-blur-md relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience Digital Healthcare?</h2>
            <p className="text-xl text-emerald-100 mb-8">Join PharmXPlus today and make your healthcare journey smarter</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-emerald-900 hover:bg-gray-200 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg">
                Order Medicines
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="border border-white text-white hover:bg-emerald-800/50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
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
                  wellip@nirveonx.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

       {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PharmXPlus</h3>
              <p className="text-gray-400">Empowering healthcare with digital solutions and pharmacy expertise.</p>
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
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/team" className="hover:text-white">Our Team</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:support@pharmxplus.com" className="hover:text-white">Contact Support</a></li>
                <li><a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PharmXPlus. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};
export default PharmXPlusLandingPage;
