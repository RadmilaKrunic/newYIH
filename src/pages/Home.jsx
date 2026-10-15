import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Apartments from '../components/Apartments.jsx';
import Services from '../components/Services.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Apartments />
      <Services />
      <Contact />
    </>
  );
}
