"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Github, Send } from "lucide-react"
import { useRef } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0])

  const staggerDelay = 0.1

  return (
    <footer id="contact" className="relative bg-black pt-24 pb-12 overflow-hidden" ref={footerRef}>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-gray-900 to-transparent opacity-80" />
      </div>

      <motion.div className="container mx-auto px-4 relative z-10" style={{ opacity, y }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">NIRVEON&apos;X</h3>
            <p className="text-gray-400 mb-6">
              One AI, Infinite Care – Health, Wellness & Beyond. Transforming healthcare with cutting-edge AI
              technology.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin, Github].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-hover-trigger"
                  aria-label={`Social media link ${index + 1}`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: staggerDelay }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Features", "Services", "Testimonials", "FAQ"].map((item, index) => (
                <motion.li key={index}>
                  <motion.a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors inline-block cursor-hover-trigger"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: staggerDelay * 2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white">Legal</h3>
            <ul className="space-y-3">
              {["Terms of Service", "Privacy Policy", "Cookie Policy", "HIPAA Compliance", "Data Protection"].map(
                (item, index) => (
                  <motion.li key={index}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors inline-block cursor-hover-trigger"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                    </motion.a>
                  </motion.li>
                ),
              )}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: staggerDelay * 3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with the latest health insights and NIRVEON&apos;X features.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="bg-white/5 border-white/10 text-white" />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-black hover:bg-white/90">
                  <Send className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: staggerDelay * 4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© {currentYear} NIRVEON&apos;X. All rights reserved.</p>
            <div className="flex space-x-6">
              {["Terms", "Privacy", "Cookies"].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-500 hover:text-white text-sm transition-colors cursor-hover-trigger"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

