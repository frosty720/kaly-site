import { CreditCard, Building2, Factory, Vote, Layers } from "lucide-react";

export function UtilityPillarsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-500/20 via-black to-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Utility Pillars
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Five foundational pillars that power the Kalychain ecosystem, designed for real-world applications and enterprise adoption.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Payments & Fintech */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover-lift-light">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 ring-2 ring-amber-500/30">
                <CreditCard className="h-8 w-8" />
              </div>
              <div>
                <span className="text-2xl mb-2 block">💳</span>
                <h3 className="text-xl font-bold text-white">Payments & Fintech</h3>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              <span className="font-semibold text-amber-400">Kalypay, KalyPOS, KalyCard, KalyRamp</span> → instant payment solutions for individuals & merchants, inclusive and accessible.
            </p>
            <p className="text-gray-400 text-sm">
              Comprehensive payment infrastructure designed for real-world adoption and financial inclusion.
            </p>
          </div>

          {/* DeFi & Tokenization */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover-lift-light">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 ring-2 ring-amber-500/30">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <span className="text-2xl mb-2 block">🏦</span>
                <h3 className="text-xl font-bold text-white">DeFi & Tokenization (RWA)</h3>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              <span className="font-semibold text-amber-400">KalySwap (native DEX), stablecoin KUSD, lending/borrowing, tokenization of real estate, bonds, and commodities</span> → DeFi connected to the real economy.
            </p>
            <p className="text-gray-400 text-sm">
              Bridging traditional finance with decentralized protocols through Real-World Asset tokenization.
            </p>
          </div>

          {/* Enterprises & Governments */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover-lift-light">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 ring-2 ring-amber-500/30">
                <Factory className="h-8 w-8" />
              </div>
              <div>
                <span className="text-2xl mb-2 block">🏭</span>
                <h3 className="text-xl font-bold text-white">Enterprises & Governments</h3>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              <span className="font-semibold text-amber-400">Plug‑and‑play smart contracts for SMEs, supply chain & invoicing.</span> Public applications for land registries, budget transparency, social benefits, and digital identity.
            </p>
            <p className="text-gray-400 text-sm">
              Enterprise-grade solutions for businesses and government institutions seeking blockchain adoption.
            </p>
          </div>

          {/* Governance */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover-lift-light">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 ring-2 ring-amber-500/30">
                <Vote className="h-8 w-8" />
              </div>
              <div>
                <span className="text-2xl mb-2 block">🗳️</span>
                <h3 className="text-xl font-bold text-white">Governance: DAO & Foundation</h3>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-gray-300">
                <span className="font-semibold text-amber-400">DAO:</span> every KLC holder votes on treasury, tokenomics, and listings.
              </p>
              <p className="text-gray-300">
                <span className="font-semibold text-amber-400">Kalychain Foundation:</span> neutral legal entity ensuring compliance & global partnerships.
              </p>
            </div>
          </div>

          {/* KalyRails — ZK Rollups-as-a-Service */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover-lift-light lg:col-span-2 lg:max-w-[calc(50%-1rem)] lg:mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 ring-2 ring-amber-500/30">
                <Layers className="h-8 w-8" />
              </div>
              <div>
                <span className="text-2xl mb-2 block">🛤️</span>
                <h3 className="text-xl font-bold text-white">KalyRails: ZK Rollups-as-a-Service</h3>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              <span className="font-semibold text-amber-400">KalyRails</span> → private ZK Layer 2 chains for fintechs, mobile money operators, and enterprises. Per‑tenant isolation, zero user‑visible gas, KUSD settlement — powered by open‑source ZK Stack and anchored to KalyChain.
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Purpose‑built rollup infrastructure with cryptographic validity proofs and regulator‑friendly auditability.
            </p>
            <a
              href="https://rails.kalychain.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm"
            >
              Explore KalyRails →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
