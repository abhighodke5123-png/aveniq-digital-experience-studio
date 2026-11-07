import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import Services from '@/components/Services';
import Industries from '@/components/Industries';
import Healthcare from '@/components/Healthcare';
import Work from '@/components/Work';
import ProjectSimulator from '@/components/ProjectSimulator';
import WhyAndProcess from '@/components/WhyAndProcess';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import InteractiveSpotlight from '@/components/InteractiveSpotlight';

export default function Home() {
  return (
    <>
      <InteractiveSpotlight />
      <Navigation />
      <main>
        <Hero />
        <Introduction />
        <Services />
        <Industries />
        <Healthcare />
        <Work />
        <ProjectSimulator />
        <WhyAndProcess />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
