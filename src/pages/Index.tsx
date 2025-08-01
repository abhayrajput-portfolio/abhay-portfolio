import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Travel from '@/components/Travel';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';

const Index = () => {
  useEffect(() => {
    // Smooth scroll for hash links
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <ScrollProgress />
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Travel />
        <Achievements />
        <Contact />
      </main>
      
      <BackToTop />
    </div>
  );
};

export default Index;
