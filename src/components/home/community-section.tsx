import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { FaDiscord, FaTelegram, FaGithub, FaTwitter } from "react-icons/fa";

// Use logos with text for all partners
const partners: { name: string; logoUrl: string; url: string; className?: string }[] = [
  {
    name: "CoinMarketCap",
    logoUrl: "/images/coinmarketcap-seeklogo.png", // Using logo with text
    url: "https://coinmarketcap.com/currencies/kalycoin/",
  },
  {
    name: "CoinGecko",
    logoUrl: "/images/coingecko-seeklogo.png", // Using logo with text
    url: "https://www.coingecko.com/en/coins/kalychain",
  },
  {
    name: "Dex-Trade",
    logoUrl: "/images/dex-trade-logo.svg", // This is the correct logo
    url: "https://dex-trade.com/news/klc-will-be-listed-on-dex-trade",
    className: "filter brightness-0 invert scale-150 transform", // Made logo larger
  },
  {
    name: "Chainlist",
    logoUrl: "/images/chainlist.png", // Using logo with text
    url: "https://chainlist.org/chain/3888",
  },
  {
    name: "HyperLedger Besu",
    logoUrl: "/images/besu-logo.svg", // Using logo with text
    url: "https://besu.hyperledger.org/",
    className: "filter brightness-0 invert", // Added filter to make it visible on dark bg
  },
  {
    name: "KalySwap",
    logoUrl: "/images/kalyswap-logo.png", // Adding KalySwap with logo
    url: "https://kalyswap.io/",
  },
  {
    name: "ChangeNOW",
    logoUrl: "/images/changenow-logo.svg",
    url: "https://changenow.io",
    className: "filter brightness-0 invert", // Make it visible on dark bg
  },
  {
    name: "WhiteBIT",
    logoUrl: "/images/whitebit-logo.svg",
    url: "https://whitebit.com/trade/KLC-USDT?type=spot&tab=open-orders",
    className: "filter brightness-0 invert", // Make it visible on dark bg
  },
  {
    name: "Alchemy Pay",
    logoUrl: "/images/alchemy-logo.svg",
    url: "https://alchemypay.org/",
    className: "filter brightness-0 invert", // Make it visible on dark bg
  },
  {
    name: "Guarda",
    logoUrl: "/images/guarda-logo.svg",
    url: "https://guarda.com/",
    className: "filter brightness-0 invert", // Make it visible on dark bg
  },
];

export function CommunitySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-500/20 via-black to-black">
      <div className="container mx-auto px-4 space-y-20">
        {/* Partners & Ecosystem Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Partners & Ecosystem
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Kalychain is backed by a strong network of fintech & institutional partners, including Kalyssi (its original fintech legacy).
            </p>
          </div>

          {/* Updated Grid Layout for Logos with Text */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 place-items-center">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${partner.name}`}
                className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-white/5 transition-all duration-300 w-full max-w-[200px] border border-amber-500/20"
              >
                <div className="h-16 flex items-center justify-center mb-3 bg-amber-500/5 p-2 rounded-lg w-full">
                  <img
                    src={partner.logoUrl}
                    alt={`${partner.name} Logo`}
                    className={`max-h-16 w-auto object-contain ${partner.className || ""}`}
                  />
                </div>
                <span className="text-amber-100 text-sm font-medium text-center">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 italic">(More Coming Soon)</p>
          </div>
        </div>

        {/* Join the Community Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join the Community
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              👉 Kalychain is not just another blockchain. It is trusted infrastructure designed for citizens, merchants, enterprises, and states.
            </p>
            <p className="text-xl font-semibold text-amber-400 mb-8">
              Participate in the revolution:
            </p>
          </div>
          
          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              className="bg-amber-500 text-black hover:bg-amber-400 group"
              asChild
            >
              <a href="https://app.kalyswap.io" target="_blank" rel="noopener noreferrer">
                🔘 Buy & stake KLC
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-amber-400 text-amber-100 hover:bg-white/20 hover:text-white"
              asChild
            >
              <a href="https://dao.kalychain.io/" target="_blank" rel="noopener noreferrer">
                🔘 Take part in DAO governance
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-amber-400 text-amber-100 hover:bg-white/20 hover:text-white"
              asChild
            >
              <a href="https://docs.kalychain.io/" target="_blank" rel="noopener noreferrer">
                🔘 Build your dApps on Kalychain</a>
            </Button>
          </div>
          {/* Community Links */}
          <div className="text-center">
            <p className="text-lg text-gray-300 mb-6">
              
            </p>

            {/* Social Media Links */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://discord.gg/4fDuS3cBJw"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all duration-300"
                aria-label="Join our Discord"
              >
                <FaDiscord className="h-6 w-6" />
              </a>
              <a
                href="https://t.me/+yj8Ae9lNXmg1Yzkx"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all duration-300"
                aria-label="Join our Telegram"
              >
                <FaTelegram className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/KalyCoinProject"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all duration-300"
                aria-label="View our GitHub"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/KalyChain"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all duration-300"
                aria-label="Follow us on Twitter"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all duration-300"
                aria-label="Read our Medium"
              >
                <span className="h-6 w-6 flex items-center justify-center font-bold">M</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
