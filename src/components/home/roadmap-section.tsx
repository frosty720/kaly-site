import {
  Rocket,
  Scale,
  TrendingUp,
  University,
  CreditCard,
  BarChartHorizontal,
} from "lucide-react";

const roadmapPhases = [
  {
    phase: "Short Term (2024–2025)",
    items: [
      "Mainnet launch (PoS, EVM‑compatible)",
      "DAO v1 & first on‑chain proposals",
      "Launch Kalypay & KalyScan",
      "First DEX listing + CMC/CG registration",
      "Initial developer grants",
      "KalyOS development (LineageOS fork)",
      "KalyPhone prototype development",
      "KalyDrive decentralized storage MVP",
      "KalyNode Tier 1/2/3 gateway infrastructure",
      "KalyPhone & KalyOS community beta launch"
    ],
    icon: Rocket,
    status: "active",
    color: "bg-amber-500/20 text-amber-400 ring-amber-500/30"
  },
  {
    phase: "Mid Term (2026–2027)",
    items: [
      "KalyPhone global launch",
      "Regional expansion (Africa, Asia, LATAM)",
      "SME adoption (POS, fiat ramps, supply chain)",
      "Stablecoin KUSD & real‑world asset tokenization",
      "Banking partnerships & government pilots",
      "KalySwap V3 with updated contracts & security",
      "Tokenization of mining logistics",
      "KalyGuard WaaS (Wallet‑as‑a‑Service)",
      "KalyDrive production deployment",
      "KalyNode network scaling worldwide"
    ],
    icon: TrendingUp,
    status: "upcoming",
    color: "bg-blue-500/20 text-blue-400 ring-blue-500/30"
  },
  {
    phase: "Mid Term (2028–2029)",
    items: [
      "Zuri — secure private chat application",
      "Kalychain Layer 2 research & prototyping",
      "Advanced cross‑chain interoperability"
    ],
    icon: Scale,
    status: "upcoming",
    color: "bg-blue-500/20 text-blue-400 ring-blue-500/30"
  },
  {
    phase: "Long Term (2030–2033)",
    items: [
      "Kalychain Layer 2 for enterprise scalability",
      "Mass adoption by SMEs & governments",
      "Government‑to‑Citizen (G2C) payments",
      "Global leadership in real‑world finance blockchain",
      "KalyPhone as default sovereign device for crypto users",
      "Decentralized mesh network as critical infrastructure"
    ],
    icon: University,
    status: "planned",
    color: "bg-purple-500/20 text-purple-400 ring-purple-500/30"
  }
];

export function RoadmapSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-stone-900/80 to-amber-500/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Roadmap (10‑Year DAO‑Validated Vision)
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Every phase is community‑validated by DAO → ensuring agility & adaptability.
            Our comprehensive roadmap spans from mainnet launch to global leadership in real‑world finance blockchain.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {roadmapPhases.map((phase, index) => (
            <div key={index} className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-6 ring-2 ${phase.color}`}>
                    <phase.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{phase.phase}</h3>
                  <div className="space-y-3">
                    {phase.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                      <div className="text-center">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                          phase.status === 'active' ? 'bg-amber-500/20 text-amber-400' :
                          phase.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          <span className="text-sm font-medium capitalize">{phase.status}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-3">
                          {phase.phase.split('(')[0].trim()}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {phase.items.length} major milestones planned for this phase
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {index < roadmapPhases.length - 1 && (
                <div className="flex justify-center mt-12">
                  <div className="h-12 w-px bg-gradient-to-b from-amber-500/50 to-transparent"></div>
                </div>
              )}
            </div>
          ))}

          {/* DAO Validation Note */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/20 backdrop-blur-sm rounded-full">
              <span className="text-amber-200 font-medium">
                👉 Every phase is community‑validated by DAO → ensuring agility & adaptability
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
