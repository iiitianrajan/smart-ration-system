export default function FairPriceShopsPage() {
  return (
    <main className="pt-24 min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pb-12">
        <header className="mb-12">
          <div className="mb-2">
            <span className="label-md uppercase tracking-[0.05em] text-on-surface-variant font-bold text-[0.75rem]">
              Digital Directory
            </span>
          </div>
          <h1 className="text-4xl md:text-[3.5rem] leading-none font-extrabold tracking-tight text-primary mb-8">
            Fair Price Shops
          </h1>
          <div className="bg-surface-container-low p-4 md:p-6 rounded-xl flex flex-col md:flex-row gap-4 items-stretch md:items-end">
            <div className="w-full md:w-1/3">
              <label className="block text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                District / Region
              </label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none focus:ring-0 focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary px-4 py-3 rounded-t-lg transition-all"
                  placeholder="e.g. South Delhi"
                  type="text"
                />
                <span className="material-symbols-outlined absolute right-3 top-3 text-outline">
                  location_on
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                Pincode
              </label>
              <input
                className="w-full bg-surface-container-highest border-none focus:ring-0 focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary px-4 py-3 rounded-t-lg transition-all"
                placeholder="110001"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                Status Filter
              </label>
              <select className="w-full bg-surface-container-highest border-none focus:ring-0 focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary px-4 py-3 rounded-t-lg transition-all">
                <option>All Shops</option>
                <option>Currently Open</option>
                <option>Stock Available</option>
              </select>
            </div>
            <button className="bg-primary text-on-primary px-8 py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all w-full md:w-auto mt-2 md:mt-0">
              <span className="material-symbols-outlined">search</span>
              Search Shops
            </button>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[calc(100vh-450px)] min-h-[600px]">
          <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto no-scrollbar pr-0 lg:pr-4">
            <div className="bg-surface-container-lowest p-6 rounded-xl transition-all hover:shadow-md border-l-4 border-emerald-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="label-md font-bold text-emerald-600 flex items-center gap-1 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    OPEN NOW
                  </span>
                  <h3 className="text-xl font-extrabold tracking-tight text-primary">
                    FPS-10492: Central Vista Ration Hub
                  </h3>
                  <p className="text-on-surface-variant text-sm mt-1">
                    12/B Sector 4, Janpath Road, New Delhi
                  </p>
                </div>
                <span className="bg-surface-container p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">storefront</span>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                <div className="bg-surface-container-low p-3 rounded-lg text-center">
                  <p className="text-[0.65rem] font-bold text-outline-variant uppercase">Wheat</p>
                  <p className="font-bold text-primary">1,240kg</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded-lg text-center">
                  <p className="text-[0.65rem] font-bold text-outline-variant uppercase">Rice</p>
                  <p className="font-bold text-primary">850kg</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded-lg text-center">
                  <p className="text-[0.65rem] font-bold text-outline-variant uppercase">Sugar</p>
                  <p className="font-bold text-primary">210kg</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-secondary-container text-on-secondary-container py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-all">
                  View Details
                </button>
                <button className="flex-1 border border-error/20 text-error py-2.5 rounded-lg font-bold text-sm hover:bg-error-container/20 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">report</span> Report Issue
                </button>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl transition-all hover:shadow-md border-l-4 border-slate-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="label-md font-bold text-slate-500 flex items-center gap-1 mb-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    CLOSED
                  </span>
                  <h3 className="text-xl font-extrabold tracking-tight text-primary">
                    FPS-88231: Mehrauli Community Store
                  </h3>
                  <p className="text-on-surface-variant text-sm mt-1">
                    Plot 45, Near Qutub Minar Metro, Delhi
                  </p>
                </div>
                <span className="bg-surface-container p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">storefront</span>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                <div className="bg-surface-container-low p-3 rounded-lg text-center">
                  <p className="text-[0.65rem] font-bold text-outline-variant uppercase">Wheat</p>
                  <p className="font-bold text-primary">45kg</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded-lg text-center">
                  <p className="text-[0.65rem] font-bold text-outline-variant uppercase">Rice</p>
                  <p className="font-bold text-primary">12kg</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded-lg text-center opacity-40">
                  <p className="text-[0.65rem] font-bold text-outline-variant uppercase">Sugar</p>
                  <p className="font-bold text-error">OUT</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-secondary-container text-on-secondary-container py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-all">
                  View Details
                </button>
                <button className="flex-1 border border-error/20 text-error py-2.5 rounded-lg font-bold text-sm hover:bg-error-container/20 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">report</span> Report Issue
                </button>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl transition-all hover:shadow-md border-l-4 border-emerald-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="label-md font-bold text-emerald-600 flex items-center gap-1 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    OPEN NOW
                  </span>
                  <h3 className="text-xl font-extrabold tracking-tight text-primary">
                    FPS-10992: Dwarka Sector 10 Hub
                  </h3>
                  <p className="text-on-surface-variant text-sm mt-1">
                    Building 88, Palam Ext, Dwarka
                  </p>
                </div>
                <span className="bg-surface-container p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">storefront</span>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                <div className="bg-surface-container-low p-3 rounded-lg text-center">
                  <p className="text-[0.65rem] font-bold text-outline-variant uppercase">Wheat</p>
                  <p className="font-bold text-primary">2,100kg</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded-lg text-center">
                  <p className="text-[0.65rem] font-bold text-outline-variant uppercase">Rice</p>
                  <p className="font-bold text-primary">1,150kg</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded-lg text-center">
                  <p className="text-[0.65rem] font-bold text-outline-variant uppercase">Sugar</p>
                  <p className="font-bold text-primary">450kg</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-secondary-container text-on-secondary-container py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-all">
                  View Details
                </button>
                <button className="flex-1 border border-error/20 text-error py-2.5 rounded-lg font-bold text-sm hover:bg-error-container/20 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">report</span> Report Issue
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 relative bg-surface-container rounded-2xl overflow-hidden group h-[400px] lg:h-auto">
            <img
              alt="Map"
              className="w-full h-full object-cover grayscale opacity-80"
              data-alt="Modern map interface with blue location markers and highlighted city districts in a clean minimal data visualization style"
              data-location="New Delhi"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVbHc1D2qdNq77UaYqeS4OlWLUysh5xTZ91DLLqzuEX5BwssJsh4cZ-IgVA2D-UC7oGqrr3jOfAWk48976qAK96xtvHOkMg4Z_PXYHP31Y34Px2CaYMMdLwSc7acUXIIEla21lUCwg2rJQncJvvrIlGABhyRWf6VJv8oMo9fWe6GhFEpv-XN0dWh4MFx6yqTUikdVtAhKUTpJa6oJmANOpLq3HfqIBnsjzGv1l7Drb7mz9BWihOXQVz-UIcX-58d47jBG4dkFllLo"
            />
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <button className="bg-white p-2 rounded shadow-md hover:bg-slate-100">
                <span className="material-symbols-outlined">add</span>
              </button>
              <button className="bg-white p-2 rounded shadow-md hover:bg-slate-100">
                <span className="material-symbols-outlined">remove</span>
              </button>
            </div>
            <div className="absolute bottom-6 right-6 flex gap-3">
              <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold shadow-xl flex items-center gap-2">
                <span className="material-symbols-outlined">my_location</span> Recenter
              </button>
              <button className="bg-surface-container-lowest text-primary px-4 py-2 rounded-lg font-bold shadow-xl flex items-center gap-2">
                <span className="material-symbols-outlined">layers</span> Satellite
              </button>
            </div>
            <div className="absolute top-1/2 left-1/3 group/pin cursor-pointer">
              <div className="bg-emerald-500 w-4 h-4 rounded-full border-4 border-white shadow-lg animate-bounce"></div>
              <div className="hidden group-hover/pin:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white p-3 rounded-lg shadow-2xl min-w-[200px]">
                <p className="text-xs font-bold text-emerald-600">FPS-10492</p>
                <p className="text-sm font-extrabold text-primary">Central Vista Hub</p>
                <p className="text-[10px] text-on-surface-variant">Click to view inventory</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
