/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Assistant from './components/Assistant';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-accent-500/30 selection:text-brand-900">
      <Header />
      <main>
        <Hero />
        <Services />
        <Assistant />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
