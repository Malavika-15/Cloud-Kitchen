import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/Hero';
import MenuSection from '../components/MenuSection';
import AboutSection from '../components/AboutSection';
import SpecialOffers from '../components/SpecialOffers';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SpecialOffers />
        <MenuSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
