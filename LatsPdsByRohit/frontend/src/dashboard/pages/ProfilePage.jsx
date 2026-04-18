export default function ProfilePage() {
  return (
    <div className="max-w-6xl">
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">User Account</span>
          <h2 className="text-5xl font-black tracking-tight text-on-surface">Arjun S. Vardhan</h2>
          <div className="mt-4 flex flex-wrap gap-3">
             <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-on-primary">
               <span className="material-symbols-outlined text-[14px] filled-star">verified_user</span> Identity Verified
             </span>
             <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-3 py-1.5 text-xs font-bold text-on-surface-variant">
               <span className="material-symbols-outlined text-[14px]">location_on</span> Ward 12, Sector B
             </span>
          </div>
        </div>
        <div className="mt-6 flex gap-3 md:mt-0">
          <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-on-primary shadow-sm hover:brightness-110">
            <span className="material-symbols-outlined text-[20px]">edit</span> Edit Profile
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-100 px-6 py-3 font-bold text-blue-900 shadow-sm hover:bg-blue-200">
            <span className="material-symbols-outlined text-[20px]">print</span> Card PDF
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl border border-surface bg-white p-8 shadow-sm">
             <div className="mb-8 flex items-start justify-between">
               <div>
                 <h3 className="text-2xl font-bold text-on-surface mb-1">Official Records</h3>
                 <p className="text-sm text-on-surface-variant">Immutable government identifier data</p>
               </div>
               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-on-surface-variant">
                 <span className="material-symbols-outlined">fingerprint</span>
               </div>
             </div>
             
             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mt-4">
               <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Aadhar Number</p>
                 <div className="flex items-center gap-2">
                   <p className="font-mono text-xl font-bold text-on-surface">XXXX XXXX 4902</p>
                   <span className="material-symbols-outlined text-[16px] text-primary cursor-pointer">visibility</span>
                 </div>
               </div>
               <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">User ID</p>
                 <p className="font-mono text-xl font-bold text-on-surface">RTS-MN-9980122</p>
               </div>
               <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Registration Date</p>
                 <p className="italic text-lg text-on-surface">14 October 2021</p>
               </div>
               <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Card Type</p>
                 <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800 uppercase">Priority Household (PHH)</span>
               </div>
             </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-on-surface mb-6">Contact Nodes</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Primary Mobile</p>
                  <p className="text-lg font-medium text-on-surface">+91 98765-43210</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Digital Mail</p>
                  <p className="text-lg font-medium text-on-surface">arjun.v@digital.gov.in</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Communication Channel</p>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-surface-container px-3 py-1 text-[10px] font-bold text-on-surface">SMS Alerts</span>
                    <span className="rounded-full bg-surface-container px-3 py-1 text-[10px] font-bold text-on-surface">WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-on-surface">Linked Family Members</h3>
                <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">add</span> Add Member
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Priya Vardhan', rel: 'Spouse', id: 'RTS-MN-9980123', seed: 'Priya', status: 'Active' },
                  { name: 'Karan Vardhan', rel: 'Son', id: 'RTS-MN-9980124', seed: 'Karan', status: 'Active' },
                  { name: 'Sita Vardhan', rel: 'Daughter', id: 'RTS-MN-9980125', seed: 'Sita', status: 'Active' }
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between pb-4 border-b border-surface last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.seed}`} className="h-10 w-10 rounded-full border border-surface-container object-cover bg-slate-100" alt={member.name} />
                      <div>
                        <p className="font-bold text-sm text-on-surface">{member.name}</p>
                        <p className="text-[10px] text-on-surface-variant">{member.rel} • ID: {member.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Status</p>
                      <p className="text-[10px] font-bold text-state-success mt-0.5">{member.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border-l-4 border-primary bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-on-surface mb-6">Security Checkpoint</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <span className="material-symbols-outlined text-[12px] filled-star-check">check_circle</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Biometric Sync</p>
                  <p className="text-sm font-medium text-on-surface mt-1">Completed Mar 2024</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <span className="material-symbols-outlined text-[12px] filled-star-check">check_circle</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Address Audit</p>
                  <p className="text-sm font-medium text-on-surface mt-1">Verified by Ward Head</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <span className="material-symbols-outlined text-[12px]">more_horiz</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">KYC Renewal</p>
                  <p className="text-sm font-medium text-on-surface mt-1">Due in 184 days</p>
                </div>
              </div>
            </div>
            
            <button className="mt-8 w-full rounded-lg border border-surface bg-white px-4 py-3 text-sm font-bold text-primary shadow-sm hover:bg-slate-50 transition-colors">
              Re-verify Documents
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 rounded-2xl border border-surface bg-surface-container-lowest p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-lg font-bold text-on-surface">System Integrity Log</h3>
            <p className="text-sm text-on-surface-variant max-w-xl mt-1">
              Every modification to your profile is recorded in our decentralized ledger. This ensures total transparency and prevents unauthorized tampering with your eligibility status.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-1">Last Sync</p>
            <p className="font-mono text-xs font-bold text-on-surface">2024-05-20 14:32:01 UTC</p>
          </div>
        </div>
        
        <div className="space-y-4 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-surface">
            <div className="flex items-center gap-4 text-on-surface-variant">
              <span>08:12</span>
              <span className="font-bold text-on-surface">Mobile Number Verified via OTP (Primary)</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 mt-2 sm:mt-0">Action Complete</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-surface">
            <div className="flex items-center gap-4 text-on-surface-variant">
              <span>04:22</span>
              <span className="font-bold text-on-surface">Annual Eligibility Audit - No Changes Detected</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 mt-2 sm:mt-0">System Log</span>
          </div>
        </div>
      </div>
    </div>
  )
}
