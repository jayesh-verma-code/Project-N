"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Linkedin,
  Twitter,
  Mail,
  Github,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NoiseTexture from "@/components/shared/noise-texture";
import ParticlesBackground from "@/components/shared/particle-background";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  category: "leadership" | "employee" | "intern";
  department?: string;
  location?: string;
  joinDate?: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
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
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef);

  const teamMembers: TeamMember[] = [
    // Leadership
    {
      id: "sarah-johnson",
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      category: "leadership",
      bio: "Sarah is a visionary leader with over 15 years of experience in healthcare technology. She founded NIRVEON'X with the mission to democratize access to quality healthcare through AI.",
      avatar: "/placeholder.svg?height=400&width=400",
      department: "Executive",
      location: "San Francisco, CA",
      joinDate: "2020",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "sarah@nirveonx.com",
      },
    },
    {
      id: "michael-chen",
      name: "Michael Chen",
      role: "Chief Technology Officer",
      category: "leadership",
      bio: "Michael leads our engineering team with expertise in AI and machine learning. Previously, he worked at Google Brain and has multiple patents in healthcare AI technology.",
      avatar: "/placeholder.svg?height=400&width=400",
      department: "Technology",
      location: "San Francisco, CA",
      joinDate: "2020",
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        twitter: "https://twitter.com",
      },
    },
    {
      id: "elena-rodriguez",
      name: "Elena Rodriguez",
      role: "Chief Medical Officer",
      category: "leadership",
      bio: "Dr. Rodriguez brings 20 years of clinical experience to NIRVEON'X. She ensures our AI solutions meet the highest medical standards and truly improve patient outcomes.",
      avatar: "/placeholder.svg?height=400&width=400",
      department: "Medical",
      location: "Boston, MA",
      joinDate: "2021",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "elena@nirveonx.com",
      },
    },
    {
      id: "james-wilson",
      name: "James Wilson",
      role: "Co-Founder & Chief Product Officer",
      category: "leadership",
      bio: "James oversees product strategy and user experience. His background in both healthcare and consumer technology helps bridge the gap between complex medical solutions and intuitive user interfaces.",
      avatar: "/placeholder.svg?height=400&width=400",
      department: "Product",
      location: "New York, NY",
      joinDate: "2020",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },

    // Employees
    {
      id: "alex-patel",
      name: "Alex Patel",
      role: "Senior AI Engineer",
      category: "employee",
      bio: "Alex specializes in natural language processing and leads our conversational AI team. He's passionate about creating AI that can understand and respond to health concerns with empathy.",
      avatar: "/placeholder.svg?height=400&width=400",
      department: "Engineering",
      location: "Seattle, WA",
      joinDate: "2021",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: "olivia-kim",
      name: "Olivia Kim",
      role: "UX/UI Design Lead",
      category: "employee",
      bio: "Olivia leads our design team with a focus on creating accessible and intuitive interfaces for users of all ages and abilities. Her work ensures our complex technology feels simple to use.",
      avatar: "/placeholder.svg?height=400&width=400",
      department: "Design",
      location: "Los Angeles, CA",
      joinDate: "2021",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      id: "marcus-johnson",
      name: "Marcus Johnson",
      role: "Data Science Manager",
      category: "employee",
      bio: "Marcus leads our data science initiatives, focusing on building predictive models that power our health recommendations. He previously worked in bioinformatics at Stanford.",
      avatar: "/placeholder.svg?height=400&width=400",
      department: "Data Science",
      location: "San Francisco, CA",
      joinDate: "2022",
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      id: "priya-sharma",
      name: "Priya Sharma",
      role: "Senior Backend Engineer",
      category: "employee",
      bio: "Priya architects our secure and scalable backend systems. Her expertise in HIPAA-compliant healthcare systems ensures user data remains protected while enabling powerful features.",
      avatar: "/placeholder.svg?height=400&width=400",
      department: "Engineering",
      location: "Austin, TX",
      joinDate: "2021",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: "david-nguyen",
      name: "David Nguyen",
      role: "Marketing Director",
      category: "employee",
      bio: "David leads our marketing efforts with a focus on education and community building. He's passionate about communicating complex health technology in accessible ways.",
      avatar: "/placeholder.svg?height=400&width=400",
      department: "Marketing",
      location: "Chicago, IL",
      joinDate: "2022",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },

    // Interns
    {
      id: "zoe-williams",
      name: "Zoe Williams",
      role: "AI Research Intern",
      category: "intern",
      bio: "Zoe is a PhD candidate in Computer Science at MIT, focusing on reinforcement learning for healthcare applications. She's helping develop our next generation of diagnostic algorithms.",
      avatar: "/placeholder.svg?height=400&width=400",
      department: "Research",
      location: "Boston, MA",
      joinDate: "2023",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: "tyler-jackson",
      name: "Tyler Jackson",
      role: "Frontend Development Intern",
      category: "intern",
      bio: "Tyler is completing his Computer Science degree and brings fresh perspectives to our frontend team. He's working on accessibility improvements and new interactive features.",
      avatar: "/placeholder.svg?height=400&width=400",
      department: "Engineering",
      location: "Remote",
      joinDate: "2023",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: "maya-patel",
      name: "Maya Patel",
      role: "UX Research Intern",
      category: "intern",
      bio: "Maya is pursuing a Master's in Human-Computer Interaction and helps conduct user research to improve our products. She's passionate about inclusive design for elderly users.",
      avatar: "/placeholder.svg?height=400&width=400",
      department: "Design",
      location: "Remote",
      joinDate: "2023",
      social: {
        linkedin: "https://linkedin.com",
      },
    },
  ];

  const handleMemberClick = (memberId: string) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  const filteredMembers = teamMembers.filter(
    (member) => activeTab === "all" || member.category === activeTab
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden cursor-default">
      <NoiseTexture />
      <ParticlesBackground />

      {/* Header */}
      <header
        className="relative pt-32 pb-20 px-4 overflow-hidden"
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
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Team
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meet the passionate individuals behind NIRVEON&apos;X who are
            dedicated to transforming healthcare through AI innovation.
          </motion.p>

          <motion.div
            className="mt-12"
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
              <TabsList className="bg-gray-800/50 border border-gray-700">
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
      <main className="px-4 pb-24">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                isExpanded={expandedMember === member.id}
                onClick={() => handleMemberClick(member.id)}
                variants={itemVariants}
              />
            ))}
          </motion.div>

          {filteredMembers.length === 0 && (
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

interface TeamMemberCardProps {
  member: TeamMember;
  isExpanded: boolean;
  onClick: () => void;
  variants: {
    hidden: { y: number; opacity: number };
    visible: {
      y: number;
      opacity: number;
      transition: { duration: number; ease: number[] };
    };
  };
}

function TeamMemberCard({
  member,
  isExpanded,
  onClick,
  variants,
}: TeamMemberCardProps) {
  const categoryColors = {
    leadership: "bg-blue-100 text-blue-900",
    employee: "bg-green-100 text-green-900",
    intern: "bg-purple-100 text-purple-900",
  };

  const categoryLabels = {
    leadership: "Leadership",
    employee: "Employee",
    intern: "Intern",
  };

  return (
    <motion.div
      variants={variants}
      className={`bg-white rounded-xl overflow-hidden shadow-lg backdrop-blur-sm ${
        isExpanded ? "ring-2 ring-blue-500" : ""
      }`}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Avatar className="h-20 w-20 rounded-xl border-2 border-gray-200">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-gray-700 to-black text-white">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <Badge className={`${categoryColors[member.category]}`}>
            {categoryLabels[member.category]}
          </Badge>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-4">{member.name}</h3>
        <p className="text-gray-700 font-medium">{member.role}</p>

        <div className="mt-4 text-gray-600 line-clamp-2">{member.bio}</div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClick}
          className="mt-4 text-gray-700 p-0 h-auto font-medium flex items-center"
        >
          {isExpanded ? "Show less" : "Read more"}
          <ChevronDown
            className={`ml-1 h-4 w-4 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </Button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
              className="mt-4 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
                {member.department && (
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="text-gray-900">{member.department}</p>
                  </div>
                )}

                {member.location && (
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900">{member.location}</p>
                  </div>
                )}

                {member.joinDate && (
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="text-gray-900">{member.joinDate}</p>
                  </div>
                )}
              </div>

              <div className="text-gray-600 mb-4">{member.bio}</div>

              <div className="flex space-x-3">
                {member.social.linkedin && (
                  <motion.a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-black transition-colors"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>
                )}

                {member.social.twitter && (
                  <motion.a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-black transition-colors"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter className="h-5 w-5" />
                  </motion.a>
                )}

                {member.social.github && (
                  <motion.a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-black transition-colors"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="h-5 w-5" />
                  </motion.a>
                )}

                {member.social.email && (
                  <motion.a
                    href={`mailto:${member.social.email}`}
                    className="text-gray-500 hover:text-black transition-colors"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="h-5 w-5" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
