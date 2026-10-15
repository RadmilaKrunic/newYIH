import PersonalHero from '../components/PersonalHero.jsx';
import Intro from '../components/Intro.jsx';
import Apartments from '../components/Apartments.jsx';
import Services from '../components/Services.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  return (
    <>
      <PersonalHero />
      <Intro />
      <Apartments />
      <Services />
      <Contact />
    </>
  );
}
