export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto md:mx-0">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Preferences & Controls</span>
        <h2 className="text-5xl font-black tracking-tight text-on-surface">Account Configuration</h2>
        <div className="mt-4 h-1 w-16 bg-primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3 space-y-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Section 01</p>
            <button className="block text-sm font-bold text-primary border-r-2 border-primary" type="button">Language & Region</button>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Section 02</p>
            <button className="block text-sm font-semibold text-on-surface-variant hover:text-on-surface border-r-2 border-transparent" type="button">Communication</button>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Section 03</p>
            <button className="block text-sm font-semibold text-on-surface-variant hover:text-on-surface border-r-2 border-transparent" type="button">Security & Access</button>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Section 04</p>
            <button className="block text-sm font-semibold text-on-surface-variant hover:text-on-surface border-r-2 border-transparent" type="button">Accessibility</button>
          </div>
        </div>

        <div className="md:col-span-9 space-y-8">
          <section className="rounded-2xl border border-surface bg-surface-container-lowest p-8 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-bold text-on-surface mb-6">
              <span className="material-symbols-outlined text-[20px] text-primary">language</span>
              Language Preferences
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Interface Language</label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-lg border border-surface bg-white px-4 py-3 text-sm text-on-surface outline-none focus:border-primary font-medium">
                    <option>English (United Kingdom)</option>
                    <option>Hindi</option>
                    <option>Marathi</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[18px]">expand_more</span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Regional Format</label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-lg border border-surface bg-white px-4 py-3 text-sm text-on-surface outline-none focus:border-primary font-medium">
                    <option>India (IST)</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[18px]">expand_more</span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-surface bg-surface-container-lowest p-8 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-slate-50 rotate-12 opacity-50 transform pointer-events-none">
               <div className="w-full h-8 bg-slate-100 flex items-center justify-center"><div className="w-1/2 h-4 bg-slate-200"></div></div>
               <div className="w-full h-32 flex divide-x divide-slate-100"><div className="flex-1 bg-slate-50"></div><div className="flex-1 bg-slate-50"></div><div className="flex-1 bg-slate-50"></div></div>
            </div>

            <div className="relative z-10">
              <h3 className="flex items-center gap-2 text-lg font-bold text-on-surface mb-6">
                <span className="material-symbols-outlined text-[20px] text-primary">notifications</span>
                Notification Channels
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-white p-5 border border-surface shadow-sm">
                  <div>
                    <p className="font-bold text-sm text-on-surface">Email Notifications</p>
                    <p className="text-xs text-on-surface-variant mt-1">Receive monthly ration summaries and receipt copies.</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between rounded-xl bg-white p-5 border border-surface shadow-sm">
                  <div>
                    <p className="font-bold text-sm text-on-surface">SMS Alerts</p>
                    <p className="text-xs text-on-surface-variant mt-1">Get real-time updates on shop availability and delivery.</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white p-5 border border-surface shadow-sm">
                  <div>
                    <p className="font-bold text-sm text-on-surface">Push Notifications</p>
                    <p className="text-xs text-on-surface-variant mt-1">Mobile app alerts for urgent administrative updates.</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-surface-container focus:ring-offset-2">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-surface bg-surface-container-lowest p-8 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-bold text-on-surface mb-6">
              <span className="material-symbols-outlined text-[20px] text-primary">security</span>
              Security & Authentication
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between rounded-xl bg-white p-5 border border-surface shadow-sm gap-4">
                <div>
                  <p className="font-bold text-sm text-on-surface">Change Login Password</p>
                  <p className="text-xs text-on-surface-variant mt-1">Last changed: 14 May 2023</p>
                </div>
                <button className="rounded px-6 py-2.5 text-xs font-bold text-white bg-slate-900 border border-slate-900 hover:bg-slate-800">
                  Update Password
                </button>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between rounded-xl bg-white p-5 border border-surface shadow-sm gap-4">
                <div>
                  <p className="font-bold text-sm text-on-surface">Reset Verification PIN</p>
                  <p className="text-xs text-on-surface-variant mt-1">Required for ration shop transactions.</p>
                </div>
                <button className="rounded px-6 py-2.5 text-xs font-bold text-blue-900 bg-blue-100 hover:bg-blue-200">
                  Reset PIN
                </button>
              </div>
            </div>
          </section>
          
          <section className="rounded-2xl border border-surface bg-surface-container-lowest p-8 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-bold text-on-surface mb-6">
              <span className="material-symbols-outlined text-[20px] text-primary">accessibility</span>
              Accessibility Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-surface bg-white p-6 shadow-sm">
                 <h4 className="font-bold text-sm text-on-surface mb-2">High Contrast Mode</h4>
                 <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                   Increases visibility for users with visual impairments.
                 </p>
                 <button className="rounded px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase text-white bg-slate-900">
                   Enable
                 </button>
              </div>
              
              <div className="rounded-xl border border-surface bg-white p-6 shadow-sm">
                 <h4 className="font-bold text-sm text-on-surface mb-2">Screen Reader Optimization</h4>
                 <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                   Enhanced semantic HTML for external reader tools.
                 </p>
                 <button className="rounded px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase text-on-surface-variant bg-surface-container hover:bg-surface-variant">
                   Disabled
                 </button>
              </div>
              
              <div className="rounded-xl border border-surface bg-white p-6 shadow-sm md:col-span-2">
                 <h4 className="font-bold text-sm text-on-surface mb-2">Text Scaling</h4>
                 <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                   Adjust system-wide font size for better legibility.
                 </p>
                 
                 <div className="px-4 mt-8 pb-4">
                   <div className="relative h-1 w-full bg-surface-container rounded-full">
                     <div className="absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 translate-x-12 rounded-full bg-slate-900 shadow-sm ring-4 ring-white"></div>
                   </div>
                   <div className="flex justify-between mt-4 text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">
                     <span>Standard</span>
                     <span>Large</span>
                     <span>X-Large</span>
                   </div>
                 </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-surface">
            <button className="text-sm font-bold text-on-surface-variant hover:text-on-surface">
              Discard Changes
            </button>
            <button className="rounded bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-800">
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
