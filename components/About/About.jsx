'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AboutUs() {
  const [flipped, setFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState('why');

  // Handle tab clicks without triggering card flip
  const handleTabClick = (tab, e) => {
    e.stopPropagation();
    setActiveTab(tab);
  };

  const tabContent = {
    why: (
      <>
        <h2 className="text-2xl font-bold mb-4">Why?</h2>
        <p className="mb-4">
          Access to quality healthcare remains one of the most pressing global challenges. <em>According to the World Health Organization (WHO), nearly 5.8 billion people worldwide lack access to essential health services.</em>  
          While developing nations struggle with inadequate healthcare infrastructure, developed countries grapple with skyrocketing medical costs.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Rising healthcare costs:</strong> The global healthcare market is projected to reach <em>$12 trillion by 2025</em>, with costs continuing to rise.</li>
          <li><strong>Shortage of medical professionals:</strong> The WHO predicts a <em>shortage of 10 million healthcare workers by 2030</em>, making timely medical consultations difficult.</li>
          <li><strong>Mental health crisis:</strong> Over <em>1 billion people</em> worldwide suffer from mental health disorders, yet <em>only 2% of global healthcare budgets</em> are allocated to mental health services.</li>
        </ul>
        <p>
          At <strong>NirveonX</strong>, we believe technology can bridge these gaps. Our mission is to make <em>healthcare accessible, affordable, and truly personalized</em>—empowering individuals to take control of their well-being.
        </p>
      </>
    ),
    how: (
      <>
        <h2 className="text-2xl font-bold mb-4">How?</h2>
        <p className="mb-4">
          We are a team of innovators and problem-solvers who believe in the transformative power of <em>Artificial Intelligence (AI)</em> and <em>telehealth solutions</em>.  
          By integrating AI-driven diagnostics, virtual consultations, and direct access to industry professionals, we are revolutionizing the way people experience healthcare.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>AI-driven intelligence:</strong> Personalized healthcare recommendations, real-time symptom analysis, and predictive diagnostics.</li>
          <li><strong>Video & audio consultations:</strong> Connect instantly with <em>doctors, mental health therapists, fitness coaches, and elder care specialists</em>.</li>
          <li><strong>Remote healthcare access:</strong> Get expert opinions from <em>top medical professionals, psychologists, and nutritionists</em> without physical visits.</li>
        </ul>
      </>
    ),
    what: (
      <>
        <h2 className="text-2xl font-bold mb-4">What?</h2>
        <p className="mb-4">
          At the heart of NirveonX is a <em>comprehensive AI-powered healthcare platform</em> designed to deliver <em>seamless and personalized</em> medical experiences.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Healthmate</strong> – Virtual doctor consultations, fitness & nutrition guidance.</li>
          <li><strong>Pet AI</strong> – AI-driven veterinary care for pets and animal wellness.</li>
          <li><strong>Golden Care</strong> – Elder care support and assistance for aging individuals.</li>
          <li><strong>Mindease</strong> – Anonymous mental health support, therapy, and emotional well-being.</li>
        </ul>
        <p className="mb-4">
          With <em>live video & audio calls</em>, NirveonX connects users with industry experts:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Licensed doctors</strong> for quick diagnosis and treatment plans.</li>
          <li><strong>Certified therapists</strong> for mental health support in a safe and private space.</li>
          <li><strong>Fitness and wellness experts</strong> for personalized health coaching.</li>
          <li><strong>24/7 accessibility</strong>—because healthcare should never be out of reach.</li>
        </ul>
        <p>
          By leveraging <em>cutting-edge AI, telemedicine, and real-time consultations</em>, <strong>NirveonX makes proactive healthcare a reality, not a luxury.</strong>
        </p>
      </>
    )
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-0 pt-0 bg-black/50">
      <div className="md:w-3/5 w-4/5 h-[100vh] md:h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-2 mt-0">About Us</h1>
        </motion.div>

        <div
          className="relative w-full md:h-[calc(80vh-80px)] h-[calc(70vh-75px)] [perspective:1500px]"
          onClick={() => setFlipped(!flipped)}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl shadow-lg [transform-style:preserve-3d]"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {/* Front Side */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white backdrop-blur-md rounded-2xl [backface-visibility:hidden] p-8 text-center overflow-hidden">
              <h1 className="text-3xl font-bold mb-6">Join Us in Redefining Healthcare</h1>
              <p className="text-lg mb-8">
                At <strong>NirveonX</strong>, we&apos;re on a mission to make healthcare accessible, affordable, and truly personalized.
              </p>
              <span className="animate-pulse text-blue-300">Tap to explore our mission →</span>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 flex flex-col bg-white/10 text-white rounded-2xl p-6 overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="flex border-b border-white/20 mb-4">
                {['why', 'how', 'what'].map((tab) => (
                  <button
                    key={tab}
                    onClick={(e) => handleTabClick(tab, e)}
                    className={`px-4 py-2 text-lg font-medium ${activeTab === tab ? 'text-blue-300 border-b-2 border-blue-300' : 'text-white/70 hover:text-white'}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}?
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-auto pr-2 text-left">{tabContent[activeTab]}</div>

              <div className="mt-4 text-center">
                <p className="font-bold text-blue-300">Join Us in Redefining Healthcare—One Innovation at a Time.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
