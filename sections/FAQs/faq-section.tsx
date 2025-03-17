"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqs } from "../../contents/faq-section";

export default function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="faq" className="py-24 px-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {["top-0 left-0", "bottom-0 right-0"].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30`}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about NIRVEON&apos;X and how our AI-powered platform can transform your health and wellness journey.
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="mb-4"
              >
                <AccordionItem
                  value={`item-${index}`}      
                  className="border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm overflow-hidden relative"
                >
                  {/* Background Highlight */}
                  <div
                    className="absolute inset-0 bg-white/5 transition-opacity duration-300"
                    style={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  />

                  {/* Question - Make the entire trigger area clickable */}
                  <AccordionTrigger  className="px-6 py-4 text-left hover:bg-white/5 transition w-full">
                    <span 
                      className="text-lg font-medium transition-transform duration-300 block w-full"
                      style={{ transform: hoveredIndex === index ? 'translateX(5px)' : 'translateX(0)' }}
                    >
                      {faq.question}
                    </span>
                  </AccordionTrigger>

                  {/* Answer */}
                  <AccordionContent className="px-6 pb-4 pt-2 text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}