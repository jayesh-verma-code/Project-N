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

  const teamMembers: TeamMember[] = [
    //leadership
    {
      id: "founder",
      name: "Kavali Deekshith",
      role: "Founder",
      category: "leadership",
      education: "BTECH(AIML) , JNTUH",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742072034/kavali_c7yr5a.jpg",
    },
    {
      id: "advisor",
      name: "Nikhil Sanka",
      role: "Advisory Board Member ",
      category: "leadership",
      education: "Chief Manager at Canada transportation department",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742072035/nikhil_redxth.jpg",
    },
    {
      id: "CEO",
      name: "Ayush Kumar Sahoo",
      role: "CEO",
      category: "leadership",
      education: "BTECH(Chemical Eng.) , NIT Rourkela",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742072033/ayush_ds1dbl.jpg",
    },
    {
      id: "cto",
      name: "Shaik Ashraf",
      role: "CTO & Co-Founder ",
      category: "leadership",
      education: "BTECH(AIML) , JNTUH",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742072031/ashraf_fi67fu.jpg",
    },
    {
      id: "Co-founder",
      name: "Sumedha Musunuri ",
      role: "CWO & Co-Founder",
      category: "leadership",
      education: "MBBS , GEMS",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742072032/sumedha_kfh7lh.jpg",
    },
    //employees
    {
      id: "kasu-naren-karthik-raju",
      name: "Kasu Naren Karthik Raju",
      role: "Managing Director & Co-Founder",
      category: "employee",
      education: "BTECH(AIML) , JNTUH",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742070165/raju_kfslnu.jpg",
    },
    //interns
    {
      id: "sybrite",
      name: "Harsh Verma",
      role: "Full Stack Developer Intern & Dev. Team Lead",
      category: "intern",
      education: "BTECH(Chemical Eng.) , NIT Rourkela",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742066448/me_nawvbg.jpg",
    },
    {
      id: "ashwani-senapati",
      name: "Ashwani Senapati",
      role: "Full Stack Developer Intern",
      category: "intern",
      education: "BTECH (EI) , NIT Rourkela",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067863/ashwani_njndlo.jpg",
    },
    {
      id: "sandeep-kumawat",
      name: "Sandeep Kumawat",
      role: "AI/ML Intern & Team Lead",
      category: "intern",
      education: "IIT Roorkee (MSc Mathematics)",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742066888/sandeep_ezmka2.jpg",
    },
    {
      id: "ayushman-paul",
      name: "Ayushman Paul",
      role: "AI/ML Intern & Team Lead",
      category: "intern",
      education: "BTECH (Mechanical Eng.) , IIT Kharagpur",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742066983/Ayushman_lbakbe.jpg",
    },
    {
      id: "samyak-jain",
      name: "Samyak Jain",
      role: "AI/ML Intern & Team Lead",
      category: "intern",
      education: "BTECH (Computer Science) , JUET",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067091/samyak_c2ykmn.jpg",
    },
    {
      id: "bharath-bojanna-a-k",
      name: "Bharath Bojanna A K",
      role: "AI/ML Intern & Team Lead",
      category: "intern",
      education: "BTECH(AIML), JSSATE",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067150/bojanna_qwvaxt.jpg",
    },
    {
      id: "suhana-rafic",
      name: "Suhana Rafic",
      role: "UI/UX Designer Intern & Team Lead",
      category: "intern",
      education: "BE(Computer Science) , VTU ",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067318/suhana_p3pezh.jpg",
    },
    {
      id: "ria-dsouza",
      name: "Ria D’Souza",
      role: "Founder’s Office Intern",
      category: "intern",
      education: "BE(Computer Science) , VTU",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067488/ria_fvp1va.jpg",
    },
    {
      id: "saumik-chakraborty",
      name: "Saumik Chakraborty",
      role: "AI/ML Intern",
      category: "intern",
      education: "BTECH(Computer Science) , NIST",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067866/saumik_sdawre.png",
    },
    {
      id: "bobbara-pardhasaradhi-naidu",
      name: "Bobbara Pardhasaradhi Naidu ",
      role: "Project Management Intern",
      category: "intern",
      education: "BTECH(Computer Science), LBRCE",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067865/naidu_sxl55s.jpg",
    },
    {
      id: "sreyashi-nag",
      name: "Sreyashi Nag",
      role: "UIUX Designer Intern",
      category: "intern",
      education: "PG Diploma(Product Design) , IIT Roorkee",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067864/shreyashi_lucyhh.jpg",
    },
    {
      id: "anjali-sharma",
      name: "Anjali Sharma",
      role: "AI/ML Intern",
      category: "intern",
      education: "BTECH ( Cyber Security ) , GEC Ajmer",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067864/anjali_ewjoqn.jpg",
    },
    {
      id: "ankur-mukhopadhyay",
      name: "Ankur Mukhopadhyay",
      role: "AI/ML Intern",
      category: "intern",
      education: "BTECH (Computer Science) , DSU",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067861/ankur_sh3ymd.jpg",
    },
    {
      id: "nishant-kumbhar",
      name: "Nishant Kumbhar",
      role: "AI/ML Intern",
      category: "intern",
      education: "BTECH (Computer Science) , DYPIT (Pune)",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067861/nishant_vpq6mv.jpg",
    },
    {
      id: "Payal Das",
      name: "Payal Das",
      role: "Full stack Developer Intern",
      category: "intern",
      education: "BTECH (EI) , NIT Rourkela",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067858/payal_rmmwyr.jpg",
    },
    {
      id: "paridhi-singhal",
      name: "Paridhi Singhal",
      role: "AI/ML Intern",
      category: "intern",
      education: "BTECH , JSSATEN",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067858/singhal_aqgcxu.jpg",
    },
    {
      id: "pranshu-jaiswal",
      name: "Pranshu Jaiswal",
      role: "Frontend Developer Intern",
      category: "intern",
      education: "BTECH ( CS & DS) , VPCET",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067857/pranshu_lstwgg.jpg",
    },
    {
      id: "riddhi-gupta",
      name: "Riddhi Gupta",
      role: "AI/ML Intern",
      category: "intern",
      education: "BCA (DS) , Bennett University",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067857/riddhi_yy5gen.jpg",
    },
    {
      id: "tanbir-aproose-laskar",
      name: "Tanbir Aproose Laskar",
      role: "AI/ML Intern",
      category: "intern",
      education: "BTECH (Civil) , NIT Silchar",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067854/laskar_bcmn8f.jpg",
    },
    {
      id: "suhas-tg",
      name: "Suhas TG",
      role: "AI/ML Intern",
      category: "intern",
      education: "BE (ISE) , RIT",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067853/suhas_kweijj.jpg",
    },
    {
      id: "teja-tanush",
      name: "Teja Tanush",
      role: "AIML Intern & Data Analyst Intern",
      category: "intern",
      education: "BTECH ( Computer Science ) , IIIT Bhopal",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067853/teja_mhj3lg.jpg",
    },
    {
      id: "md-musharaf-ahmed",
      name: "MD Musharaf Ahmed",
      role: "Full Stack Developer Intern",
      category: "intern",
      education: "BTECH ( AIML ) , JNTUH",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067852/ashmed_fnlfbg.jpg",
    },
    {
      id: "padma-banda",
      name: "B Padma",
      role: "UI/UX Designer Intern",
      category: "intern",
      education: "BPharm , VCE",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067852/padma_hbty8v.jpg",
    },
    {
      id: "snita-das",
      name: "Snita Das",
      role: "UIUX Designer Intern",
      category: "intern",
      education: "MTech , GCECT",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742067852/snita_m18apl.jpg",
    },
  ];

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
