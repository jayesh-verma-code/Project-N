"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const faqs = [
    {
      question: "How does NIRVEON'X's AI technology work?",
      answer:
        "NIRVEON'X uses advanced machine learning algorithms and natural language processing to analyze health data, identify patterns, and provide personalized recommendations. Our AI continuously learns from new data to improve accuracy and effectiveness over time.",
    },
    {
      question: "Is my health data secure with NIRVEON'X?",
      answer:
        "Absolutely. We employ military-grade encryption and strict privacy protocols to ensure your health data remains confidential. We comply with all major health data regulations including HIPAA, and you maintain complete control over who can access your information.",
    },
    {
      question: "Can NIRVEON'X replace my doctor?",
      answer:
        "NIRVEON'X is designed to complement, not replace, professional healthcare. While our AI can provide valuable insights, preliminary assessments, and ongoing monitoring, we always recommend consulting with qualified healthcare professionals for diagnosis and treatment.",
    },
    {
      question: "How accurate are the AI health assessments?",
      answer:
        "Our AI health assessments have demonstrated over 95% accuracy in clinical trials when compared to diagnoses from healthcare professionals. However, we continuously emphasize that our assessments are preliminary and should be confirmed by medical professionals.",
    },
    {
      question: "What devices is NIRVEON'X compatible with?",
      answer:
        "NIRVEON'X is available on iOS and Android mobile devices, web browsers, and integrates with popular wearable health devices including Apple Watch, Fitbit, Garmin, and more. This allows for seamless health monitoring across all your devices.",
    },
    {
      question: "How much does NIRVEON'X cost?",
      answer:
        "NIRVEON'X offers several subscription tiers to meet different needs. We have a free basic plan with limited features, and premium plans starting at $9.99/month. Enterprise solutions for healthcare providers are available with custom pricing based on organization size and needs.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="faq" className="py-24 px-4 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about NIRVEON&apos;X and how our AI-powered platform can transform your
            health and wellness journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={`item-${index}`}
                variants={itemVariants}
                custom={index}
                onMouseEnter={() => setHoveredItem(`item-${index}`)}
                onMouseLeave={() => setHoveredItem(null)}
                className="cursor-hover-trigger"
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-white/10 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/5"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredItem === `item-${index}` ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />

                  <AccordionTrigger className="px-6 py-4 hover:bg-white/5 transition-all text-left">
                    <motion.span
                      className="text-left text-lg font-medium"
                      animate={{
                        x: hoveredItem === `item-${index}` ? 5 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {faq.question}
                    </motion.span>
                  </AccordionTrigger>

                  <AccordionContent className="px-6 pb-4 pt-2 text-gray-400">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}