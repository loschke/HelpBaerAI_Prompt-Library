"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WorkflowStepProps {
  number: number
  title: string
  description: string
  items: string[]
}

interface PersonaProps {
  icon: string
  title: string
  description: string
}

const WorkflowStep = ({ number, title, description, items }: WorkflowStepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: number * 0.1 }}
  >
    <Card className="h-full bg-background border border-neutral-800 hover:border-neutral-700 transition-colors">
      <CardHeader>
        <Badge className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-200 flex items-center justify-center mb-2">
          {number}
        </Badge>
        <CardTitle className="text-neutral-200">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-neutral-400 mb-4">{description}</p>
        <ul className="list-disc list-inside text-sm text-neutral-400">
          {items.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </motion.div>
)

const Persona = ({ icon, title, description }: PersonaProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Card className="h-full bg-background border border-neutral-800 hover:border-neutral-700 transition-colors">
      <CardContent className="pt-6">
        <div className="text-3xl mb-2">{icon}</div>
        <h4 className="font-semibold mb-2 text-neutral-200">{title}</h4>
        <p className="text-sm text-neutral-400">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
)

export default function WorkflowAndPersonas() {
  return (
    <div className="bg-[#0A0A0A] py-12">
      <div className="max-w-[85rem] mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black italic text-neutral-200 mb-6 text-center">
            Dein Workflow. Nur schneller und besser.
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl text-center">
            Von der ersten Idee bis zum finalen Asset – optimiere jeden Schritt deines kreativen Prozesses.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <WorkflowStep
            number={1}
            title="Ideenfindung & Konzeption"
            description="Verwandle vage Vorstellungen in konkrete Visualisierungen – in Minuten statt Stunden"
            items={[
              "Kreative Konzepte sofort visualisieren",
              "Verschiedene Stilrichtungen parallel testen",
              "Schnelles Feedback vom Kunden einholen"
            ]}
          />
          <WorkflowStep
            number={2}
            title="Effiziente Produktion"
            description="Erstelle hochwertige Assets in Serie – mit garantiert einheitlicher Qualität"
            items={[
              "Komplette Bildserien automatisiert erstellen",
              "Konsistente Markenidentität sicherstellen",
              "Asset-Bibliothek systematisch aufbauen"
            ]}
          />
          <WorkflowStep
            number={3}
            title="Optimierung & Skalierung"
            description="Perfektioniere deine Ergebnisse und skaliere erfolgreiche Ansätze"
            items={[
              "Erfolgreiche Prompts dokumentieren & wiederverwenden",
              "Workflow-Templates für Teams erstellen",
              "Projekte effizient skalieren"
            ]}
          />
        </div>
      </div>
    </div>
  )
}
