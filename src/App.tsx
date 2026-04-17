/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portal from './components/Portal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-accent-500/30 selection:text-brand-900 scroll-smooth">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portal />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
