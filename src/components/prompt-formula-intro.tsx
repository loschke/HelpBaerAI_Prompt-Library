"use client"

import { motion } from 'framer-motion'

export default function PromptFormulaIntro() {
  return (
    <div className="bg-background">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-40 mx-auto">
        {/* Header Section */}
        <div className="max-w-5xl mx-auto text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-black italic text-gray-800 dark:text-neutral-200 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            So funktioniert's
          </motion.h2>
          <motion.p 
            className="max-w-6xl mx-auto text-2xl text-neutral-400 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Prompt-Formeln sind ein einfaches und effektives Tool, um präzise und professionelle Ergebnisse zu erzielen, weil sie mit optimierten fixen Bestandteilen arbeiten, welche beliebig mit deinen Wünschen kombiniert werden können.
          </motion.p>
        </div>

        {/* Formula Section */}
        <motion.div
          className="p-8 md:p-12 bg-[#0A0A0A]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Large Formula Display */}
          <div className="mb-16 max-w-2xl mx-auto">
            <div className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-mono leading-[6] text-center">
              <span className="py-2">A photo of </span>
              <span className="text-pink-400 font-medium bg-pink-300 bg-opacity-20 px-1">[Hauptobjekt]</span>&nbsp;
              <span className="text-amber-500 font-medium bg-amber-200 bg-opacity-20 px-1">[Objektdetails]</span>
              <span className="py-2"> isolated against a </span>
              <span className="text-accent font-medium mb-1 bg-accent/30 bg-opacity-20 px-1 my-2">[Hintergrundart]</span>&nbsp;
              <span className="inline-block py-2">background.</span>
            </div>
          </div>

          {/* Compact Legend */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <span className="text-3xl">📷</span>
              </div>
              <div>
                <h3 className="text-pink-400 font-medium mb-1">[Hauptobjekt]</h3>
                <p className="text-white text-m">z.B. vintage camera, fresh apple</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <span className="text-3xl">✨</span>
              </div>
              <div>
                <h3 className="text-amber-600 font-medium mb-1">[Objektdetails]</h3>
                <p className="text-white text-m">z.B. with worn leather, showing droplets</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <span className="text-3xl">🎨</span>
              </div>
              <div>
                <h3 className="text-accent font-medium mb-1">[Hintergrundart]</h3>
                <p className="text-white text-m">z.B. pure white, dramatic gradient</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Example Images Section */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Example 1 */}
          <div className="bg-[#0A0A0A] overflow-hidden rounded-lg">
            <div className="aspect-square">
              <img 
                src="/images/formel_sample_camera.webp" 
                alt="Vintage Kamera Beispiel"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <p className="font-mono text-sm text-white">
                A photo of <span className="text-pink-400">vintage Leica camera</span> 
                <span className="text-amber-500"> with worn leather patina</span>, 
                isolated against a <span className="text-accent">pure white</span> background.
              </p>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-[#0A0A0A] overflow-hidden rounded-lg">
            <div className="aspect-square">
              <img 
                src="/images/formel_sample_apple.webp" 
                alt="Apfel Beispiel"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <p className="font-mono text-sm text-white">
                A photo of <span className="text-pink-400">red apple</span> 
                <span className="text-amber-500"> with water droplets</span>, 
                isolated against a <span className="text-accent">black</span> background.
              </p>
            </div>
          </div>

          {/* Example 3 */}
          <div className="bg-[#0A0A0A] overflow-hidden rounded-lg">
            <div className="aspect-square">
              <img 
                src="/images/formel_sample_leaf.webp" 
                alt="Pflanze Beispiel"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <p className="font-mono text-sm text-white">
                A photo of <span className="text-pink-400">monstera leaf</span> 
                <span className="text-amber-500"> with morning dew</span>, 
                isolated against a <span className="text-accent">gradient blue</span> background.
              </p>
            </div>
          </div>

          {/* Example 4 */}
          <div className="bg-[#0A0A0A] overflow-hidden rounded-lg">
            <div className="aspect-square">
              <img 
                src="/images/formel_sample_watch.webp" 
                alt="Uhr Beispiel"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <p className="font-mono text-sm text-white">
                A photo of <span className="text-pink-400">luxury watch</span> 
                <span className="text-amber-500"> with metallic shine</span>, 
                isolated against a <span className="text-accent">dark gradient</span> background.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
