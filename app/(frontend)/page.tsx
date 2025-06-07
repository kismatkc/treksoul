import './styles.css'
import AboutUs from '@/components/about'
import Treks from '@/components/treks'
import ContactUs from '@/components/contact'
import HeaderServer from '@/components/header-server'
import HomeServer from '@/components/landing-page-server'

export default async function HomePage() {
  return (
    <main>
      <HeaderServer />
      <HomeServer />
      <Treks />
      {/* add the shacn carousel testomonials if needed */}
      <AboutUs />
      <ContactUs />
    </main>
  )
}
