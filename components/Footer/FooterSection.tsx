import { motion } from "framer-motion";

export function FooterSection({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold mb-6 text-white">{title}</h3>
        <ul className="space-y-3">{children}</ul>
      </motion.div>
    )
  }