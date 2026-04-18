import { Link } from 'react-router-dom'
import { PUBLIC_LEDGER_ROUTE } from '../constants/routes'

export default function HomePage() {
  return (
    <main className="mt-20">
      <section className="relative px-8 pt-24 pb-32 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <span className="label-md uppercase tracking-widest text-primary font-bold mb-4 block">
              National Digital Infrastructure
            </span>
            <h1 className="text-6xl md:text-7xl font-extrabold text-primary leading-[1.1] tracking-tighter mb-8">
              The Future of{' '}
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                Public Trust
              </span>{' '}
              is Digital.
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed mb-12 max-w-xl">
              RationGuard eliminates systemic leaks in food distribution through cryptographic
              verification and real-time ledger transparency. Every grain accounted for, every
              eligible user empowered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                className="bg-primary text-on-primary px-10 py-5 rounded-lg font-bold text-lg hover:shadow-xl transition-all w-full sm:w-auto text-center"
                to={PUBLIC_LEDGER_ROUTE}
              >
                Explore the Ledger
              </Link>
              <button className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-lg font-bold text-lg hover:bg-surface-container transition-all w-full sm:w-auto text-center">
                Learn More
              </button>
            </div>
            <div className="flex items-center gap-8 border-l-4 border-primary/20 pl-8">
              <div>
                <div className="text-3xl font-black text-primary tracking-tighter">142M+</div>
                <div className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">
                  Active Beneficiaries
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-primary tracking-tighter">$1.2B</div>
                <div className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">
                  Leakage Prevented
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="aspect-square bg-surface-container rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                className="w-full h-full object-cover mix-blend-overlay opacity-30 grayscale"
                data-alt="abstract close-up of a high-tech digital ledger screen with glowing blue data points and lines representing secure financial transactions"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzckIGu7U5nXO6RziV6YoC_IVsM3xR7uhGNG33jekAlYs16tbpvobeCbu888Qxnw94ul50OJynl-HtviZ3fAU6vlpilvDwoePLC6oAp_GSyuH63oDOdIVehbeRJ8Je_8vV2t1Pwk1gUTZP-2YlzGRAO9AV72VS_9ELOcuHwxfkalekxD-5pstXav8-gLbjrkrB85ZFAgGEV8KfXlVhoU9ef-WGB5jy5VQLHxDtsIjxaehJG3mAC_wGgnlllUHZOCeXpwSD2WvjuFk"
              />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="bg-surface-container-lowest p-8 rounded-xl shadow-2xl w-full border border-outline-variant/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-primary">Live Allocation Feed</span>
                    <span className="flex items-center gap-2 text-xs font-bold text-primary bg-primary-fixed px-2 py-1 rounded">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                      SECURE
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 bg-surface-container-low rounded-lg animate-pulse"></div>
                    <div className="h-12 bg-surface-container-low rounded-lg animate-pulse w-3/4"></div>
                    <div className="h-12 bg-surface-container-low rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary-container/20 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>
      </section>
      <section className="bg-surface-container-low py-20 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-surface-container-lowest p-10 rounded-xl shadow-sm">
              <div className="text-primary-container mb-4">
                <span className="material-symbols-outlined text-4xl">groups</span>
              </div>
              <div className="text-4xl font-black text-primary mb-1">84.2M</div>
              <p className="text-on-surface-variant font-medium">Families Impacted</p>
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-xl shadow-sm">
              <div className="text-primary-container mb-4">
                <span className="material-symbols-outlined text-4xl">receipt_long</span>
              </div>
              <div className="text-4xl font-black text-primary mb-1">1.2B+</div>
              <p className="text-on-surface-variant font-medium">Monthly Transactions</p>
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-xl shadow-sm">
              <div className="text-primary-container mb-4">
                <span className="material-symbols-outlined text-4xl">verified_user</span>
              </div>
              <div className="text-4xl font-black text-primary mb-1">94%</div>
              <p className="text-on-surface-variant font-medium">Verification Rate</p>
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-xl shadow-sm">
              <div className="text-primary-container mb-4">
                <span className="material-symbols-outlined text-4xl">gavel</span>
              </div>
              <div className="text-4xl font-black text-primary mb-1">Zero</div>
              <p className="text-on-surface-variant font-medium">Ghost Cards Found</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-20">
            <span className="label-md uppercase tracking-widest text-primary font-bold">
              The Challenge
            </span>
            <h2 className="text-4xl font-bold mt-4 tracking-tight">Systemic Vulnerabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="relative group">
              <span className="material-symbols-outlined text-error text-4xl mb-4 block">
                group_off
              </span>
              <div className="h-2 w-12 bg-error mb-6"></div>
              <h3 className="text-xl font-bold mb-4">Corruption Hubs</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Illegal diversion of essential commodities by middlemen before reaching local
                distribution points.
              </p>
            </div>
            <div className="relative group">
              <span className="material-symbols-outlined text-error text-4xl mb-4 block">
                visibility_off
              </span>
              <div className="h-2 w-12 bg-error mb-6"></div>
              <h3 className="text-xl font-bold mb-4">Dark Operations</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Beneficiaries left in the dark about exact arrival times and stock availability.
              </p>
            </div>
            <div className="relative group">
              <span className="material-symbols-outlined text-error text-4xl mb-4 block">
                trending_down
              </span>
              <div className="h-2 w-12 bg-error mb-6"></div>
              <h3 className="text-xl font-bold mb-4">Quantity Leakage</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Systematic under-weighing and distribution of substandard quality rations.
              </p>
            </div>
            <div className="relative group">
              <span className="material-symbols-outlined text-error text-4xl mb-4 block">
                voice_over_off
              </span>
              <div className="h-2 w-12 bg-error mb-6"></div>
              <h3 className="text-xl font-bold mb-4">Muted Feedback</h3>
              <p className="text-on-surface-variant leading-relaxed">
                No direct mechanism for users to report anomalies without fear of retribution.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-surface-container-low py-32 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-5xl font-black text-primary tracking-tighter mb-6">
                The Solution Infrastructure
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                A multi-layered digital defensive architecture designed for total accountability.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-lowest p-8 rounded-xl">
                <span className="material-symbols-outlined text-primary text-3xl mb-4">
                  location_searching
                </span>
                <h4 className="font-bold text-lg mb-2">GPS Tracking</h4>
                <p className="text-sm text-on-surface-variant">
                  Real-time geolocation mapping for all grain-carrying vehicles.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl">
                <span className="material-symbols-outlined text-primary text-3xl mb-4">
                  fingerprint
                </span>
                <h4 className="font-bold text-lg mb-2">Biometric Auth</h4>
                <p className="text-sm text-on-surface-variant">
                  Multi-factor biometric verification for every distribution transaction.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl">
                <span className="material-symbols-outlined text-primary text-3xl mb-4">
                  notifications_active
                </span>
                <h4 className="font-bold text-lg mb-2">SMS Alerts</h4>
                <p className="text-sm text-on-surface-variant">
                  Instant push notifications to beneficiaries when stock arrives at the shop.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl">
                <span className="material-symbols-outlined text-primary text-3xl mb-4">
                  analytics
                </span>
                <h4 className="font-bold text-lg mb-2">Operations Console</h4>
                <p className="text-sm text-on-surface-variant">
                  Role-based access controls with predictive leakage analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32 px-8">
        <div className="max-w-screen-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-20 tracking-tight">The 5-Step Transparency Loop</h2>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 relative">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-outline-variant -z-10"></div>
            <div className="flex-1 text-center group">
              <div className="w-24 h-24 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black shadow-xl ring-8 ring-background">
                1
              </div>
              <h4 className="font-bold mb-2">Digital Identity</h4>
              <p className="text-sm text-on-surface-variant px-4">
                Users log in using verified credentials.
              </p>
            </div>
            <div className="flex-1 text-center group">
              <div className="w-24 h-24 bg-surface-container text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black shadow-sm ring-8 ring-background group-hover:bg-primary group-hover:text-on-primary transition-colors">
                2
              </div>
              <h4 className="font-bold mb-2">Allocation View</h4>
              <p className="text-sm text-on-surface-variant px-4">
                Instant access to entitlement details for the month.
              </p>
            </div>
            <div className="flex-1 text-center group">
              <div className="w-24 h-24 bg-surface-container text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black shadow-sm ring-8 ring-background group-hover:bg-primary group-hover:text-on-primary transition-colors">
                3
              </div>
              <h4 className="font-bold mb-2">Live Tracking</h4>
              <p className="text-sm text-on-surface-variant px-4">
                Monitor stock transit from godown to dealer.
              </p>
            </div>
            <div className="flex-1 text-center group">
              <div className="w-24 h-24 bg-surface-container text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black shadow-sm ring-8 ring-background group-hover:bg-primary group-hover:text-on-primary transition-colors">
                4
              </div>
              <h4 className="font-bold mb-2">Smart Pickup</h4>
              <p className="text-sm text-on-surface-variant px-4">
                Transparent weighting with digital receipts.
              </p>
            </div>
            <div className="flex-1 text-center group">
              <div className="w-24 h-24 bg-surface-container text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black shadow-sm ring-8 ring-background group-hover:bg-primary group-hover:text-on-primary transition-colors">
                5
              </div>
              <h4 className="font-bold mb-2">Grievance</h4>
              <p className="text-sm text-on-surface-variant px-4">
                Raise immediate red-flags for any discrepancies.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primary text-on-primary py-32 px-8">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="p-10 border border-on-primary/20 rounded-2xl hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-5xl mb-6">face</span>
            <h3 className="text-2xl font-bold mb-4">User</h3>
            <ul className="space-y-3 opacity-80 text-sm">
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-blue-400">check_circle</span>
                Check quota balance
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-blue-400">check_circle</span>
                Track shop stock levels
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-blue-400">check_circle</span>
                Digital transaction history
              </li>
            </ul>
          </div>
          <div className="p-10 border border-on-primary/20 rounded-2xl bg-white/10">
            <span className="material-symbols-outlined text-5xl mb-6">storefront</span>
            <h3 className="text-2xl font-bold mb-4">Dealer</h3>
            <ul className="space-y-3 opacity-80 text-sm">
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-blue-400">check_circle</span>
                Automated stock request
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-blue-400">check_circle</span>
                Digital weighing integration
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-blue-400">check_circle</span>
                Sales summary dashboard
              </li>
            </ul>
          </div>
          <div className="p-10 border border-on-primary/20 rounded-2xl hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-5xl mb-6">admin_panel_settings</span>
            <h3 className="text-2xl font-bold mb-4">System Operator</h3>
            <ul className="space-y-3 opacity-80 text-sm">
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-blue-400">check_circle</span>
                Leakage detection heatmap
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-blue-400">check_circle</span>
                Officer assignment tool
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-blue-400">check_circle</span>
                Fraud alert monitoring
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-32 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="label-md uppercase tracking-widest text-primary font-bold">
                Immutable Record
              </span>
              <h2 className="text-4xl font-bold mt-4 tracking-tight">Public Transparency Ledger</h2>
              <p className="text-on-surface-variant mt-4">
                Redacted data showing volume and flow without compromising individual privacy.
                Trust through visibility.
              </p>
              <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-outline-variant/20">
                <img
                  alt="Public Ledger Data Visualization"
                  className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5OIavjAu0tLKLZRwOT7K2Dh3kbOjvTyFS9Cs2ssP8adurbGqzYzAr530rX3wKeGhXg0kifmSl10iN-U4K5qDIn_I9t_-fRP4_IDGXpyHczSimsH4v0T2M53LFz0dIDkDXbpFBk9b5IVDBSBrr0YL4qFxOrf06XNdsjkEsk9GNKDSFphooXONzt3U-ysXmbJqBBvHukORmoGlN-V2JZNT_4tUaU70Bf1xfohU9izaKjiFL6wv5ZNroBveNmy5FdI_JqnB5i2knNdw"
                />
              </div>
            </div>
            <Link className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold" to={PUBLIC_LEDGER_ROUTE}>
              View Full Ledger
            </Link>
          </div>
          <div className="overflow-x-auto rounded-xl shadow-sm border border-outline-variant/10">
            <table className="w-full text-left bg-white">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-6 py-4 font-black text-xs uppercase tracking-widest">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 font-black text-xs uppercase tracking-widest">
                    FPS Location
                  </th>
                  <th className="px-6 py-4 font-black text-xs uppercase tracking-widest">
                    Quantity (KG)
                  </th>
                  <th className="px-6 py-4 font-black text-xs uppercase tracking-widest">Timestamp</th>
                  <th className="px-6 py-4 font-black text-xs uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                <tr className="hover:bg-primary-fixed/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm">#TXN-849202</td>
                  <td className="px-6 py-4 text-sm">Sector 4, Varanasi Central</td>
                  <td className="px-6 py-4 text-sm font-bold">25.0</td>
                  <td className="px-6 py-4 text-sm">Today, 10:24 AM</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 text-[10px] font-black uppercase px-2 py-1 rounded">
                      Verified
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-primary-fixed/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm">#TXN-849201</td>
                  <td className="px-6 py-4 text-sm">Ward 12, Lucknow East</td>
                  <td className="px-6 py-4 text-sm font-bold">12.5</td>
                  <td className="px-6 py-4 text-sm">Today, 10:15 AM</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 text-[10px] font-black uppercase px-2 py-1 rounded">
                      Verified
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-primary-fixed/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm">#TXN-849198</td>
                  <td className="px-6 py-4 text-sm">Maha Ganj Shop #4</td>
                  <td className="px-6 py-4 text-sm font-bold">30.0</td>
                  <td className="px-6 py-4 text-sm">Today, 09:42 AM</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 text-[10px] font-black uppercase px-2 py-1 rounded">
                      Verified
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="bg-surface-container py-32 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-sm italic">
              <img
                alt="Lakshmi R."
                className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-primary/10"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL3xWjVq3Xwba8BUS8u04vQgHxFQ0da_sDm7828noC5GYGDg_DlDXuRb1jyPzi6nR45hcYV6kTqBFgsd1MCueaUH6TveyL8C_4ngXyPWGZdEvWFrEMFKPDt-QrHXRuXiMEz8jzvvCeXmNSV_tJnufuL7sKzAYURv2Ywnwsmeu-MxypzL-CL6rrhJ8jHsrG2axohBEC7Rl_mcdNCjPMyv4hnkZSelPz84ENPbd8AMvUnR1AV6F5OU3Lm9QYK04JNZkey4KfVg6eGrI"
              />
              <div className="flex gap-1 text-yellow-500 mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              </div>
              <p className="text-on-surface leading-relaxed mb-8">
                &quot;For the first time in 20 years, I know exactly when the wheat is arriving. No
                more wasting hours waiting at the shop only to be told stock is empty.&quot;
              </p>
              <div className="font-bold text-primary">— Lakshmi R., User</div>
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-sm italic">
              <img
                alt="S. Kumar"
                className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-primary/10"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzxL3kDYYX4bqt9WuJZsCoSNDGKVv82DIbiSfxRxnINaug3OVxqbKnrhgB6SKKoC0hAaamjYI_aiheM2HaxVcXoIXwNHpT6QrExzSNclwnX_UDay1UgWlh5S0yN76oK8zIJ547vvEynw75iKRezkd8m9OMNuT0V5078n8DrWNfyJbhFSlpfW3LsbAFrtaUhtxIno0Ekp2TAU9Vg_ijOC4FJ3GBMemSy4jg1CeNYJyHMlx933UL7jHY3CX-0LtMQGdkcnjRNliRCzU"
              />
              <div className="flex gap-1 text-yellow-500 mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              </div>
              <p className="text-on-surface leading-relaxed mb-8">
                &quot;The digital records protect me too. I can show exactly what was distributed to
                whom, eliminating false complaints from local troublemakers.&quot;
              </p>
              <div className="font-bold text-primary">— S. Kumar, FPS Dealer</div>
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-sm italic">
              <img
                alt="Dr. Anita Singh"
                className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-primary/10"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlZYh2GoVDEs4OOmgxptF_UPbgsHZUa0D1qTdI0UgF5hr1zrsKZRRa98KM0bNqd5jsDtdfDEgEKxnhjyYz-N87n7meWit8DfQDKPKmEw28GJuD9NmWh9rkxiLNIaf0gKTgdcdKLBeiYv1VA38TJ77a4Rvgga57m02FOMulfeLIr6EZvWZqUkD54x4r7RLtopClp-tA9-QBAHLuRfqqBrlplYCS7g8rWLZrU-1ItL3kvobxjT_4HMwFjBLrz-S0kIfflDEtIS75UGk"
              />
              <div className="flex gap-1 text-yellow-500 mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              </div>
              <p className="text-on-surface leading-relaxed mb-8">
                &quot;Our audit time has reduced from months to seconds. The real-time tracking is a
                game-changer for administrative accountability.&quot;
              </p>
              <div className="font-bold text-primary">— Dr. Anita Singh, District Operations Officer</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center tracking-tight">Common Inquiries</h2>
          <div className="space-y-4">
            <div className="bg-surface-container-low p-6 rounded-xl">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-bold">How do I register for a digital ration card?</span>
                <span className="material-symbols-outlined">expand_more</span>
              </button>
              <div className="mt-4 text-on-surface-variant text-sm leading-relaxed">
                Registration can be done at any Seva Kendra or via the &apos;Register&apos; button
                on this portal. You will need your national ID and a valid mobile number for
                biometric linking.
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-bold">What if the dealer claims the stock hasn&apos;t arrived?</span>
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-bold">How is my biometric data secured?</span>
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="px-8 pb-32">
        <div className="max-w-screen-2xl mx-auto bg-primary rounded-[2rem] p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
          <h2 className="text-5xl font-black text-on-primary tracking-tighter mb-8 relative z-10">
            Ready to secure your entitlements?
          </h2>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto mb-12 relative z-10">
            Join the millions already benefiting from the National Smart Ration Transparency
            Network.
          </p>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <button className="bg-on-primary text-primary px-12 py-5 rounded-xl font-black text-lg hover:bg-primary-fixed transition-all">
              Get Started Now
            </button>
            <button className="border-2 border-on-primary/30 text-on-primary px-12 py-5 rounded-xl font-black text-lg hover:bg-white/10 transition-all">
              Register Dealer
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

