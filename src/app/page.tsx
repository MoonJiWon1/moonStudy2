import { Hero }            from '@/components/Hero'
import { HarnessExplain }  from '@/components/HarnessExplain'
import { HowItWorks }      from '@/components/HowItWorks'
import { Footer }          from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <HarnessExplain />
      <HowItWorks />
      <Footer />
    </main>
  )
}
