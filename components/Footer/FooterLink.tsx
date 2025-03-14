import { motion } from "framer-motion";

export function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
      <motion.li>
        <motion.a
          href={href}
          className="text-gray-400 hover:text-white transition-colors inline-block"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.a>
      </motion.li>
    )
  }