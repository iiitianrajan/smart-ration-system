export default function PublicLedgerPage() {
  return (
    <main className="pt-24 pb-20 max-w-screen-2xl mx-auto px-4 md:px-8">
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-label-md uppercase tracking-[0.05em] font-bold text-secondary mb-2 block">
              National Transparency Protocol
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-primary leading-none">
              Public Ledger
            </h1>
            <p className="mt-4 text-secondary max-w-xl text-lg leading-relaxed">
              Immutable verification of every grain distributed. Real-time auditing of the National
              Food Security pipeline powered by distributed ledger technology.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 bg-surface-container-highest text-on-surface-variant font-semibold rounded-lg hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined">download</span>
              Export Data
            </button>
            <button className="flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 bg-primary text-on-primary font-semibold rounded-lg hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined">analytics</span>
              Advanced Analytics
            </button>
          </div>
        </div>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl flex flex-col justify-between min-h-[180px]">
          <div className="flex justify-between items-start">
            <span className="text-label-md uppercase tracking-wider font-bold text-secondary">
              Total Allocations
            </span>
            <span className="material-symbols-outlined text-primary-container">inventory_2</span>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="text-[3rem] md:text-[3.5rem] font-black tracking-tighter text-primary leading-none">
              4.2<span className="text-2xl font-bold ml-1">MT</span>
            </div>
            <div className="flex items-center gap-1 text-green-700 text-sm font-medium mt-2 md:mt-4">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              <span>12.4% vs last cycle</span>
            </div>
          </div>
        </div>
        <div className="bg-primary text-on-primary p-6 md:p-8 rounded-xl flex flex-col justify-between min-h-[180px] shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-label-md uppercase tracking-wider font-bold opacity-80">
              Distributions Today
            </span>
            <span className="material-symbols-outlined opacity-80">local_shipping</span>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="text-[3rem] md:text-[3.5rem] font-black tracking-tighter leading-none">
              84.9<span className="text-2xl font-bold ml-1">K</span>
            </div>
            <div className="flex items-center gap-1 opacity-80 text-sm font-medium mt-2 md:mt-4">
              <span className="material-symbols-outlined text-xs">update</span>
              <span>Updated 2 minutes ago</span>
            </div>
          </div>
        </div>
        <div className="bg-secondary-container p-6 md:p-8 rounded-xl flex flex-col justify-between min-h-[180px]">
          <div className="flex justify-between items-start">
            <span className="text-label-md uppercase tracking-wider font-bold text-on-secondary-container">
              Leakage Prevented
            </span>
            <span className="material-symbols-outlined text-on-secondary-container">verified_user</span>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="text-[3rem] md:text-[3.5rem] font-black tracking-tighter text-on-secondary-container leading-none">
              15.2<span className="text-2xl font-bold ml-1">%</span>
            </div>
            <div className="flex items-center gap-1 text-on-secondary-container text-sm font-medium mt-2 md:mt-4">
              <span className="material-symbols-outlined text-xs">shield</span>
              <span>Biometric validation enforced</span>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-surface-container-low rounded-2xl overflow-hidden">
        <div className="px-4 md:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-full md:max-w-md">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary text-on-surface"
              placeholder="Search Transaction ID..."
              type="text"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center justify-between gap-2 bg-surface-container px-4 py-2 rounded-lg">
              <span className="text-sm font-bold text-secondary uppercase tracking-tight">
                Commodity:
              </span>
              <select className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 cursor-pointer">
                <option>All Types</option>
                <option>Wheat</option>
                <option>Rice</option>
                <option>Coarse Grains</option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-2 bg-surface-container px-4 py-2 rounded-lg">
              <span className="text-sm font-bold text-secondary uppercase tracking-tight">Status:</span>
              <select className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 cursor-pointer">
                <option>Verified</option>
                <option>Pending</option>
                <option>Flagged</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-high border-none">
                <th className="px-4 md:px-8 py-4 text-label-md uppercase tracking-widest font-bold text-secondary">
                  Transaction ID
                </th>
                <th className="px-4 md:px-6 py-4 text-label-md uppercase tracking-widest font-bold text-secondary">
                  Location (FPS)
                </th>
                <th className="px-4 md:px-6 py-4 text-label-md uppercase tracking-widest font-bold text-secondary">
                  Commodity Type
                </th>
                <th className="px-4 md:px-6 py-4 text-label-md uppercase tracking-widest font-bold text-secondary">
                  Quantity
                </th>
                <th className="px-4 md:px-6 py-4 text-label-md uppercase tracking-widest font-bold text-secondary">
                  Timestamp
                </th>
                <th className="px-4 md:px-8 py-4 text-label-md uppercase tracking-widest font-bold text-secondary">
                  Verification
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-0">
              <tr className="bg-surface-container-lowest hover:bg-primary-fixed transition-colors group">
                <td className="px-4 md:px-8 py-6 font-mono text-sm font-bold text-primary">#TX-98231-A4</td>
                <td className="px-4 md:px-6 py-6">
                  <div className="font-bold text-on-surface">FPS-442 (Old Delhi North)</div>
                  <div className="text-xs text-secondary">ID: 09923842</div>
                </td>
                <td className="px-4 md:px-6 py-6">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">
                    Rice (Premium)
                  </span>
                </td>
                <td className="px-4 md:px-6 py-6 font-bold text-primary">35.00 KG</td>
                <td className="px-4 md:px-6 py-6 text-sm text-secondary">24 Oct 2024, 14:22:10</td>
                <td className="px-4 md:px-8 py-6">
                  <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
                    <span className="material-symbols-outlined text-lg filled-star-check">check_circle</span>
                    Biometric Success
                  </div>
                </td>
              </tr>
              <tr className="bg-surface-container-low hover:bg-primary-fixed transition-colors">
                <td className="px-4 md:px-8 py-6 font-mono text-sm font-bold text-primary">#TX-98231-A5</td>
                <td className="px-4 md:px-6 py-6">
                  <div className="font-bold text-on-surface">FPS-102 (Mumbai Central)</div>
                  <div className="text-xs text-secondary">ID: 11029384</div>
                </td>
                <td className="px-4 md:px-6 py-6">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">
                    Wheat
                  </span>
                </td>
                <td className="px-4 md:px-6 py-6 font-bold text-primary">12.50 KG</td>
                <td className="px-4 md:px-6 py-6 text-sm text-secondary">24 Oct 2024, 14:19:45</td>
                <td className="px-4 md:px-8 py-6">
                  <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
                    <span className="material-symbols-outlined text-lg filled-star-check">check_circle</span>
                    OTP Verified
                  </div>
                </td>
              </tr>
              <tr className="bg-surface-container-lowest hover:bg-primary-fixed transition-colors">
                <td className="px-4 md:px-8 py-6 font-mono text-sm font-bold text-primary">#TX-98231-A6</td>
                <td className="px-4 md:px-6 py-6">
                  <div className="font-bold text-on-surface">FPS-882 (Bengaluru East)</div>
                  <div className="text-xs text-secondary">ID: 55439281</div>
                </td>
                <td className="px-4 md:px-6 py-6">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">
                    Coarse Grains
                  </span>
                </td>
                <td className="px-4 md:px-6 py-6 font-bold text-primary">05.00 KG</td>
                <td className="px-4 md:px-6 py-6 text-sm text-secondary">24 Oct 2024, 14:15:30</td>
                <td className="px-4 md:px-8 py-6">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                    <span className="material-symbols-outlined text-lg">pending_actions</span>
                    Awaiting Offline Sync
                  </div>
                </td>
              </tr>
              <tr className="bg-surface-container-low hover:bg-primary-fixed transition-colors">
                <td className="px-4 md:px-8 py-6 font-mono text-sm font-bold text-primary">#TX-98231-A7</td>
                <td className="px-4 md:px-6 py-6">
                  <div className="font-bold text-on-surface">FPS-012 (Chennai Port)</div>
                  <div className="text-xs text-secondary">ID: 88726351</div>
                </td>
                <td className="px-4 md:px-6 py-6">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">
                    Rice (Premium)
                  </span>
                </td>
                <td className="px-4 md:px-6 py-6 font-bold text-primary">42.00 KG</td>
                <td className="px-4 md:px-6 py-6 text-sm text-secondary">24 Oct 2024, 14:12:12</td>
                <td className="px-4 md:px-8 py-6">
                  <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
                    <span className="material-symbols-outlined text-lg filled-star-check">check_circle</span>
                    Biometric Success
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-4 md:px-8 py-6 bg-surface-container flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-secondary font-medium text-center">
            Showing 1 to 4 of 24,912 transactions
          </span>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-lowest text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-lowest text-secondary font-bold hover:bg-surface-variant transition-colors">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-lowest text-secondary font-bold hover:bg-surface-variant transition-colors">
              3
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-lowest text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
      <section className="mt-12 p-1 bg-gradient-to-r from-primary to-primary-container rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-surface-container-lowest p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 rounded-[0.9rem]">
          <div className="flex-1">
            <h3 className="text-3xl font-black text-primary tracking-tight mb-4">
              Zero Trust Distribution Framework
            </h3>
            <p className="text-secondary leading-relaxed">
              Every transaction shown above is cryptographically signed and stored on the National
              Transparency Grid. This data is available for independent audit by civilian oversight
              bodies via our public API.
            </p>
          </div>
          <div className="flex flex-col gap-4 min-w-[200px]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary filled-star-check">encrypted</span>
              <span className="text-sm font-bold uppercase tracking-widest text-secondary">
                AES-256 Encrypted
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary filled-star-check">database</span>
              <span className="text-sm font-bold uppercase tracking-widest text-secondary">
                Immutable Log
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary filled-star-check">public</span>
              <span className="text-sm font-bold uppercase tracking-widest text-secondary">
                Global Sync
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
