import { motion } from "framer-motion";

export function FooterBottom({ currentYear }: { currentYear: number }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-500 text-sm mb-4 md:mb-0">
        © {currentYear} NirveonX. All rights reserved.
      </p>
      <div className="flex space-x-6">
        {["Terms", "Privacy", "Cookies"].map((item) => (
          <motion.a
            key={item}
            href="#"
            className="text-gray-500 hover:text-white text-sm transition-colors"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            {item}
          </motion.a>
        ))}
      </div>
    </div>
  );
}
