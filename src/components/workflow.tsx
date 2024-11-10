"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

interface WorkflowStepProps {
  emoji: string
  title: string
  description: string
  items: string[]
}

export default function WorkflowAndPersonas() {
  const workflowSteps = [
    {
      emoji: "💡",
      title: "Ideenfindung & Konzeption",
      description: "Verwandle vage Vorstellungen in konkrete Visualisierungen.",
      items: [
        "Kreative Konzepte sofort visualisieren",
        "Verschiedene Stile parallel testen",
        "Schnelles Feedback vom Kunden"
      ]
    },
    {
      emoji: "⚡",
      title: "Effiziente Produktion",
      description: "Erstelle hochwertige Assets in Serie – mit garantiert einheitlicher Qualität",
      items: [
        "Komplette Bildserien erstellen",
        "Konsistentes CD sicherstellen",
        "Asset-Bibliothek systematisch aufbauen"
      ]
    },
    {
      emoji: "🚀",
      title: "Optimierung & Skalierung",
      description: "Perfektioniere deine Ergebnisse und skaliere erfolgreiche Ansätze",
      items: [
        "Erfolgreiche Prompts wiederverwenden",
        "Workflow-Templates für Teams erstellen",
        "Projekte effizient skalieren"
      ]
    }
  ]

  const WorkflowStep = ({ emoji, title, description, items }: WorkflowStepProps) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full bg-background border border-neutral-800 hover:border-neutral-700 transition-colors">
        <CardHeader>
          <div className="text-3xl mb-2">{emoji}</div>
          <CardTitle className="text-2xl text-neutral-200">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl text-neutral-400 mb-4">{description}</p>
          <ul className="text-lg text-neutral-400 space-y-3">
            {items.map((item: string, index: number) => (
              <li key={index} className="flex">
                <span className="text-neutral-400 mr-3">•</span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="bg-[#0A0A0A] py-48">
      <div className="max-w-[85rem] mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black italic text-neutral-200 mb-6 text-center">
            Dein Workflow. Nur schneller und besser.
          </h2>
          <p className="text-2xl text-neutral-400 text-center">
            Von der ersten Idee bis zum finalen Asset – optimiere jeden Schritt deines kreativen Prozesses.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {workflowSteps.map((step, index) => (
            <WorkflowStep key={index} {...step} />
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/prompt-formeln">
            <Button 
              size="lg" 
              className="px-8 py-6 text-xl"
            >
              Gleich loslegen mit unseren FREE Prompt-Formeln 🚀
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
