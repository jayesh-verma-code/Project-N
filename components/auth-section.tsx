"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SignupForm from "./signup-form"
import { Facebook, Chrome } from "lucide-react"

export default function AuthSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeTab, setActiveTab] = useState("login")

  const renderBackground = () => (
    <div className="absolute inset-0 z-0">
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-purple-900/20 to-transparent opacity-30" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-cyan-900/20 to-transparent opacity-30" />
    </div>
  )

  const renderHeader = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
        Join NIRVEON&apos;X Today
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Create your account to access personalized AI health and wellness services tailored to your needs.
      </p>
    </motion.div>
  )

  const renderLoginForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            className="bg-gray-900/50 border-gray-700"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300">
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="bg-gray-900/50 border-gray-700"
          />
        </div>
        <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
          Login
        </Button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative px-4 bg-black dark:bg-black text-sm text-gray-400">Or continue with</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="border-gray-700">
          <Facebook className="mr-2 h-4 w-4 text-blue-500" />
          Facebook
        </Button>
        <Button variant="outline" className="border-gray-700">
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
    </div>
  )

  const renderTabs = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">{renderLoginForm()}</TabsContent>
        <TabsContent value="signup">
          <SignupForm />
        </TabsContent>
      </Tabs>
    </motion.div>
  )

  return (
    <section id="auth" className="py-24 px-4 relative overflow-hidden" ref={ref}>
      {renderBackground()}
      <div className="container mx-auto relative z-10">
        {renderHeader()}
        <div className="max-w-md mx-auto">{renderTabs()}</div>
      </div>
    </section>
  )
}