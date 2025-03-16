"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NoiseTexture from "@/components/shared/noise-texture";
import ParticlesBackground from "@/components/shared/particle-background";
import { TeamMemberCard } from "@/components/Team/TeamMemberCard";
import { SkeletonCard } from "@/components/Team/SkeletonCard";
import { teamMembers } from "@/contents/team-section";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  category: "leadership" | "employee" | "intern";
  education?: string; // Optional education field
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
};

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredMembers = teamMembers.filter(
    (member) => activeTab === "all" || member.category === activeTab
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden cursor-default">
      <NoiseTexture />
      <ParticlesBackground />

      {/* Header */}
      <header
        className="relative pt-20 md:pt-32 pb-12 md:pb-20 px-4 overflow-hidden"
        ref={headerRef}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-500/10 to-transparent opacity-30" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-500/10 to-transparent opacity-30" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
            }
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Link
              href="/"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Team
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meet the passionate individuals behind NirveonX who are dedicated to
            transforming healthcare through AI innovation.
          </motion.p>

          <motion.div
            className="mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="md:hidden w-full">
              <select
                className="w-full p-2 rounded bg-gray-800/90 border border-gray-700 text-white"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="all">All Team</option>
                <option value="leadership">Leadership</option>
                <option value="employee">Employees</option>
                <option value="intern">Interns</option>
              </select>
            </div>

            <div className="hidden md:block">
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="bg-gray-800/50 border border-gray-700 overflow-x-auto flex-wrap">
                  <TabsTrigger value="all">All Team</TabsTrigger>
                  <TabsTrigger value="leadership">Leadership</TabsTrigger>
                  <TabsTrigger value="employee">Employees</TabsTrigger>
                  <TabsTrigger value="intern">Interns</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Team Members Grid */}
      <main className="px-4 pb-16 md:pb-24">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {[...Array(12)].map((_, index) => (
                <SkeletonCard key={index} delay={index * 0.05} />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredMembers.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  variants={itemVariants}
                  index={index}
                />
              ))}
            </motion.div>
          )}

          {!isLoading && filteredMembers.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xl text-gray-400">
                No team members found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
