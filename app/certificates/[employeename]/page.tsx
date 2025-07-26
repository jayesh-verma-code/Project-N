"use client";

import { useParams, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import ParticlesBackground from "@/components/shared/particle-background";
import NoiseTexture from "@/components/shared/noise-texture";
import CustomCursor from "@/components/shared/custom-cursor";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  Award,
  Calendar,
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { teamMembers } from "@/contents/team-section";
import { pioneers, additionalPioneer } from "@/contents/pioneer-section";
import {
  getCertificatesForEmployee,
  hasEmployeeCertificates,
  getDefaultCertificates,
  type CertificateDocument,
} from "@/contents/certificates-data";

export default function EmployeeCertificatePage() {
  const params = useParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.employeename) {
      const employeeName =
        typeof params.employeename === "string"
          ? params.employeename.replace(/-/g, " ")
          : "";

      const allMembers = [
        ...pioneers.map((p) => ({ ...p, category: "leadership" as const })),
        ...additionalPioneer.map((p) => ({
          ...p,
          category: "leadership" as const,
        })),
        ...teamMembers,
      ];

      const foundMember = allMembers.find(
        (m) => m.name.toLowerCase() === employeeName.toLowerCase()
      );

      if (foundMember) {
        setMember(foundMember);
      } else {
        router.push("/certificates");
      }
      setLoading(false);
    }
  }, [params.employeename, router]);

  const getCertificates = (
    memberName: string,
    category: string
  ): CertificateDocument[] => {
    const realCertificates = getCertificatesForEmployee(memberName);

    if (realCertificates.length > 0) {
      return realCertificates;
    }

    return getDefaultCertificates(memberName, category);
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "offer_letter":
        return <Briefcase className="w-5 h-5 text-blue-400" />;
      case "completion_certificate":
        return <Award className="w-5 h-5 text-green-400" />;
      case "experience_letter":
        return <FileText className="w-5 h-5 text-purple-400" />;
      case "recommendation_letter":
        return <GraduationCap className="w-5 h-5 text-yellow-400" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case "offer_letter":
        return "from-blue-500/20 to-blue-600/20 border-blue-500/30";
      case "completion_certificate":
        return "from-green-500/20 to-green-600/20 border-green-500/30";
      case "experience_letter":
        return "from-purple-500/20 to-purple-600/20 border-purple-500/30";
      case "recommendation_letter":
        return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30";
      default:
        return "from-gray-500/20 to-gray-600/20 border-gray-500/30";
    }
  };

  if (loading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </ThemeProvider>
    );
  }

  if (!member) {
    return null;
  }

  const certificates = getCertificates(member.name, member.category);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main
        ref={containerRef}
        className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden"
      >
        <CustomCursor containerRef={containerRef} />
        <NoiseTexture />
        <ParticlesBackground />

        <div className="relative z-10 min-h-screen">
          <div className="flex items-center justify-between p-6 md:p-8">
            <Link
              href="/certificates"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Certificates</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="px-6 md:px-8 mb-12"
          >
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                      <img
                        src={member.avatar || "/placeholder-avatar.png"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-avatar.png";
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      {member.name}
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{member.role}</span>
                      </div>
                      {member.education && (
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                          <GraduationCap className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">
                            {member.education}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center md:justify-start">
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${
                          member.category === "leadership"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : member.category === "employee"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        }`}
                      >
                        {member.category === "leadership"
                          ? "Leadership"
                          : member.category === "employee"
                          ? "Employee"
                          : "Intern"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="px-6 md:px-8 pb-12"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  Available Certificates
                </h2>
              </div>

              <div className="grid gap-6">
                {certificates.map((certificate, index) => (
                  <motion.div
                    key={certificate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`bg-gradient-to-r ${getDocumentTypeColor(
                      certificate.type
                    )} backdrop-blur-sm border rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 rounded-lg bg-gray-800/50">
                          {getDocumentIcon(certificate.type)}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {certificate.name}
                          </h3>
                          {certificate.description && (
                            <p className="text-gray-300 mb-3">
                              {certificate.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Issued:{" "}
                              {new Date(
                                certificate.issueDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <a
                          href={certificate.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="hidden sm:inline">View</span>
                        </a>
                        <a
                          href={certificate.driveUrl.replace(
                            "/view",
                            "/export?format=pdf"
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                        >
                          <Download className="w-4 h-4" />
                          <span className="hidden sm:inline">Download</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {certificates.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">
                    No certificates available
                  </h3>
                  <p className="text-gray-400">
                    Certificates will be available once they are issued.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </ThemeProvider>
  );
}
