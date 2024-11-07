"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Palette, Flame, Zap, Sparkles, Wand2, Stars, Brain, Laptop, Cloud, Shapes, Lightbulb } from 'lucide-react'

const tools = [
  {
    name: "Midjourney",
    icon: Palette,
    description: "Optimiert für alle Versionen, inkl. MJ v6",
    bgColor: "bg-violet-500/20",
    iconColor: "text-violet-500"
  },
  {
    name: "Adobe Firefly",
    icon: Flame,
    description: "Professionelle Ergebnisse für kommerzielle Projekte",
    bgColor: "bg-orange-500/20",
    iconColor: "text-orange-500"
  },
  {
    name: "DALL-E",
    icon: Zap,
    description: "Vollständig kompatibel mit DALL-E 3",
    bgColor: "bg-green-500/20",
    iconColor: "text-green-500"
  },
  {
    name: "Stable Diffusion",
    icon: Sparkles,
    description: "Optimiert für alle SD Modelle",
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-500"
  },
  {
    name: "Leonardo AI",
    icon: Wand2,
    description: "Perfekt für kreative Workflows",
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-500"
  },
  {
    name: "InvokeAI",
    icon: Stars,
    description: "Maximale Feature-Unterstützung",
    bgColor: "bg-pink-500/20",
    iconColor: "text-pink-500"
  },
  {
    name: "Ideogram",
    icon: Brain,
    description: "Präzise abgestimmte Prompts",
    bgColor: "bg-indigo-500/20",
    iconColor: "text-indigo-500"
  },
  {
    name: "Canva AI",
    icon: Shapes,
    description: "Nahtlose Design-Integration",
    bgColor: "bg-teal-500/20",
    iconColor: "text-teal-500"
  },
  {
    name: "Flux Pro",
    icon: Cloud,
    description: "Konsistente Qualitätsergebnisse",
    bgColor: "bg-cyan-500/20",
    iconColor: "text-cyan-500"
  },
  {
    name: "Recraft",
    icon: Laptop,
    description: "Professionelle Design-Outputs",
    bgColor: "bg-sky-500/20",
    iconColor: "text-sky-500"
  }
]

export default function AIToolsCompatibility() {
  return (
    <div className="bg-background">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-black italic text-gray-800 dark:text-neutral-200 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Universell einsetzbar mit allen KI-Tools
          </motion.h2>
          <motion.p 
            className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-neutral-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Unsere Prompt-Formeln sind für alle gängigen KI-Tools optimiert. 
            Nutze dein bevorzugtes Tool und erziele sofort professionelle Ergebnisse.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full border-0 shadow-lg bg-gray-50 dark:bg-[#0A0A0A] ">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${tool.bgColor} flex items-center justify-center mb-4`}>
                    <tool.icon className={`w-6 h-6 ${tool.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-200 mb-2">{tool.name}</h3>
                  <p className="text-gray-600 dark:text-neutral-400">{tool.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-gray-50/50 dark:bg-gray-800/30 border-gray-200/50 dark:border-gray-700 mt-20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200/50 dark:bg-gray-700/50 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-neutral-200">Pro-Tipp: Das Beste aus beiden Welten</h3>
                    <Sparkles className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300">
                    Jedes KI-Tool hat seine einzigartigen Stärken. Kombiniere unsere universellen 
                    Prompt-Formeln mit den speziellen Features deines bevorzugten Tools für optimale 
                    Ergebnisse. Die Formeln sind so konzipiert, dass sie in jedem System 
                    bestmögliche Resultate liefern - du entscheidest, welche zusätzlichen 
                    Tool-Features du nutzen möchtest.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
