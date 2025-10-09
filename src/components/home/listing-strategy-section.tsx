import { TrendingUp, CheckCircle, Users, Building } from "lucide-react";

const milestones = [
  {
    marketCap: "$20M",
    exchanges: "DEX listings (Uniswap, PancakeSwap) + CMC/CG",
    icon: TrendingUp,
    color: "bg-green-500/20 text-green-400 ring-green-500/30",
    status: "active"
  },
  {
    marketCap: "$50M",
    exchanges: "Intermediate CEX (MEXC, BitMart, LBank)",
    icon: Building,
    color: "bg-blue-500/20 text-blue-400 ring-blue-500/30",
    status: "upcoming"
  },
  {
    marketCap: "$200M",
    exchanges: "Mid‑tier CEX (KuCoin, Gate.io, Bybit)",
    icon: Building,
    color: "bg-purple-500/20 text-purple-400 ring-purple-500/30",
    status: "upcoming"
  },
  {
    marketCap: "$1B",
    exchanges: "Top global CEX (Binance, OKX, Coinbase)",
    icon: Building,
    color: "bg-amber-500/20 text-amber-400 ring-amber-500/30",
    status: "upcoming"
  }
];

const processSteps = [
  {
    step: "1",
    title: "Market cap confirmed",
    description: "Milestone achievement verified by community"
  },
  {
    step: "2", 
    title: "DAO community votes budget allocation",
    description: "Democratic decision on listing investment"
  },
  {
    step: "3",
    title: "Kalychain Foundation executes the listing",
    description: "Professional execution of exchange partnerships"
  }
];

export function ListingStrategySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/50 via-black to-amber-500/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Conditional Listing Strategy
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            At Kalychain, exchange listings scale with market cap milestones, engaging the community at each step.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Milestones */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Market Cap Milestones</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <div key={index} className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover-lift-light relative ${milestone.status === 'active' ? 'ring-2 ring-amber-500/50' : ''}`}>
                  {milestone.status === 'active' && (
                    <div className="absolute -top-2 -right-2">
                      <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-black" />
                      </div>
                    </div>
                  )}
                  
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ring-2 ${milestone.color}`}>
                    <milestone.icon className="h-8 w-8" />
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-amber-400 mb-2">{milestone.marketCap}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{milestone.exchanges}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">At Each Stage:</h3>
              
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{step.title}</h4>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-amber-500/10 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20">
                <div className="text-center">
                  <div className="h-20 w-20 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-6 mx-auto ring-4 ring-amber-500/30">
                    <Users className="h-10 w-10" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">
                    Community-Driven Growth
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Our listing strategy ensures sustainable growth while maintaining community involvement 
                    in every major decision. Each milestone represents genuine adoption and value creation.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-amber-400 font-bold text-lg">4</p>
                      <p className="text-gray-400 text-xs">Milestone Tiers</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-amber-400 font-bold text-lg">100%</p>
                      <p className="text-gray-400 text-xs">DAO Governed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Why This Strategy Works</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-3 mx-auto">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="text-white font-semibold mb-2">Sustainable Growth</h4>
                <p className="text-gray-400 text-sm">Listings aligned with genuine market development</p>
              </div>
              
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-3 mx-auto">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="text-white font-semibold mb-2">Community Engagement</h4>
                <p className="text-gray-400 text-sm">Every decision involves the DAO community</p>
              </div>
              
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3 mx-auto">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h4 className="text-white font-semibold mb-2">Value Creation</h4>
                <p className="text-gray-400 text-sm">Focus on building real utility and adoption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
