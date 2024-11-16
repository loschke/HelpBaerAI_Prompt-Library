import HeroEmojiCta from '@/components/hero-emoji-cta'
import StatisticsGrid from '@/components/statistics-grid'
import Workflow from '@/components/workflow'
import FullWidthImageStrip from '@/components/full-width-image-strip'
import FeaturesTabs from '@/components/features-tabs'
import FeaturesGrid from '@/components/features-grid'
import AIToolsCompatibility from '@/components/ai-tools-compatibility'
import CollaborationTeam from '@/components/collaboration-team'
import PromptFormulaIntro from '@/components/prompt-formula-intro'
import HomeFaq from '@/components/home-faq'

export default function Home() {
  return (
    <main>
      <HeroEmojiCta />
      <FullWidthImageStrip />
      <PromptFormulaIntro />   
      <StatisticsGrid /> 
      <AIToolsCompatibility />
      <FeaturesGrid />
      <Workflow />     
      <FeaturesTabs />  
      <CollaborationTeam />
      <HomeFaq />
    </main>
  )
}
