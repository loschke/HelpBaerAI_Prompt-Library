import HeroEmojiCta from "@/components/hero-emoji-cta"
import StatisticsGrid from "@/components/statistics-grid"
import Workflow from "@/components/workflow"
import FullWidthImageStrip from "@/components/full-width-image-strip"
import FeaturesTabs from "@/components/features-tabs"
import FeaturesGrid from "@/components/features-grid"
import AIToolsCompatibility from "@/components/ai-tools-compatibility"
import CollaborationTeam from "@/components/collaboration-team"

export default function Home() {
  return (
    <main>
      <HeroEmojiCta />
      <FullWidthImageStrip />      
      <StatisticsGrid />
      <FeaturesGrid />
      <AIToolsCompatibility />
      <Workflow />     
      <FeaturesTabs />  
      <CollaborationTeam />
    </main>
  )
}
