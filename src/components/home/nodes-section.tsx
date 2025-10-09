import { Button } from "@/components/ui/button";
import { ArrowRight, Server, Database, Globe, Cpu, HardDrive, Wifi, Award, Users, TrendingUp } from "lucide-react";

const nodeTypes = [
  {
    name: "Validator Nodes",
    description: "Participate in IBFT 2.0 consensus (requires KLC stake)",
    icon: Server,
    color: "bg-amber-500/20 text-amber-400 ring-amber-500/30"
  },
  {
    name: "Public RPC Nodes",
    description: "Access for developers, enterprises, and wallets/dApps",
    icon: Globe,
    color: "bg-blue-500/20 text-blue-400 ring-blue-500/30"
  },
  {
    name: "Archive Nodes",
    description: "Full blockchain history for traceability",
    icon: Database,
    color: "bg-green-500/20 text-green-400 ring-green-500/30"
  }
];

const requirements = [
  { icon: Cpu, label: "CPU", value: "8 cores" },
  { icon: HardDrive, label: "RAM", value: "16GB" },
  { icon: Database, label: "SSD", value: "1TB" },
  { icon: Wifi, label: "Bandwidth", value: "1Gbps" }
];

const benefits = [
  {
    icon: Award,
    title: "PoS Staking Rewards",
    description: "Share of 49% of total supply distributed over 50+ years"
  },
  {
    icon: Users,
    title: "Greater Governance Power",
    description: "DAO voting weighted by staking amount"
  },
  {
    icon: TrendingUp,
    title: "Network Contribution",
    description: "Direct contribution to Kalychain's stability & future"
  }
];

export function NodesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-500/20 via-black to-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nodes: The Heart of Kalychain
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Validators secure and maintain the network via staking, ensuring decentralization and network integrity.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Node Types */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Node Types</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {nodeTypes.map((node, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover-lift-light">
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ring-2 ${node.color}`}>
                    <node.icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{node.name}</h4>
                  <p className="text-gray-400">{node.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to Become a Validator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">How to Become a Validator?</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-sm flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Hold Required KLC</h4>
                    <p className="text-gray-400">Hold the required amount of KLC for staking</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-sm flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Setup Infrastructure</h4>
                    <p className="text-gray-400">Run recommended infrastructure specifications</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-sm flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Deploy & Follow Docs</h4>
                    <p className="text-gray-400">Deploy following official documentation</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-sm flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Stake & Join DAO</h4>
                    <p className="text-gray-400">Stake KLC & join the Validator DAO</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Infrastructure Requirements</h3>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="grid grid-cols-2 gap-6">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                        <req.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{req.label}</p>
                        <p className="text-amber-400 font-bold">{req.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Validator Benefits */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Validator Benefits</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-amber-500/10 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20 text-center hover-lift-light">
                  <div className="h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 mx-auto ring-2 ring-amber-500/30">
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">{benefit.title}</h4>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-amber-500 text-black hover:bg-amber-400 group"
                asChild
              >
                <a href="https://github.com/KalyCoinProject/node-install" target="_blank" rel="noopener noreferrer">
                  Become a Validator
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-amber-400 text-amber-100 hover:bg-white/20 hover:text-white"
                asChild
              >
                <a href="https://kalyscan.io/accounts" target="_blank" rel="noopener noreferrer">
                  Explore Nodes via KalyScan
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
