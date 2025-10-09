import { Button } from "@/components/ui/button";
import { ArrowRight, Fuel, Shield, Vote, Coins } from "lucide-react";
import Image from "next/image";

const tokenomicsData = [
  { label: "Validator Rewards", percentage: 49, description: "Network security", color: "bg-amber-500" },
  { label: "Treasury & Partnerships", percentage: 15, description: "Strategic growth", color: "bg-amber-400" },
  { label: "Developer Fund", percentage: 10, description: "Ecosystem development", color: "bg-amber-300" },
  { label: "User Incentives / Liquidity", percentage: 10, description: "Adoption rewards", color: "bg-amber-200" },
  { label: "Team", percentage: 8, description: "Strict vesting", color: "bg-yellow-300" },
  { label: "Strategic Reserve", percentage: 6, description: "Future opportunities", color: "bg-yellow-200" },
  { label: "Community & Education", percentage: 2, description: "Awareness & growth", color: "bg-yellow-100" },
];

export function KlcTokenSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/50 via-black to-amber-500/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The KLC Token
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            The native utility token powering the entire Kalychain ecosystem with multiple use cases and sustainable tokenomics.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Core Utilities */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Core Utilities</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center hover-lift-light">
                <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 mx-auto">
                  <Fuel className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Gas Fees</h4>
                <p className="text-gray-400 text-sm">For all transactions on the network</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center hover-lift-light">
                <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 mx-auto">
                  <Shield className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Staking</h4>
                <p className="text-gray-400 text-sm">To secure the network and earn rewards</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center hover-lift-light">
                <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 mx-auto">
                  <Vote className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Governance</h4>
                <p className="text-gray-400 text-sm">On‑chain governance via the DAO</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center hover-lift-light">
                <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 mx-auto">
                  <Coins className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Utility Currency</h4>
                <p className="text-gray-400 text-sm">Across payments, DeFi, NFTs, RWA</p>
              </div>
            </div>
          </div>

          {/* Tokenomics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">📊 Tokenomics</h3>
              
              <div className="space-y-4">
                {tokenomicsData.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white font-medium">{item.label}</span>
                        <span className="text-amber-400 font-bold">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button
                  className="bg-amber-500 text-black hover:bg-amber-400 group"
                  asChild
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    See full details in the Tokenomics Whitepaper
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-amber-500/10 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20">
                <div className="text-center">
                  <div className="h-24 w-24 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-6 mx-auto ring-4 ring-amber-500/30 overflow-hidden">
                    <Image
                      src="/images/klc.png"
                      alt="KLC Logo"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">
                    Powering the Future of Finance
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    KLC is designed with sustainable tokenomics that incentivize long-term network security, 
                    community governance, and ecosystem growth. With 49% of tokens dedicated to validator 
                    rewards over 50+ years, the network ensures robust security and decentralization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
