'use client';
import { useRef, useState } from "react";
import { ThemeProvider } from "next-themes";
import ParticlesBackground from "@/components/shared/particle-background";
import NoiseTexture from "@/components/shared/noise-texture";
import CustomCursor from "@/components/shared/custom-cursor";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Activity, Stethoscope, Brain, Zap, Shield, ScanEye, MessageCircle } from "lucide-react";

// Types
interface MedicalCategory {
  id: string;
  title: string;
  image: string;
  icon: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    scale: 1.03,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

const imageVariants = {
  hover: {
    scale: 1.12,
    rotate: 2,
    transition: {
      duration: 0.5,
      ease: "backOut"
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)",
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
};

// Main Page Component
export default function HealthMatePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  // Categories data matching the screenshot
  const categories: MedicalCategory[] = [
    { id: 'kidney-ct', title: 'Kidney - CT', image: '/imagekidney.png', icon: 'kidney' },
    { id: 'chest-xray', title: 'Chest - Xray', image: '/image chest xray.png', icon: 'chest' },
    { id: 'mri', title: 'MRI', image: '/image mri.png', icon: 'mri' },
    { id: 'xray', title: 'Xray', image: '/image xray.png', icon: 'xray' },
    { id: 'thyroid', title: 'Thyroid', image: '/image thytoid.png', icon: 'thyroid' },
    { id: 'sonography', title: 'Sonography', image: '/image sonography.png', icon: 'sonography' },
    { id: 'biopsy', title: 'General Chatbot', image: '/image biospy.png', icon: 'chat' },
    { id:'ayurveda', title:'Ayurveda Chatbot',image:'/image biospy.png', icon:'chat'}
  ];

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main
        ref={containerRef}
        className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden"
      >
        <NoiseTexture />
        <ParticlesBackground />
        <CustomCursor
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
        />

        {/* Back button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <Link href="/HealthMateLanding">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-md border border-black"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black"
                >
                  <path
                    d="M20 12H4M4 12L10 6M4 12L10 18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>
          </Link>
        </div>
        
        {/* Decorative particle cluster */}
        <div className="absolute top-0 right-0 z-10 opacity-40">
          <div className="w-64 h-64 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 py-6 relative z-10">
          {/* Header - Centered */}
          <header className="flex flex-col items-center mb-16 mt-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-blue-500 mb-2"
            >
              HealthMate
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex border border-green-500 items-center bg-opacity-50 rounded-full px-4 py-1"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Online</span>
            </motion.div>
          </header>
          
          {/* Medical Categories Grid - Matches screenshot */}
          <div className="max-w-4xl mx-auto">
            {/* First 4 cards */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4"
            >
              {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </motion.div>
            
            {/* Last 3 cards centered */}
            {/* <div className="flex justify-center">
              <motion.div 
                variants={container}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl"
              >
                {categories.slice(4).map(category => (
                  <CategoryCard key={category.id} category={category} />
                ))}
                {/* Empty div to maintain grid alignment */}
                {/* <div className="hidden md:block"></div>
              </motion.div>
            </div> */} 
          </div>
          
          {/* Bottom particle cluster */}
          <div className="absolute bottom-0 left-0 z-10 opacity-40">
            <div className="w-64 h-64 rounded-full"></div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}

// Extracted CategoryCard component for consistency
function CategoryCard({ category }: { category: MedicalCategory }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const rotateX = useTransform(y, [-100, 100], [12, -12]);
  const rotateY = useTransform(x, [-100, 100], [-12, 12]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const renderIcon = () => {
    const iconSize = 20; // Smaller size for these cards
    const iconColor = "rgba(59, 130, 246, 0.9)"; // blue-500
    
    switch(category.icon) {
      case "kidney":
        return (
          <motion.div
            animate={{ 
              rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: 2.5,
              repeatDelay: 1
            }}
          >
            <Activity size={iconSize} color={iconColor} strokeWidth={1.5} />
          </motion.div>
        );
      
      case "chest":
        return (
          <motion.div
            animate={{ 
              rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop",
              duration: 2.5,
              ease: "easeInOut" 
            }}
          >
            <Stethoscope size={iconSize} color={iconColor} strokeWidth={1.5} />
          </motion.div>
        );
      
      case "mri":
        return (
          <motion.div
            animate={{ 
              rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0
            }}
            transition={{ 
             repeat: Infinity, 
              repeatType: "loop",
              duration: 2.5,
              ease: "easeInOut" 
            }}
          >
            <Brain size={iconSize} color={iconColor} strokeWidth={1.5} />
          </motion.div>
        );
      
      case "xray":
        return (
          <motion.div
            animate={{ 
              rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0
            }}
            transition={{ 
            repeat: Infinity, 
              repeatType: "loop",
              duration: 2.5,
              ease: "easeInOut"
            }}
          >
            <Zap size={iconSize} color={iconColor} strokeWidth={1.5} />
          </motion.div>
        );

      case "thyroid":
        return (
          <motion.div
            animate={{ 
              rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0
            }}
            transition={{ 
            repeat: Infinity, 
              repeatType: "loop",
              duration: 2.5,
              ease: "easeInOut"
            }}
          >
            <Shield size={iconSize} color={iconColor} strokeWidth={1.5} />
          </motion.div>
        );

      case "sonography":
        return (
          <motion.div
            animate={{ 
              rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0
            }}
            transition={{ 
            repeat: Infinity, 
              repeatType: "loop",
              duration: 2.5,
              ease: "easeInOut"
            }}
          >
            <ScanEye size={iconSize} color={iconColor} strokeWidth={1.5} />
          </motion.div>
        );

      case "chat":
        return (
          <motion.div
            animate={{ 
              rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0
            }}
            transition={{ 
            repeat: Infinity, 
              repeatType: "loop",
              duration: 2.5,
              ease: "easeInOut"
            }}
          >
            <MessageCircle size={iconSize} color={iconColor} strokeWidth={1.5} />
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="flex flex-col items-center bg-gray-800 bg-opacity-50 rounded-lg p-4 relative z-30 transition-all duration-500 ease-out
        overflow-hidden
        before:absolute before:inset-0 before:rounded-lg before:border before:border-blue-500/20
        before:bg-gradient-to-br before:from-blue-600/0 before:to-cyan-400/0
        hover:before:from-blue-600/30 hover:before:to-cyan-400/30
        before:z-0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
        hover:shadow-[0_0_25px_rgba(59,130,246,0.45)] hover:border-blue-500/30"
    >
      {/* Ambient glow effect */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 
                  bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),transparent_70%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      />
      
      {/* Moving highlight */}
      <motion.div
        className="absolute -inset-1/2 z-0 transition-opacity duration-700 
                   bg-gradient-conic from-blue-900 via-blue-700 to-cyan-400 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 0.4 : 0,
          rotate: isHovered ? [0, 360] : 0,
          scale: isHovered ? [1, 1.05, 1] : 1,
        }}
        transition={{ 
          opacity: { duration: 0.7 },
          rotate: { repeat: Infinity, duration: 10, ease: "linear" },
          scale: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }}
      />
      
      {/* SVG Icon in top right corner - only visible on hover */}
      <motion.div 
        className="absolute top-2 right-2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {renderIcon()}
      </motion.div>

      {/* Circular image */}
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 flex items-center justify-center relative transform-gpu" style={{ transformStyle: "preserve-3d" }}>
        {/* Image glow effect */}
        <motion.div 
          className="absolute inset-2 rounded-full bg-gradient-to-tr from-white/20 to-white/5 blur-md transition-opacity duration-500 z-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered ? ["0 0 0px rgba(59,130,246,0)", "0 0 25px rgba(59,130,246,0.6)", "0 0 15px rgba(59,130,246,0.5)"] : "0 0 0px rgba(59,130,246,0)",
          }}
          transition={{ 
            opacity: { duration: 0.5 },
            boxShadow: { 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 2.5 
            }
          }}
        />
        <motion.div
          variants={imageVariants}
          whileHover="hover"
          className="relative z-10 w-full h-full transform-gpu" 
          style={{ transform: "translateZ(30px)" }}
        >
          <img 
            src={category.image} 
            alt={category.title} 
            className="object-cover w-full h-full transition-all duration-500" 
            style={{
              boxShadow: isHovered ? "0 0 20px rgba(59,130,246,0.7)" : "none"
            }}
          />
        </motion.div>
      </div>
      
      <motion.span 
        className="text-sm mt-3 mb-3 text-center transform-gpu transition-colors duration-500" 
        style={{ 
          transform: "translateZ(20px)",
          color: isHovered ? "#60a5fa" : "white",
          textShadow: isHovered ? "0 0 8px rgba(59,130,246,0.7)" : "none"
        }}
      >
        {category.title}
      </motion.span>
      
      <Link 
        href={`/Healthmate?category=${category.id}`}
        className="transform-gpu"
        style={{ transform: "translateZ(25px)" }}
      >
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="bg-white text-black text-xs font-medium py-1 px-4 rounded-full hover:bg-gray-200 transition-colors
                    relative overflow-hidden 
                    before:absolute before:inset-0 before:w-full before:h-full before:bg-gradient-to-r
                    before:from-transparent before:via-white/60 before:to-transparent before:translate-x-[-100%]"
          style={{
            boxShadow: isHovered ? "0 0 15px rgba(255,255,255,0.5)" : "none"
          }}
        >
          Get Started
        </motion.button>
      </Link>
    </motion.div>
  );
}