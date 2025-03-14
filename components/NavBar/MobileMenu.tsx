import { ANIMATIONS, NAV_ITEMS } from "@/sections/marginals/navbar";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";

export const MobileMenu = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/90 backdrop-blur-lg flex md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        >
          <motion.div
            className="w-full h-full p-8 pt-28 flex flex-col"
            variants={ANIMATIONS.menu}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col space-y-6 mb-10">
              {NAV_ITEMS.map((item) => (
                <motion.div
                  key={item.href}
                  variants={ANIMATIONS.item}
                  className="overflow-hidden"
                >
                  <motion.a
                    href={item.href}
                    className="text-3xl font-bold text-white hover:text-gray-300 transition-colors inline-block relative"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                    <motion.div
                      className="absolute left-0 bottom-0 h-0.5 bg-white"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                </motion.div>
              ))}
            </div>
  
            <motion.div variants={ANIMATIONS.item} className="mt-auto">
              <Button
                className="w-full bg-white text-black hover:bg-gray-200 py-6 text-lg"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Button>
            </motion.div>
  
            <motion.div
              variants={ANIMATIONS.item}
              className="mt-8 flex justify-center space-x-6"
            >
              {["Twitter", "Instagram", "LinkedIn"].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {social}
                </motion.a>
              ))}
            </motion.div>
  
            <motion.div
              variants={ANIMATIONS.item}
              className="mt-8 flex justify-center"
            >
              {/* Theme toggle placeholder */}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );