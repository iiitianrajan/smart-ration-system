import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { apiClient } from '../../lib/apiClient'
import { useAuth } from '../../context/AuthContext'
import InlineSpinner from '../../components/ui/InlineSpinner'
import { getApiErrorMessage } from '../../utils/api'

function maskAadharNumber(aadharNumber) {
  if (!aadharNumber || aadharNumber.length < 4) {
    return 'Not available'
  }

  return `XXXX XXXX ${aadharNumber.slice(-4)}`
}

function formatObjectIdDate(id) {
  if (!id || id.length < 8) {
    return 'Available after next sync'
  }

  const timestamp = Number.parseInt(id.slice(0, 8), 16) * 1000
  const date = new Date(timestamp)

  if (Number.isNaN(date.getTime())) {
    return 'Available after next sync'
  }

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatRoleLabel(role) {
  if (!role) {
    return 'User'
  }

  return role.charAt(0).toUpperCase() + role.slice(1)
}

function buildSystemLog(user) {
  return [
    {
      time: 'Profile',
      label: `Session restored for ${user?.name || 'verified account'}`,
      status: 'Current',
    },
    {
      time: 'Account',
      label: `Primary mobile linked to ${user?.phone || 'this profile'}`,
      status: 'Active',
    },
  ]
}

export default function ProfilePage() {
  const { user, refreshProfile } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const roleLabel = formatRoleLabel(user?.role)
  const profileId = user?._id ? `RTS-${String(user._id).slice(-8).toUpperCase()}` : 'Pending sync'
  const registeredAt = formatObjectIdDate(user?._id)
  const maskedAadhar = maskAadharNumber(user?.aadharNumber)
  const systemLog = useMemo(() => buildSystemLog(user), [user])

  async function handleRefreshProfile() {
    setIsRefreshing(true)

    try {
      await refreshProfile()
      toast.success('Profile data refreshed successfully.')
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Unable to refresh your profile right now.'))
    } finally {
      setIsRefreshing(false)
    }
  }

  async function handleCopyProfileId() {
    if (!user?._id) {
      toast.error('Profile ID is not available yet.')
      return
    }

    try {
      await window.navigator.clipboard.writeText(profileId)
      toast.success('Profile ID copied to clipboard.')
    } catch {
      toast.error('Unable to copy the profile ID right now.')
    }
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">{roleLabel} Account</span>
          <h2 className="text-5xl font-black tracking-tight text-on-surface">{user?.name || 'Verified User'}</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-on-primary">
              <span className="material-symbols-outlined text-[14px] filled-star">verified_user</span>
              Identity Verified
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-3 py-1.5 text-xs font-bold text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">badge</span>
              {roleLabel} Access
            </span>
          </div>
        </div>
        <div className="mt-6 flex gap-3 md:mt-0">
          <button
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-on-primary shadow-sm hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isRefreshing}
            onClick={handleRefreshProfile}
            type="button"
          >
            {isRefreshing ? (
              <>
                <InlineSpinner />
                Refreshing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">sync</span>
                Refresh Profile
              </>
            )}
          </button>
          <button
            className="flex items-center gap-2 rounded-lg bg-blue-100 px-6 py-3 font-bold text-blue-900 shadow-sm hover:bg-blue-200"
            onClick={handleCopyProfileId}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">content_copy</span>
            Copy Profile ID
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl border border-surface bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-on-surface mb-1">Official Records</h3>
                <p className="text-sm text-on-surface-variant">Live identity data returned from the authenticated profile endpoint</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-on-surface-variant">
                <span className="material-symbols-outlined">fingerprint</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Aadhar Number</p>
                <p className="font-mono text-xl font-bold text-on-surface">{maskedAadhar}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Profile ID</p>
                <p className="font-mono text-xl font-bold text-on-surface">{profileId}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Registration Date</p>
                <p className="italic text-lg text-on-surface">{registeredAt}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Ration Card</p>
                <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-bold uppercase text-blue-800">
                  {user?.rationCardNumber || 'Not assigned'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-on-surface">Contact Details</h3>
              <div className="space-y-6">
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Primary Mobile</p>
                  <p className="text-lg font-medium text-on-surface">{user?.phone ? `+91 ${user.phone}` : 'Not available'}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Role</p>
                  <p className="text-lg font-medium text-on-surface">{roleLabel}</p>
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Communication Status</p>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-surface-container px-3 py-1 text-[10px] font-bold text-on-surface">Authenticated Session</span>
                    <span className="rounded-full bg-surface-container px-3 py-1 text-[10px] font-bold text-on-surface">Refresh Enabled</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-on-surface">Account Snapshot</h3>
                <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-700">
                  Active
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-surface pb-4">
                  <span className="text-sm text-on-surface-variant">Authenticated</span>
                  <span className="text-sm font-bold text-on-surface">Yes</span>
                </div>
                <div className="flex items-center justify-between border-b border-surface pb-4">
                  <span className="text-sm text-on-surface-variant">Current Role</span>
                  <span className="text-sm font-bold text-on-surface">{roleLabel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant">Profile Source</span>
                  <span className="text-sm font-bold text-on-surface">Live API</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border-l-4 border-primary bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-on-surface">Security Checkpoint</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <span className="material-symbols-outlined text-[12px] filled-star-check">check_circle</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Session Verification</p>
                  <p className="mt-1 text-sm font-medium text-on-surface">Active authenticated token</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <span className="material-symbols-outlined text-[12px] filled-star-check">check_circle</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Refresh Token</p>
                  <p className="mt-1 text-sm font-medium text-on-surface">Secure session rotation enabled</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <span className="material-symbols-outlined text-[12px]">more_horiz</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Profile Freshness</p>
                  <p className="mt-1 text-sm font-medium text-on-surface">Use refresh to sync latest server data</p>
                </div>
              </div>
            </div>

            <button
              className="mt-8 w-full rounded-lg border border-surface bg-white px-4 py-3 text-sm font-bold text-primary shadow-sm transition-colors hover:bg-slate-50"
              onClick={handleRefreshProfile}
              type="button"
            >
              Re-sync Profile
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-surface bg-surface-container-lowest p-6 shadow-sm">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-bold text-on-surface">System Integrity Log</h3>
            <p className="mt-1 max-w-xl text-sm text-on-surface-variant">
              The entries below reflect the current authenticated profile state instead of placeholder dashboard data.
            </p>
          </div>
          <div className="text-right">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Profile Source</p>
            <p className="font-mono text-xs font-bold text-on-surface">{profileId}</p>
          </div>
        </div>

        <div className="space-y-4 font-mono text-xs">
          {systemLog.map((entry) => (
            <div key={entry.time + entry.label} className="flex flex-col justify-between border-b border-surface py-3 last:border-0 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4 text-on-surface-variant">
                <span>{entry.time}</span>
                <span className="font-bold text-on-surface">{entry.label}</span>
              </div>
              <span className="mt-2 text-[10px] font-bold uppercase text-slate-400 sm:mt-0">{entry.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
