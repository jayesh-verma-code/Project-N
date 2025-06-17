'use client';

import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { InvestorCard } from "@/components/Patron/InvestorCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ContactCard } from "@/components/Patron/ContactCard";
import { contactTeam, investors } from "@/contents/patron";
import { ArrowLeft, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function InvestorSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % investors.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? investors.length - 1 : prev - 1
    );
  };

  // Auto-swap every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(handleNext, 4500);
    return () => clearInterval(interval);
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };
  
  

  return (
    <section className="w-full py-6 md:py-8 lg:py-10 bg-black text-white">
      <div className=" px-4 md:px-6">
        <div className="flex flex-row items-center justify-center space-y-4 text-center mb-12 relative ">
          <div className="absolute left-4 -top-4 lg:left-44 lg:top-2.5">
            <Link href={'/'}>
            <ArrowLeft className="size-10 p-2  text-black bg-white rounded-full border font-extralight" />
            </Link>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Patrons
            </h2>
            <p className="max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-sm/relaxed xl:text-base/relaxed">
              Backed by our Patrons who believe in our vision to transform the
              industry.
            </p>
          </div>
        </div>

        {/* Swipeable + Animated Investor Card */}
        <div className="relative w-full flex justify-center items-center h-[500px] mb-10 md:mb-16 overflow-hidden ">
          <div {...swipeHandlers} className="w-full max-w-md h-full relative">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={investors[currentIndex].id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <InvestorCard investor={investors[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        
        {/* Contact Section */}
        <div className="flex flex-col items-center text-center space-y-3 md:space-y-4 bg-gray-800 text-white px-4 py-16  md:p-20 rounded-lg">
          <h3 className="text-xl md:text-3xl font-bold mb-10">
            Open to Capital Ventures
          </h3>
          <p className="max-w-[600px] text-sm md:text-base text-white">
            We&apos;re always looking to connect with patrons who share our
            vision and can help us accelerate our growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-white text-black hover:bg-zinc-200">
                  Contact Company Relations
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] md:max-w-[500px] bg-white text-black max-h-[90vh] overflow-y-auto">
                <DialogClose className="absolute right-4 top-4 rounded-sm p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogClose>

                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Investor Relations Team
                  </DialogTitle>
                  <DialogDescription className="text-sm md:text-base">
                    Reach out to our investor relations team for more
                    information.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-3 md:py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contactTeam.map((person, index) => (
                      <ContactCard key={index} person={person} />
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
