export default function AllocationsPage() {
  return (
    <main className="pt-24 pb-20 px-4 md:px-8 max-w-screen-2xl mx-auto">
      <section className="mt-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">
              Current Status • October 2024
            </span>
            <h1 className="text-4xl md:text-[3.5rem] leading-none font-bold tracking-tighter text-primary mb-6">
              Monthly Allocations
            </h1>
            <p className="text-lg text-secondary max-w-2xl">
              Verified digital ledger of your family&apos;s entitlement for the current cycle.
              Transparency ensured via decentralized smart distribution protocols.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end border-surface-container">
            <button className="flex w-full lg:w-auto items-center justify-center gap-3 px-6 md:px-8 py-4 bg-primary text-on-primary rounded-xl font-bold shadow-xl hover:translate-y-[-2px] transition-all">
              <span className="material-symbols-outlined">download</span>
              Download Entitlement Certificate
            </button>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="md:col-span-2 bg-surface-container-low p-6 md:p-10 rounded-3xl flex flex-col justify-between min-h-[400px]">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">Claimed Quota</h3>
            <p className="text-secondary">
              Overall consumption of your monthly entitlement across all categories.
            </p>
          </div>
          <div className="mt-12">
            <div className="flex justify-between items-end mb-4">
              <span className="text-[4rem] sm:text-[5rem] font-black leading-none text-primary">64%</span>
              <div className="text-right">
                <span className="block text-sm font-bold uppercase tracking-widest text-secondary">
                  Remaining balance
                </span>
                <span className="text-xl sm:text-2xl font-bold text-on-tertiary-fixed-variant">
                  12.5 KG Total
                </span>
              </div>
            </div>
            <div className="w-full h-8 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[64%]"></div>
            </div>
          </div>
        </div>
        <div className="bg-primary text-on-primary p-6 md:p-10 rounded-3xl flex flex-col">
          <div className="mb-auto">
            <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-on-primary-container text-3xl">
                account_balance_wallet
              </span>
            </div>
            <h3 className="text-xl font-bold mb-1">Household ID</h3>
            <p className="text-primary-fixed-dim font-mono tracking-widest uppercase text-sm">
              RAT-MH-992031-B
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-primary-fixed-dim text-sm">Scheme</span>
              <span className="font-bold">Antyodaya Anna (AAY)</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-primary-fixed-dim text-sm">Members</span>
              <span className="font-bold">04 Verified</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-primary-fixed-dim text-sm">Last Collection</span>
              <span className="font-bold">Oct 12, 2024</span>
            </div>
          </div>
        </div>
      </div>
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-primary mb-10">Commodity Breakdown</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl transition-all hover:bg-white hover:shadow-2xl group">
            <div className="flex justify-between items-start mb-8 md:mb-12">
              <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">grass</span>
              </div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest text-right">
                Rice (Fine)
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-bold text-primary">
                15.0 <span className="text-lg font-medium text-secondary">KG</span>
              </div>
              <p className="text-sm text-secondary">Monthly Entitlement</p>
            </div>
            <div className="mt-8 pt-6 border-t border-surface-container">
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary italic">Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-bold text-[10px] uppercase">
                  Available
                </span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl transition-all hover:bg-white hover:shadow-2xl group">
            <div className="flex justify-between items-start mb-8 md:mb-12">
              <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">bakery_dining</span>
              </div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest text-right">
                Wheat
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-bold text-primary">
                10.0 <span className="text-lg font-medium text-secondary">KG</span>
              </div>
              <p className="text-sm text-secondary">Monthly Entitlement</p>
            </div>
            <div className="mt-8 pt-6 border-t border-surface-container">
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary italic">Status</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-[10px] uppercase">
                  Collected
                </span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl transition-all hover:bg-white hover:shadow-2xl group">
            <div className="flex justify-between items-start mb-8 md:mb-12">
              <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">water_drop</span>
              </div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest text-right">
                Sugar
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-bold text-primary">
                2.0 <span className="text-lg font-medium text-secondary">KG</span>
              </div>
              <p className="text-sm text-secondary">Monthly Entitlement</p>
            </div>
            <div className="mt-8 pt-6 border-t border-surface-container">
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary italic">Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-bold text-[10px] uppercase">
                  Available
                </span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl transition-all hover:bg-white hover:shadow-2xl group">
            <div className="flex justify-between items-start mb-8 md:mb-12">
              <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">propane_tank</span>
              </div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest text-right">
                Kerosene
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-bold text-primary">
                5.0 <span className="text-lg font-medium text-secondary">LT</span>
              </div>
              <p className="text-sm text-secondary">Monthly Entitlement</p>
            </div>
            <div className="mt-8 pt-6 border-t border-surface-container">
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary italic">Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-bold text-[10px] uppercase">
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-surface-container-low rounded-2xl md:rounded-[2rem] p-6 md:p-12 overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4 md:gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Allocation History</h2>
              <p className="text-secondary mt-2">
                Immutable log of previous disbursements and verified transactions.
              </p>
            </div>
            <button className="text-sm font-bold text-primary underline underline-offset-4 hover:text-on-tertiary-fixed-variant whitespace-nowrap">
              View Detailed Ledger
            </button>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-3 md:gap-0 bg-surface-container-lowest/50 hover:bg-surface-container-lowest p-5 md:p-6 rounded-xl transition-all cursor-default border border-surface-container/50 md:border-none">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="font-bold">September 2024</span>
              </div>
              <div className="text-secondary text-sm font-mono">Transaction #7729-AX</div>
              <div className="font-medium text-primary">32.0 KG Disbursed</div>
              <div className="flex justify-end hidden md:flex">
                <span className="material-symbols-outlined text-secondary hover:text-primary cursor-pointer">
                  visibility
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-3 md:gap-0 bg-surface-container-lowest/50 hover:bg-surface-container-lowest p-5 md:p-6 rounded-xl transition-all cursor-default border border-surface-container/50 md:border-none">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="font-bold">August 2024</span>
              </div>
              <div className="text-secondary text-sm font-mono">Transaction #6541-BQ</div>
              <div className="font-medium text-primary">32.0 KG Disbursed</div>
              <div className="flex justify-end hidden md:flex">
                <span className="material-symbols-outlined text-secondary hover:text-primary cursor-pointer">
                  visibility
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-3 md:gap-0 bg-surface-container-lowest/50 hover:bg-surface-container-lowest p-5 md:p-6 rounded-xl transition-all cursor-default border border-surface-container/50 md:border-none">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="font-bold">July 2024</span>
              </div>
              <div className="text-secondary text-sm font-mono">Transaction #5920-CP</div>
              <div className="font-medium text-primary">32.0 KG Disbursed</div>
              <div className="flex justify-end hidden md:flex">
                <span className="material-symbols-outlined text-secondary hover:text-primary cursor-pointer">
                  visibility
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none hidden md:block">
          <span className="material-symbols-outlined text-[30rem]">history_edu</span>
        </div>
      </section>
    </main>
  )
}
