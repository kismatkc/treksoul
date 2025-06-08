import './styles.css'
import AboutUs from '@/components/about'
import ContactUs from '@/components/contact'
import HeaderServer from '@/components/header-server'
import HomeServer from '@/components/landing-page-server'
import TrekServer from '@/components/trek-server'

export default async function HomePage() {
  return (
    <main>
      <HeaderServer />
      <HomeServer />
      <TrekServer />
      {/* add the shacn carousel testomonials if needed */}
      <AboutUs />
      <ContactUs />
    </main>
  )
}
