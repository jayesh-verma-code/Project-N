import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function SocialLinks() {
  const socialIcons = [Facebook, Twitter, Instagram, Linkedin, Github];

  return (
    <div className="flex space-x-4">
      {socialIcons.map((Icon, index) => (
        <motion.a
          key={index}
          href="#"
          className="text-gray-400 hover:text-white transition-colors"
          aria-label={`Social media link ${index + 1}`}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="h-5 w-5" />
        </motion.a>
      ))}
    </div>
  );
}
