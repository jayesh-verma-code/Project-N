"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FooterSection } from "@/components/Footer/FooterSection";
import { FooterLink } from "@/components/Footer/FooterLink";
import { SocialLinks } from "@/components/Footer/SocialLinks";
import { SubscriptionForm } from "@/components/Footer/SubsSciptionForm";
import { FooterBottom } from "@/components/Footer/FooterBottom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);

  // Handle scroll-based animations
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  const staggerDelay = 0.1;

  return (
    <footer
      id="contact"
      className="relative bg-black pt-24 pb-12 overflow-hidden"
      ref={footerRef}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-gray-900 to-transparent opacity-80" />
      </div>

      {/* Footer content */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, y }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <FooterSection title="NirveonX" delay={0}>
            <p className="text-gray-400 mb-6">
              One AI, Infinite Care – Health, Wellness & Beyond. Transforming
              healthcare with cutting-edge AI technology.
            </p>
            <SocialLinks />
          </FooterSection>

          {/* Quick Links */}
          <FooterSection title="Quick Links" delay={staggerDelay}>
            {["Home", "Features", "Services", "Pioneers", "FAQ"].map(
              (item) => (
                <FooterLink key={item} href={`#${item.toLowerCase()}`}>
                  {item}
                </FooterLink>
              )
            )}
          </FooterSection>

          {/* Legal */}
          <FooterSection title="Legal" delay={staggerDelay * 2}>
            {[
              "Terms of Service",
              "Privacy Policy",
              "Cookie Policy",
              "HIPAA Compliance",
              "Data Protection",
            ].map((item) => (
              <FooterLink key={item} href="#">
                {item}
              </FooterLink>
            ))}
          </FooterSection>

          {/* Subscribe */}
          <FooterSection title="Subscribe" delay={staggerDelay * 3}>
            <p className="text-gray-400 mb-4">
              Stay updated with the latest health insights and NirveonX
              features.
            </p>
            <SubscriptionForm />
          </FooterSection>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: staggerDelay * 4 }}
          viewport={{ once: true }}
        >
          <FooterBottom currentYear={currentYear} />
        </motion.div>
      </motion.div>
    </footer>
  );
}
