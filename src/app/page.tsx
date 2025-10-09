"use client";

import { Button } from "@/components/ui/button";
import { PriceTicker } from "@/components/PriceTicker";
import { ArrowRight, BarChart3, Shield, Zap, AlertCircle } from "lucide-react";
import { WhyKalychainSection } from "@/components/home/why-kalychain-section";
import { UtilityPillarsSection } from "@/components/home/utility-pillars-section";
import { KlcTokenSection } from "@/components/home/klc-token-section";
import { NodesSection } from "@/components/home/nodes-section";
import { ListingStrategySection } from "@/components/home/listing-strategy-section";
import { EcosystemSection } from "@/components/home/ecosystem-section";
import { RoadmapSection } from "@/components/home/roadmap-section";
import { CommunitySection } from "@/components/home/community-section";
import { KalyPaySection } from "@/components/home/kalypay-section";
import { AddToWalletButton } from "@/components/wallet/AddToWalletButton";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Navigation */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center sticky top-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold overflow-hidden">
              <Image
                src="/images/klc.png"
                alt="KalyChain Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display text-xl font-bold text-white">
              KalyChain
            </span>
          </a>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#utility-pillars"
              className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
            >
              Utility Pillars
            </a>
            <a
              href="#klc-token"
              className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
            >
              KLC Token
            </a>
            <a
              href="#nodes"
              className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
            >
              Nodes
            </a>
            <a
              href="#roadmap"
              className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
            >
              Roadmap
            </a>
            <a
              href="#community"
              className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
            >
              Community
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <AddToWalletButton variant="small" chainType="mainnet" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-bg pt-20 pb-32 md:pt-24 md:pb-40 flex-grow flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/40 via-primary-800/50 to-primary-950/60 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&q=80')] bg-cover bg-center opacity-15"></div>
          {/* Digital globe visual elements */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 rounded-full border border-amber-500/30 animate-pulse"></div>
            <div className="absolute w-80 h-80 rounded-full border border-amber-400/20 animate-ping"></div>
            <div className="absolute w-64 h-64 rounded-full border border-amber-300/40"></div>
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full">
              <span className="text-amber-200 font-medium text-sm">
                💡 Payments → Enterprises → Governments → DAO
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Kalychain – The{" "}
              <span className="text-amber-400">Blockchain for Payments</span>, DeFi & Enterprises
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Fast, secure, compliant. The trusted infrastructure bridging blockchain and real‑world finance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-amber-500 text-black hover:bg-amber-600 hover-lift border-none"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  🔘 Read the Whitepaper <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/15 border-amber-400 text-amber-100 hover:bg-white/25 hover:text-white hover-lift"
                asChild
              >
                <a href="https://kalyscan.io/" target="_blank" rel="noopener noreferrer">
                  🔘 Explore on KalyScan
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/15 border-amber-400 text-amber-100 hover:bg-white/25 hover:text-white hover-lift"
                asChild
              >
                <a href="#community" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  🔘 Join the Community
                </a>
              </Button>
            </div>

            {/* Live Price Ticker */}
            <PriceTicker />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover-lift-light">
                <p className="text-3xl font-bold">$1.2B+</p>
                <p className="text-sm text-white/70">Total Value Locked</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover-lift-light">
                <p className="text-3xl font-bold">12M+</p>
                <p className="text-sm text-white/70">Transactions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover-lift-light">
                <p className="text-3xl font-bold">120+</p>
                <p className="text-sm text-white/70">Global Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Sections Integrated */}
      <main>
        <div id="why-kalychain">
          <WhyKalychainSection />
        </div>
        <div id="utility-pillars">
          <UtilityPillarsSection />
        </div>
        <div id="klc-token">
          <KlcTokenSection />
        </div>
        <div id="nodes">
          <NodesSection />
        </div>
        <div id="roadmap">
          <RoadmapSection />
        </div>
        <div id="listing-strategy">
          <ListingStrategySection />
        </div>
        <div id="community">
          <CommunitySection />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="py-16 bg-black border-t border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <div className="text-gray-300 text-sm">
              © 2025 Kalychain Foundation
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Whitepaper
              </a>
              <a href="https://kalyscan.io/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">
                KalyScan Explorer
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                DAO FAQ
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Contact
              </a>
            </div>

            <div className="text-gray-500 text-xs max-w-2xl mx-auto">
              <strong>Disclaimer:</strong> Cryptocurrencies are volatile and involve risks. This is not financial advice.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
