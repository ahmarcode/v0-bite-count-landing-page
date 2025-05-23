"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Instagram,
  Twitter,
  Github,
  Mail,
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  Apple,
  BarChart3,
  Scan,
  Droplets,
  Utensils,
  Brain,
  Pill,
  ChevronRight,
  Calendar,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

export default function Home() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isMobile, setIsMobile] = useState(false)

  // Custom cursor
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Parallax effect refs
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Only add mouse move event listener if not on mobile
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)
        setCursorPosition({ x: e.clientX, y: e.clientY })
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("resize", checkMobile)
      }
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [cursorX, cursorY, isMobile])

  // Parallax effect on mouse move
  useEffect(() => {
    if (parallaxRef.current && !isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window

        const moveX = (clientX - innerWidth / 2) / 50
        const moveY = (clientY - innerHeight / 2) / 50

        const elements = parallaxRef.current?.querySelectorAll(".parallax-element") || []

        elements.forEach((el, i) => {
          const depth = i * 0.2 + 0.5
          const translateX = moveX * depth
          const translateY = moveY * depth

          // Apply transform with different intensity based on depth
          ;(el as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`
        })
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [isMobile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would send this data to your backend
    console.log({ name, email })

    setSubmitted(true)
    setLoading(false)
  }

  const enterButton = () => setCursorVariant("button")
  const leaveButton = () => setCursorVariant("default")

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [howItWorksRef, howItWorksInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [contactRef, contactInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [appPreviewRef, appPreviewInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: <Scan className="h-10 w-10 text-green-400" />,
      title: "AI Food Scanner",
      description: "Instantly identify and log foods by taking a photo with our advanced AI recognition technology.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-purple-400" />,
      title: "Macro Tracking",
      description: "Track protein, carbs, and fat with customizable goals based on your specific dietary needs.",
    },
    {
      icon: <Pill className="h-10 w-10 text-blue-400" />,
      title: "Vitamin Analysis",
      description: "Monitor your micronutrient intake with detailed vitamin and mineral tracking and recommendations.",
    },
    {
      icon: <Droplets className="h-10 w-10 text-cyan-400" />,
      title: "Hydration Tracking",
      description: "Set hydration goals and track your daily water intake with smart reminders.",
    },
    {
      icon: <Dumbbell className="h-10 w-10 text-orange-400" />,
      title: "Workout Plans",
      description: "Access personalized workout routines based on your fitness goals and available equipment.",
    },
    {
      icon: <Brain className="h-10 w-10 text-pink-400" />,
      title: "AI Meal Suggestions",
      description: "Get personalized meal recommendations based on your nutritional goals and preferences.",
    },
  ]

  // Text animation for hero section
  const textControls = useAnimation()
  useEffect(() => {
    if (heroInView) {
      const sequence = async () => {
        await textControls.start("visible")
      }
      sequence()
    }
  }, [heroInView, textControls])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Custom cursor - only show on non-mobile */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          variants={{
            default: {
              height: 32,
              width: 32,
              backgroundColor: "rgba(255, 255, 255, 1)",
              borderRadius: "50%",
            },
            button: {
              height: 64,
              width: 64,
              backgroundColor: "rgba(74, 222, 128, 1)",
              borderRadius: "50%",
            },
            text: {
              height: 150,
              width: 150,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              mixBlendMode: "difference",
            },
          }}
          animate={cursorVariant}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
        />
      )}

      {/* Animated background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 200 + 50)}, ${Math.floor(Math.random() * 255)}, 0.1) 0%, rgba(0,0,0,0) 70%)`,
                animation: `pulse ${Math.random() * 10 + 10}s infinite alternate`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              BiteCount
            </span>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex gap-8"
          >
            {["features", "how-it-works", "app", "contact"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className="text-gray-300 hover:text-white transition-colors relative"
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={enterButton}
            onMouseLeave={leaveButton}
          >
            <Button
              variant="outline"
              className="bg-transparent border-green-500 text-green-500 hover:bg-green-500/10 relative overflow-hidden group"
              onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="relative z-10">Join Waitlist</span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section ref={heroRef} className="min-h-[90vh] flex items-center justify-center py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:w-1/2 space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium mb-4"
                >
                  Coming Soon
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0 }}
                  animate={textControls}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  {["Track", "Your"].map((word, i) => (
                    <motion.span
                      key={i}
                      className="block"
                      variants={{
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.5,
                          },
                        },
                      }}
                      initial={{ opacity: 0, y: 20 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                  <motion.span
                    className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 inline-block"
                    variants={{
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                        },
                      },
                    }}
                    initial={{ opacity: 0, y: 20 }}
                  >
                    Nutrition & Workouts
                  </motion.span>
                  <motion.span
                    className="block"
                    variants={{
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                        },
                      },
                    }}
                    initial={{ opacity: 0, y: 20 }}
                  >
                    In One Place
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-300 max-w-xl"
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  BiteCount helps you track your nutrition, plan your workouts, and achieve your fitness goals with
                  personalized insights and AI-powered recommendations.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <motion.div
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 rounded-lg px-8 relative overflow-hidden group"
                      onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <span className="relative z-10 flex items-center">
                        Join Waitlist
                        <motion.span
                          initial={{ x: 0 }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, repeatDelay: 1 }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.span>
                      </span>
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </Button>
                  </motion.div>

                  <motion.div
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 rounded-lg px-8 relative overflow-hidden group"
                      onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <span className="relative z-10">Learn More</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="lg:w-1/2 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.7 }}
                ref={parallaxRef}
              >
                <div className="relative w-full max-w-md mx-auto aspect-[4/5] bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 opacity-50"></div>

                  {/* App Preview */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full p-6">
                      <div className="text-left">
                        <h3 className="text-2xl font-bold mb-6">Dashboard</h3>

                        {/* Today's Summary */}
                        <div className="bg-gray-800/70 rounded-xl p-4 mb-4 parallax-element">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-xl font-semibold">Today's Summary</h4>
                            <div className="flex items-center text-green-400 text-sm">
                              <span>Details</span>
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-3xl font-bold">1,248</div>
                              <div className="text-gray-400 text-sm">/ 2,393 kcal</div>
                            </div>
                            <div className="relative h-16 w-16">
                              <svg className="h-16 w-16 transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="10" />
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="40"
                                  fill="none"
                                  stroke="#4ade80"
                                  strokeWidth="10"
                                  strokeDasharray="251.2"
                                  strokeDashoffset="125"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                                1248
                              </div>
                            </div>
                          </div>

                          <div className="w-full bg-gray-700 h-1.5 rounded-full mb-2">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "52%" }}></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>0</span>
                            <span>2,393</span>
                          </div>
                        </div>

                        {/* Macros */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="bg-gray-800/70 rounded-lg p-3 parallax-element">
                            <div className="text-blue-400 text-sm mb-1">Protein</div>
                            <div className="text-xl font-bold">48g</div>
                            <div className="w-full h-1 bg-blue-400/30 rounded-full mt-2">
                              <div className="h-1 bg-blue-400 rounded-full" style={{ width: "60%" }}></div>
                            </div>
                          </div>
                          <div className="bg-gray-800/70 rounded-lg p-3 parallax-element">
                            <div className="text-yellow-400 text-sm mb-1">Carbs</div>
                            <div className="text-xl font-bold">156g</div>
                            <div className="w-full h-1 bg-yellow-400/30 rounded-full mt-2">
                              <div className="h-1 bg-yellow-400 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                          </div>
                          <div className="bg-gray-800/70 rounded-lg p-3 parallax-element">
                            <div className="text-red-400 text-sm mb-1">Fat</div>
                            <div className="text-xl font-bold">42g</div>
                            <div className="w-full h-1 bg-red-400/30 rounded-full mt-2">
                              <div className="h-1 bg-red-400 rounded-full" style={{ width: "50%" }}></div>
                            </div>
                          </div>
                        </div>

                        {/* Hydration */}
                        <div className="bg-gray-800/70 rounded-xl p-4 mb-6 parallax-element">
                          <div className="flex items-center mb-2">
                            <Droplets className="h-4 w-4 text-blue-400 mr-2" />
                            <span className="text-blue-400">Hydration</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-xl font-bold">1200 / 2000 mL</div>
                            <div className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center">
                              <Plus className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="w-full bg-blue-400/20 h-2 rounded-full">
                            <div className="bg-blue-400 h-2 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                        </div>

                        {/* Today's Meals */}
                        <div className="mb-2">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xl font-semibold">Today's Meals</h4>
                            <div className="flex items-center text-blue-400 text-sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Calendar view</span>
                            </div>
                          </div>

                          <div className="flex items-center bg-gray-800/70 rounded-lg p-3 parallax-element">
                            <div className="bg-gray-700 h-14 w-14 rounded-lg flex items-center justify-center mr-3">
                              <Utensils className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">Grilled Chicken...</div>
                              <div className="text-sm text-gray-400">Lunch</div>
                              <div className="text-xs text-gray-500">1 bowl (250g)</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">350</div>
                              <div className="text-xs text-gray-400">kcal</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl parallax-element"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl parallax-element"></div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-5 -right-5 parallax-element"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                >
                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 backdrop-blur-sm p-3 rounded-lg border border-purple-500/30 shadow-lg">
                    <Pill className="h-6 w-6 text-purple-400" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-1/4 -left-10 parallax-element"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 4,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 backdrop-blur-sm p-3 rounded-lg border border-green-500/30 shadow-lg">
                    <Apple className="h-6 w-6 text-green-400" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-10 -right-8 parallax-element"
                  animate={{
                    y: [0, 8, 0],
                    rotate: [0, 3, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 6,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                >
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-sm p-3 rounded-lg border border-blue-500/30 shadow-lg">
                    <Droplets className="h-6 w-6 text-blue-400" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" ref={featuresRef} className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  Powerful Features
                </span>
              </h2>
              <p className="text-xl text-gray-300">
                Everything you need to track your nutrition and fitness journey in one app
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/80 transition-all hover:shadow-lg hover:shadow-green-500/5 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  onMouseEnter={() => setCursorVariant("button")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <motion.div
                    className="mb-4 relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* App Preview Section */}
        <section id="app" ref={appPreviewRef} className="py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={appPreviewInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  Intuitive Interface
                </span>
              </h2>
              <p className="text-xl text-gray-300">
                Designed for simplicity and efficiency to make tracking your health a seamless experience
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                animate={appPreviewInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="space-y-6 max-w-lg">
                  <motion.div
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-green-500/50 transition-colors"
                    whileHover={{
                      y: -5,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    onMouseEnter={() => setCursorVariant("button")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-green-500/20 p-3 rounded-lg">
                        <BarChart3 className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Detailed Analytics</h3>
                        <p className="text-gray-300">
                          Track your progress with comprehensive charts and insights that help you understand your
                          nutrition patterns.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-colors"
                    whileHover={{
                      y: -5,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    onMouseEnter={() => setCursorVariant("button")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-500/20 p-3 rounded-lg">
                        <Scan className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">One-Tap Food Logging</h3>
                        <p className="text-gray-300">
                          Simply take a photo of your meal and our AI will identify the food and calculate the
                          nutritional content.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
                    whileHover={{
                      y: -5,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    onMouseEnter={() => setCursorVariant("button")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-500/20 p-3 rounded-lg">
                        <Brain className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
                        <p className="text-gray-300">
                          Get personalized meal and workout suggestions based on your goals, preferences, and progress.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="lg:w-1/2 relative"
                initial={{ opacity: 0, x: 50 }}
                animate={appPreviewInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <div className="relative mx-auto w-full max-w-sm">
                  {/* Phone frame */}
                  <div className="relative z-10 border-8 border-gray-800 rounded-[3rem] overflow-hidden shadow-2xl">
                    <div className="aspect-[9/19] bg-gray-900 overflow-hidden">
                      {/* App screenshot */}
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hUiD5AU9zTnNemRd7Q82eIOEGeR6mh.png"
                        alt="BiteCount App Dashboard"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Notch */}
                    <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 rounded-b-xl"></div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-1/4 -right-10 w-20 h-20 bg-green-500/30 rounded-full blur-xl"></div>
                  <div className="absolute bottom-1/4 -left-10 w-20 h-20 bg-blue-500/30 rounded-full blur-xl"></div>

                  {/* Floating UI elements */}
                  <motion.div
                    className="absolute -top-5 -right-5 z-20"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 5,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm p-3 rounded-lg border border-gray-700 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium">Goal reached!</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-5 -left-5 z-20"
                    animate={{
                      y: [0, 10, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 6,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm p-3 rounded-lg border border-gray-700 shadow-lg">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-400" />
                        <span className="text-xs font-medium">Hydration reminder</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" ref={howItWorksRef} className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  How It Works
                </span>
              </h2>
              <p className="text-xl text-gray-300">Simple steps to transform your fitness journey</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Track Your Meals",
                  description:
                    "Log your daily food intake with our extensive database or simply take a photo with our AI scanner.",
                  icon: <Scan className="h-8 w-8 text-green-400" />,
                },
                {
                  step: "02",
                  title: "Monitor Progress",
                  description:
                    "Track macros, vitamins, and hydration with detailed analytics to understand your nutrition patterns.",
                  icon: <BarChart3 className="h-8 w-8 text-blue-400" />,
                },
                {
                  step: "03",
                  title: "Achieve Your Goals",
                  description: "Get personalized recommendations and adjust your plan based on AI-powered insights.",
                  icon: <Brain className="h-8 w-8 text-purple-400" />,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                  onMouseEnter={() => setCursorVariant("button")}
                  onMouseLeave={() => setCursorVariant("default")}
                  whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                >
                  <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8 h-full group hover:border-green-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-5xl font-bold text-gray-700 group-hover:text-gray-600 transition-colors">
                        {item.step}
                      </div>
                      <motion.div
                        className="bg-gray-800 p-3 rounded-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-green-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>

                  {index < 2 && (
                    <motion.div
                      className="hidden md:block absolute top-1/2 -right-4 transform translate-x-full"
                      initial={{ opacity: 0 }}
                      animate={howItWorksInView ? { opacity: 0.5 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <ArrowRight className="h-8 w-8 text-green-500" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Admin Dashboard Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  Admin Dashboard
                </span>
              </h2>
              <p className="text-xl text-gray-300">Manage your waitlist and user data with our powerful admin tools</p>
            </motion.div>

            <motion.div
              className="relative max-w-5xl mx-auto rounded-xl overflow-hidden border border-gray-700 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-gray-800 p-3 flex items-center gap-2 border-b border-gray-700">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-400 mx-auto">BiteCount Admin Dashboard</div>
              </div>

              <div className="bg-gray-900 p-6">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-2xl font-bold">Waitlist Entries</h3>
                    <p className="text-gray-400">Manage and export your waitlist subscribers</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      Export CSV
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0"
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      Send Email Campaign
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl overflow-hidden mb-6">
                  <div className="grid grid-cols-12 bg-gray-700/50 p-4 text-sm font-medium text-gray-300">
                    <div className="col-span-1">#</div>
                    <div className="col-span-3">Name</div>
                    <div className="col-span-4">Email</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Actions</div>
                  </div>

                  {[
                    { id: 1, name: "John Smith", email: "john@example.com", date: "2023-05-21" },
                    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", date: "2023-05-21" },
                    { id: 3, name: "Michael Brown", email: "michael@example.com", date: "2023-05-20" },
                    { id: 4, name: "Emily Davis", email: "emily@example.com", date: "2023-05-20" },
                    { id: 5, name: "David Wilson", email: "david@example.com", date: "2023-05-19" },
                  ].map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      className={cn(
                        "grid grid-cols-12 p-4 text-sm border-t border-gray-700",
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-800/50",
                      )}
                      whileHover={{ backgroundColor: "rgba(74, 222, 128, 0.05)" }}
                    >
                      <div className="col-span-1">{entry.id}</div>
                      <div className="col-span-3">{entry.name}</div>
                      <div className="col-span-4">{entry.email}</div>
                      <div className="col-span-2">{entry.date}</div>
                      <div className="col-span-2 flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                          onMouseEnter={enterButton}
                          onMouseLeave={leaveButton}
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          onMouseEnter={enterButton}
                          onMouseLeave={leaveButton}
                        >
                          Delete
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">Showing 5 of 243 entries</div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="max-w-3xl mx-auto mt-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">How the Admin Dashboard Works</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-300">
                <li>User data from the waitlist form is securely stored in our database</li>
                <li>Admins can access the dashboard with secure credentials</li>
                <li>View, filter, and search through all waitlist entries</li>
                <li>Export data to CSV for further analysis or marketing campaigns</li>
                <li>Send email campaigns directly to your waitlist subscribers</li>
                <li>Track analytics on form submissions and user engagement</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="waitlist" className="py-20 bg-gradient-to-br from-gray-900 to-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-12">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    Join the Waitlist
                  </span>
                </h2>
                <p className="text-xl text-gray-300">Be the first to know when BiteCount launches</p>
              </motion.div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="group relative">
                      <Input
                        type="text"
                        placeholder="Your Name"
                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 h-12 transition-all focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        onMouseEnter={() => setCursorVariant("text")}
                        onMouseLeave={() => setCursorVariant("default")}
                      />
                      <div className="absolute inset-0 border border-green-500/0 rounded-md group-focus-within:border-green-500/50 pointer-events-none transition-all"></div>
                    </div>
                    <div className="group relative">
                      <Input
                        type="email"
                        placeholder="Your Email"
                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 h-12 transition-all focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        onMouseEnter={() => setCursorVariant("text")}
                        onMouseLeave={() => setCursorVariant("default")}
                      />
                      <div className="absolute inset-0 border border-green-500/0 rounded-md group-focus-within:border-green-500/50 pointer-events-none transition-all"></div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 relative overflow-hidden group"
                        disabled={loading}
                      >
                        <span className="relative z-10">
                          {loading ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Processing...
                            </div>
                          ) : (
                            "Join Waitlist"
                          )}
                        </span>
                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      </Button>
                    </motion.div>
                    <p className="text-xs text-gray-400 text-center mt-4">
                      By joining, you agree to our{" "}
                      <Link href="#" className="text-green-400 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-green-400 hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
                    <p className="text-gray-300 mb-6">
                      Thanks for joining our waitlist. We'll notify you when BiteCount launches.
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      <Button
                        variant="outline"
                        className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                        onClick={() => setSubmitted(false)}
                      >
                        Back to Form
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  Get In Touch
                </span>
              </h2>
              <p className="text-xl text-gray-300">Have questions? We'd love to hear from you</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={contactInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-green-400 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Email Us</h4>
                      <a
                        href="mailto:hello@bitecount.app"
                        className="text-gray-300 hover:text-green-400 transition-colors"
                      >
                        hello@bitecount.app
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Github className="h-6 w-6 text-green-400 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">GitHub</h4>
                      <a
                        href="https://github.com/bitecount"
                        className="text-gray-300 hover:text-green-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        github.com/bitecount
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Twitter className="h-6 w-6 text-green-400 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Twitter</h4>
                      <a
                        href="https://twitter.com/bitecount"
                        className="text-gray-300 hover:text-green-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @bitecount
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Follow Us</h4>
                    <div className="flex gap-4">
                      <motion.a
                        href="#"
                        className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition-all"
                        aria-label="Instagram"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={enterButton}
                        onMouseLeave={leaveButton}
                      >
                        <Instagram className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition-all"
                        aria-label="Twitter"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={enterButton}
                        onMouseLeave={leaveButton}
                      >
                        <Twitter className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition-all"
                        aria-label="GitHub"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={enterButton}
                        onMouseLeave={leaveButton}
                      >
                        <Github className="h-5 w-5" />
                      </motion.a>
                    </div>
                  </div>

                  <div className="pt-6">
                    <h4 className="font-medium mb-3">Office Hours</h4>
                    <p className="text-gray-300">Monday - Friday: 9am - 5pm EST</p>
                    <p className="text-gray-300">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={contactInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                <form className="space-y-4">
                  <div className="group relative">
                    <Input
                      type="text"
                      placeholder="Your Name"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 transition-all focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      onMouseEnter={() => setCursorVariant("text")}
                      onMouseLeave={() => setCursorVariant("default")}
                    />
                    <div className="absolute inset-0 border border-green-500/0 rounded-md group-focus-within:border-green-500/50 pointer-events-none transition-all"></div>
                  </div>
                  <div className="group relative">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 transition-all focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      onMouseEnter={() => setCursorVariant("text")}
                      onMouseLeave={() => setCursorVariant("default")}
                    />
                    <div className="absolute inset-0 border border-green-500/0 rounded-md group-focus-within:border-green-500/50 pointer-events-none transition-all"></div>
                  </div>
                  <div className="group relative">
                    <Textarea
                      placeholder="Your Message"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 min-h-[120px] transition-all focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      onMouseEnter={() => setCursorVariant("text")}
                      onMouseLeave={() => setCursorVariant("default")}
                    />
                    <div className="absolute inset-0 border border-green-500/0 rounded-md group-focus-within:border-green-500/50 pointer-events-none transition-all"></div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                  >
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Send Message</span>
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  BiteCount
                </span>
              </div>
              <p className="text-gray-400 max-w-md">
                Track your nutrition, plan your workouts, and achieve your fitness goals with personalized insights and
                AI-powered recommendations.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-green-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#app" className="text-gray-400 hover:text-green-400 transition-colors">
                    App Preview
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-gray-400 hover:text-green-400 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#waitlist" className="text-gray-400 hover:text-green-400 transition-colors">
                    Join Waitlist
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-green-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} BiteCount. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom cursor effect (optional) */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.1);
            opacity: 0.2;
          }
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::selection {
          background-color: rgba(74, 222, 128, 0.2);
          color: #fff;
        }
        
        /* Hide default cursor when custom cursor is active */
        ${!isMobile ? "body { cursor: none; }" : ""}
      `}</style>
    </div>
  )
}
