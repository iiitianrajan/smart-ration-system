export default function TransparencyReportsPage() {
  return (
    <main className="pt-32 pb-24 px-4 md:px-8 max-w-screen-2xl mx-auto">
      <header className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="label-md uppercase tracking-[0.2em] text-primary font-bold block mb-4">
              Institutional Accountability
            </span>
            <h1 className="text-4xl md:text-[3.5rem] font-extrabold leading-none tracking-tighter text-primary mb-6">
              Transparency Reports
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-2xl">
              Comprehensive auditing of the national ration distribution network. We provide
              immutable records of resource allocation, demographic impact, and systemic
              efficiency.
            </p>
          </div>
          <div className="bg-surface-container-low p-6 md:p-8 rounded-xl flex items-center gap-6 min-w-0 md:min-w-[300px] w-full md:w-auto">
            <div className="h-16 w-1 bg-primary"></div>
            <div>
              <div className="text-3xl font-black text-primary">99.8%</div>
              <div className="text-xs uppercase tracking-widest text-outline font-bold">
                Data Accuracy Rating
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
        <div className="md:col-span-8 bg-surface-container-low p-6 md:p-8 rounded-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-12 gap-4">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-primary">Distribution Trends</h3>
              <p className="text-sm text-secondary">
                National allocation vs. Actual fulfillment (Last 12 Months)
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-container-lowest text-[10px] font-bold rounded-full text-primary">
                LIVE DATA
              </span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2 md:px-4">
            <div className="w-full bg-primary-fixed-dim/20 rounded-t-sm h-[60%] relative group">
              <div className="absolute bottom-0 w-full bg-primary h-[85%] group-hover:h-[90%] transition-all duration-500"></div>
            </div>
            <div className="w-full bg-primary-fixed-dim/20 rounded-t-sm h-[65%] relative group">
              <div className="absolute bottom-0 w-full bg-primary h-[70%] group-hover:h-[75%] transition-all duration-500"></div>
            </div>
            <div className="w-full bg-primary-fixed-dim/20 rounded-t-sm h-[80%] relative group">
              <div className="absolute bottom-0 w-full bg-primary h-[95%] group-hover:h-[100%] transition-all duration-500"></div>
            </div>
            <div className="w-full bg-primary-fixed-dim/20 rounded-t-sm h-[55%] relative group">
              <div className="absolute bottom-0 w-full bg-primary h-[40%] group-hover:h-[45%] transition-all duration-500"></div>
            </div>
            <div className="w-full bg-primary-fixed-dim/20 rounded-t-sm h-[70%] relative group">
              <div className="absolute bottom-0 w-full bg-primary h-[88%] group-hover:h-[93%] transition-all duration-500"></div>
            </div>
            <div className="w-full bg-primary-fixed-dim/20 rounded-t-sm h-[90%] relative group">
              <div className="absolute bottom-0 w-full bg-primary h-[92%] group-hover:h-[97%] transition-all duration-500"></div>
            </div>
          </div>
          <div className="mt-6 flex justify-between text-[10px] font-bold text-outline-variant uppercase tracking-widest px-2 md:px-4">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>
        <div className="md:col-span-4 bg-primary text-on-primary p-6 md:p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight mb-2">Demographic Impact</h3>
            <p className="text-sm text-on-primary-container">
              Social equity breakdown across all regions.
            </p>
          </div>
          <div className="space-y-6 my-8">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span>Urban Reach</span>
                <span>74%</span>
              </div>
              <div className="h-1 bg-on-primary/10 rounded-full overflow-hidden">
                <div className="h-full bg-on-primary-container w-[74%]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span>Rural Saturation</span>
                <span>92%</span>
              </div>
              <div className="h-1 bg-on-primary/10 rounded-full overflow-hidden">
                <div className="h-full bg-on-primary-container w-[92%]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span>Priority Households</span>
                <span>100%</span>
              </div>
              <div className="h-1 bg-on-primary/10 rounded-full overflow-hidden">
                <div className="h-full bg-white w-full"></div>
              </div>
            </div>
          </div>
          <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
            VIEW REGIONAL AUDITS <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>
      <section className="mb-20">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-primary">
            Annual &amp; Monthly Disclosures
          </h2>
          <div className="flex-grow h-px bg-surface-container"></div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 hover:shadow-xl transition-shadow group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-surface-container-low rounded-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">description</span>
              </div>
              <span className="text-[10px] font-black text-outline uppercase tracking-widest">
                FY 2023-24
              </span>
            </div>
            <h4 className="text-lg font-bold text-primary mb-2">Annual Transparency Audit</h4>
            <p className="text-sm text-secondary mb-6">
              Comprehensive year-end summary including third-party audit verifications and fiscal
              summaries.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-low py-3 rounded-lg text-xs font-bold text-primary hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-sm">picture_as_pdf</span> PDF
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-low py-3 rounded-lg text-xs font-bold text-primary hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-sm">csv</span> CSV
              </button>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 hover:shadow-xl transition-shadow group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-surface-container-low rounded-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <span className="text-[10px] font-black text-outline uppercase tracking-widest">
                Q3 REPORT
              </span>
            </div>
            <h4 className="text-lg font-bold text-primary mb-2">Supply Chain Efficiency</h4>
            <p className="text-sm text-secondary mb-6">
              Analysis of logistics, warehouse throughput, and fair price shop delivery timelines.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-low py-3 rounded-lg text-xs font-bold text-primary hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-sm">picture_as_pdf</span> PDF
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-low py-3 rounded-lg text-xs font-bold text-primary hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-sm">csv</span> CSV
              </button>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 hover:shadow-xl transition-shadow group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-surface-container-low rounded-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <span className="text-[10px] font-black text-outline uppercase tracking-widest">
                MONTHLY
              </span>
            </div>
            <h4 className="text-lg font-bold text-primary mb-2">Grievance Redressal Audit</h4>
            <p className="text-sm text-secondary mb-6">
              Summary of user feedback, complaint resolution rates, and systemic improvements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-low py-3 rounded-lg text-xs font-bold text-primary hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-sm">picture_as_pdf</span> PDF
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-low py-3 rounded-lg text-xs font-bold text-primary hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-sm">csv</span> CSV
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-surface-container p-6 md:p-12 rounded-3xl overflow-hidden relative">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="text-[10px] font-black text-primary-container bg-primary-fixed px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-6 inline-block">
              Developer Portal
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 leading-tight">
              Open Data API for Researchers
            </h2>
            <p className="text-lg text-secondary mb-8">
              Direct programmatic access to the Public Ledger. We believe in the power of
              independent analysis. Our RESTful API provides granular data endpoints for NGOs,
              researchers, and civil society.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <button className="bg-primary text-on-primary w-full sm:w-auto px-8 py-4 justify-center rounded-lg font-bold hover:bg-primary-container transition-all flex items-center gap-3">
                <span className="material-symbols-outlined">api</span> READ DOCUMENTATION
              </button>
              <button className="bg-surface-container-lowest w-full sm:w-auto px-8 py-4 justify-center text-primary rounded-lg font-bold hover:bg-white transition-all">
                REQUEST API KEY
              </button>
            </div>
          </div>
          <div className="bg-inverse-surface p-6 rounded-2xl shadow-2xl font-mono text-xs md:text-sm leading-relaxed text-on-primary-container/80 relative overflow-x-auto">
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-error/40"></div>
              <div className="w-3 h-3 rounded-full bg-secondary/40"></div>
              <div className="w-3 h-3 rounded-full bg-primary-fixed/40"></div>
            </div>
            <div className="text-primary-fixed mb-4">// GET /v1/transparency/allocations</div>
            <div className="space-y-1">
              <span className="text-white">{'{'}</span>
              <br />
              &nbsp;&nbsp;<span className="text-primary-fixed-dim">&quot;region&quot;:</span>{' '}
              <span className="text-on-tertiary-container">&quot;Northern District-4&quot;</span>,
              <br />
              &nbsp;&nbsp;<span className="text-primary-fixed-dim">&quot;period&quot;:</span>{' '}
              <span className="text-on-tertiary-container">&quot;2024-Q1&quot;</span>,
              <br />
              &nbsp;&nbsp;<span className="text-primary-fixed-dim">&quot;metrics&quot;:</span> [
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'{ '}
              <span className="text-primary-fixed-dim">&quot;commodity&quot;:</span>{' '}
              <span className="text-on-tertiary-container">&quot;Wheat&quot;</span>,{' '}
              <span className="text-primary-fixed-dim">&quot;tons&quot;:</span>{' '}
              <span className="text-on-tertiary-container">12450.5</span> {'},'}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'{ '}
              <span className="text-primary-fixed-dim">&quot;commodity&quot;:</span>{' '}
              <span className="text-on-tertiary-container">&quot;Rice&quot;</span>,{' '}
              <span className="text-primary-fixed-dim">&quot;tons&quot;:</span>{' '}
              <span className="text-on-tertiary-container">8920.2</span> {'}'}
              <br />
              &nbsp;&nbsp;],
              <br />
              &nbsp;&nbsp;<span className="text-primary-fixed-dim">&quot;verified&quot;:</span>{' '}
              <span className="text-on-tertiary-container">true</span>
              <br />
              <span className="text-white">{'}'}</span>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #001e40 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
      </section>
    </main>
  )
}
