import { ArrowRight } from "lucide-react";

export function WhyKalychainSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900/50 to-amber-500/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Why Kalychain?
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Leading blockchains comparison */}
          <div className="mb-12">
            <p className="text-lg text-gray-300 mb-8 text-center">
              Leading blockchains each have their strengths:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Ethereum</h3>
                <p className="text-gray-400">DeFi pioneer</p>
              </div>
              
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
                <h3 className="text-xl font-bold text-white mb-2">BNB Chain</h3>
                <p className="text-gray-400">Trader‑centric</p>
              </div>
              
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Solana</h3>
                <p className="text-gray-400">Consumer‑focused</p>
              </div>
            </div>
          </div>

          {/* The gap Kalychain fills */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-amber-500/20 backdrop-blur-sm rounded-full">
              <ArrowRight className="h-5 w-5 text-amber-400" />
              <span className="text-amber-200 font-medium">
                But none were designed from inception to meet the needs of real‑world finance, enterprises, and governments.
              </span>
            </div>
          </div>

          {/* Kalychain's solution */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-amber-500/10 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Kalychain fills this gap with:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 mx-auto ring-2 ring-amber-500/30">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Fast, low‑cost transactions
                </h4>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 mx-auto ring-2 ring-amber-500/30">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Transparent governance
                </h4>
                <p className="text-gray-400 text-sm">(DAO + Foundation)</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 mx-auto ring-2 ring-amber-500/30">
                  <span className="text-2xl">🏗️</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Purpose‑built infrastructure
                </h4>
                <p className="text-gray-400 text-sm">
                  For payments, regulated DeFi, and Real‑World Asset (RWA) tokenization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
