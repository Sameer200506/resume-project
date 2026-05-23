import { useAdmin } from './admin/AdminContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import ResearchInterests from './components/ResearchInterests'
import SWOT from './components/SWOT'
import Vision from './components/Vision'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { data } = useAdmin()

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--background-deep))' }}>
      <Navbar data={data} />
      <main>
        <Hero data={data} />
        <About data={data} />
        <Skills data={data} />
        <Education data={data} />
        <Experience data={data} />
        <Projects data={data} />
        <Certifications data={data} />
        <ResearchInterests data={data} />
        <SWOT data={data} />
        <Vision data={data} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </div>
  )
}
