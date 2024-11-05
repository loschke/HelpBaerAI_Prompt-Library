"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface ExpertProps {
  name: string
  title: string
  company: string
  description: string
  linkedIn: string
  imagePath: string
}

const Expert = ({ name, title, company, description, linkedIn, imagePath }: ExpertProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ translateY: -5 }}
    transition={{ duration: 0.3 }}
    className="bg-background border border-neutral-800 hover:border-neutral-700 rounded-xl overflow-hidden"
  >
    <div className="aspect-square relative">
      <Image
        src={imagePath}
        alt={name}
        fill
        style={{ objectFit: 'cover' }}
        className="transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div className="p-6 bg-[#0A0A0A]">
      <h3 className="text-2xl text-neutral-200 mb-2">{name}</h3>
      <div className="text-white font-bold mb-2">{title} bei {company}</div>
      <p className="text-xl text-neutral-400 mb-4">
        {description}
      </p>
      <a 
        href={linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-500 bg-background border border-neutral-800 hover:border-neutral-700 px-4 py-2 rounded-full transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
        LinkedIn Profil
      </a>
    </div>
  </motion.div>
)

interface BenefitProps {
  icon: string
  title: string
  description: string
}

const Benefit = ({ icon, title, description }: BenefitProps) => (
  <div className="bg-gray-50/50 dark:bg-gray-800/30 border border-neutral-800 p-6 rounded-xl text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h4 className="text-neutral-200 text-lg font-semibold mb-2">{title}</h4>
    <p className="text-xl text-neutral-400">{description}</p>
  </div>
)

export default function CollaborationTeam() {
  return (
    <div className="bg-background py-48 px-4">
      <div className="max-w-[85rem] mx-auto">
        <div className="rounded-xl overflow-hidden p-12">
          <h2 className="text-4xl md:text-5xl font-black italic text-center mb-6 text-neutral-200">
            Aus der Agenturpraxis für die Agenturpraxis
          </h2>
          <p className="text-blue-500 text-xl text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Diese Prompt-Bibliothek ist das Ergebnis von über 10.000 Stunden praktischer Erfahrung mit KI-gestützter Bildgenerierung in Agenturen. 
            Was als interne Lösung begann, teilen wir jetzt mit dir.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Expert
              name="Rico Loschke"
              title="Director Automation & AI"
              company="queonext"
              description="Entwickelt seit 2022 KI-gestützte Lösungen für Agenturen und optimiert kreative Workflows durch intelligente Automatisierung."
              linkedIn="https://www.linkedin.com/in/rico-loschke/"
              imagePath="/images/rico_loschke_queonext.jpg"
            />
            <Expert
              name="Hans Piechatzek"
              title="CEO"
              company="Move Elevator"
              description="Leitet eine der innovativsten Digitalagenturen Deutschlands und treibt die Integration von KI-Technologien in kreative Prozesse voran."
              linkedIn="https://www.linkedin.com/in/hans-piechatzek-95044932/"
              imagePath="/images/hans_piechatzek_move-elevator.jpg"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Benefit
              icon="⚡️"
              title="Praxiserprobt"
              description="In vielen Kundenprojekten getestet und optimiert"
            />
            <Benefit
              icon="🎯"
              title="Agentur-optimiert"
              description="Perfekt für schnelle Iterationen und enge Deadlines"
            />
            <Benefit
              icon="💎"
              title="Qualitätsgeprüft"
              description="Entspricht höchsten Agenturansprüchen"
            />
          </div>

          <p className="text-2xl text-neutral-400 text-center max-w-3xl mx-auto leading-relaxed">
            Was uns von anderen unterscheidet? Wir nutzen diese Prompts jeden Tag selbst in unseren Agenturen. 
            Sie sind nicht nur Theorie, sondern durch und durch Praxis.
          </p>
        </div>
      </div>
    </div>
  )
}
