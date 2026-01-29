import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ClientsSection from './components/ClientsSection';
import ContactSection from './components/ContactSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

export const metadata = {
  title: 'RealTrust - Real Estate Solutions',
  description: 'Premium real estate projects and services'
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProjectsSection />
      <ClientsSection />
      <ContactSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
