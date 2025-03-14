import { NavLinkProps } from "@/sections/marginals/navbar";
import { motion } from "framer-motion";

export const NavLink = ({ href, label, isHovered, onHover, onLeave }: NavLinkProps) => (
    <motion.div
      className="relative"
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <a
        href={href}
        className="px-4 py-2 text-sm text-white relative cursor-hover-trigger"
      >
        {label}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
          initial={{ width: 0, left: "50%", x: "-50%" }}
          animate={{ width: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        />
      </a>
    </motion.div>
  );