import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Companies from '../components/Companies';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Companies />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;
