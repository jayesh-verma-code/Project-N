import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

export function SubscriptionForm() {
    return (
      <div className="flex space-x-2">
        <Input
          type="email"
          placeholder="Your email"
          className="bg-white/5 border-white/10 text-white"
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-white text-black hover:bg-white/90">
            <Send className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    );
  }