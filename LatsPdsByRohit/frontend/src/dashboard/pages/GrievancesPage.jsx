import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { apiClient } from '../../lib/apiClient'
import { useAuth } from '../../context/AuthContext'
import InlineSpinner from '../../components/ui/InlineSpinner'
import { EmptyState, PageLoader } from '../../components/ui/PageState'
import { getApiErrorMessage } from '../../utils/api'
import { isAdminRole } from '../../utils/roles'
import { callPhoneNumber, downloadCsv } from '../../utils/actions'

function getStatusClasses(status) {
  if (status === 'Resolved') {
    return 'bg-green-100 text-green-700'
  }

  if (status === 'In Progress') {
    return 'bg-yellow-100 text-yellow-700'
  }

  return 'bg-surface-container text-on-surface-variant'
}

function formatDate(dateValue) {
  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return 'UNKNOWN DATE'
  }

  return date
    .toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase()
}

export default function GrievancesPage() {
  const { token, user } = useAuth()
  const [grievances, setGrievances] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showNewestFirst, setShowNewestFirst] = useState(true)
  const isAdmin = isAdminRole(user?.role)

  async function loadGrievances(isActive = true) {
    setIsLoading(true)
    setError('')

    try {
      const endpoint = isAdmin ? '/grievances' : '/grievances/my'
      const response = await apiClient.get(endpoint)

      if (isActive) {
        setGrievances(Array.isArray(response.data) ? response.data : [])
      }
    } catch (requestError) {
      if (isActive) {
        const nextError = getApiErrorMessage(requestError, 'Unable to load your grievances.')
        setError(nextError)
        toast.error(nextError)
      }
    } finally {
      if (isActive) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    let isActive = true
    loadGrievances(isActive)

    return () => {
      isActive = false
    }
  }, [isAdmin, token])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!subject.trim()) {
      setFormStatus({
        type: 'error',
        message: 'Please enter a subject for your grievance.',
      })
      return
    }

    if (!description.trim()) {
      setFormStatus({
        type: 'error',
        message: 'Please provide a description for your grievance.',
      })
      return
    }

    setIsSubmitting(true)
    setFormStatus({ type: '', message: '' })

    try {
      await apiClient.post('/grievances', {
        subject: subject.trim(),
        description: description.trim(),
      })

      setSubject('')
      setDescription('')
      setFormStatus({
        type: 'success',
        message: 'Your grievance has been submitted successfully.',
      })
      toast.success('Grievance submitted successfully.')
      await loadGrievances(true)
    } catch (requestError) {
      const nextError = getApiErrorMessage(requestError, 'Unable to submit your grievance.')
      setFormStatus({
        type: 'error',
        message: nextError,
      })
      toast.error(nextError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const sortedGrievances = [...grievances].sort((left, right) => {
    const leftTime = new Date(left.filedDate).getTime()
    const rightTime = new Date(right.filedDate).getTime()
    return showNewestFirst ? rightTime - leftTime : leftTime - rightTime
  })

  function handleExportGrievances() {
    if (!sortedGrievances.length) {
      toast.error('No grievance records are available to export.')
      return
    }

    downloadCsv(
      'grievances.csv',
      ['Subject', 'Status', 'Filed Date', 'Description'],
      sortedGrievances.map((grievance) => [
        grievance.subject,
        grievance.status,
        formatDate(grievance.filedDate),
        grievance.description,
      ]),
    )
    toast.success('Grievance records exported.')
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Accountability Portal</span>
        <h2 className="text-5xl font-black tracking-tight text-on-surface">Grievances</h2>
        <p className="mt-4 max-w-2xl text-lg text-on-surface-variant">
          {isAdmin
            ? 'Review complaint records across the platform, monitor status changes, and keep accountability workflows moving.'
            : 'A direct channel to the monitoring agency. Report issues with fair price shops, allocation discrepancies, or operational misconduct.'}
        </p>
      </div>

      <div className={`mt-12 grid grid-cols-1 gap-8 ${isAdmin ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
        <div className={isAdmin ? 'space-y-6' : 'lg:col-span-2 space-y-6'}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">{isAdmin ? 'Complaint Queue' : 'Recent Submissions'}</h3>
            <div className="flex gap-2">
              <button
                className="rounded bg-surface-container px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-on-surface hover:bg-surface-variant"
                onClick={() => setShowNewestFirst((currentValue) => !currentValue)}
                type="button"
              >
                {showNewestFirst ? 'Newest First' : 'Oldest First'}
              </button>
              <button
                className="rounded bg-surface-container px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-on-surface hover:bg-surface-variant"
                onClick={handleExportGrievances}
                type="button"
              >
                Export PDF
              </button>
            </div>
          </div>

          {isLoading ? (
            <PageLoader
              title="Loading your grievances..."
              description="We are retrieving your latest submissions and status updates."
            />
          ) : error ? (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm font-medium text-error shadow-sm">
              {error}
            </div>
          ) : (
            <div className="space-y-4">
              {grievances.length ? (
                sortedGrievances.map((grievance) => (
                  <div key={grievance._id} className="rounded-2xl border border-surface bg-surface-container-lowest p-6 shadow-sm flex flex-col md:flex-row gap-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-surface-container text-on-surface-variant">
                      <span className="material-symbols-outlined text-3xl">gavel</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row justify-between md:items-start mb-2 gap-2">
                        <h4 className="text-lg font-bold text-on-surface">{grievance.subject}</h4>
                        <span className={`inline-flex px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded ${getStatusClasses(grievance.status)}`}>
                          {grievance.status}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{grievance.description}</p>
                      <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        {isAdmin && grievance.user?.name ? (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">person</span>
                            {grievance.user.name}
                          </span>
                        ) : null}
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> {formatDate(grievance.filedDate)}</span>
                        <span># {grievance._id.slice(-6).toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState
                  description={isAdmin
                    ? 'No complaint records are available right now. New submissions will appear here as soon as users file them.'
                    : 'No grievance records are available yet. File your first report using the form on the right.'}
                  icon="gavel"
                  title={isAdmin ? 'No complaints found' : 'No grievance records found'}
                />
              )}
            </div>
          )}
        </div>

        {!isAdmin ? (
          <div className="space-y-6">
            <div className="rounded-2xl border border-surface bg-surface-container-lowest p-6 shadow-sm">
              <h3 className="text-lg font-bold text-on-surface mb-1">File Report</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-6">Formal Submission</p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Subject</label>
                  <input
                    className="w-full rounded-lg border border-surface bg-white px-4 py-3 text-sm text-on-surface outline-none focus:border-primary"
                    disabled={isSubmitting}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="e.g. Under-weighing at FPS counter"
                    type="text"
                    value={subject}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Incident Description</label>
                  <textarea
                    className="w-full rounded-lg border border-surface bg-white px-4 py-3 text-sm text-on-surface outline-none focus:border-primary resize-none"
                    disabled={isSubmitting}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Provide specific details, dates, and times..."
                    rows="4"
                    value={description}
                  />
                </div>

                {formStatus.message ? (
                  <p className={`text-sm font-medium ${formStatus.type === 'success' ? 'text-green-700' : 'text-error'}`}>
                    {formStatus.message}
                  </p>
                ) : null}

                <button
                  className="mt-2 flex w-full items-center justify-between rounded-lg bg-primary px-6 py-4 font-bold text-on-primary hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <InlineSpinner />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Grievance</span>
                      <span className="material-symbols-outlined">send</span>
                    </>
                  )}
                </button>

                <p className="mt-4 px-4 text-center text-[10px] italic text-on-surface-variant leading-relaxed">
                  Your report will be logged with a unique tracking ID and verified by the district supervisor within 48 hours.
                </p>
              </form>
            </div>

            <div className="rounded-2xl border border-primary bg-primary p-6 text-on-primary shadow-lg">
              <h3 className="mb-2 text-base font-bold">Need immediate help?</h3>
              <p className="mb-5 text-xs leading-relaxed text-primary-container">
                Call our 24/7 dedicated helpline for urgent ration distribution issues.
              </p>
              <button className="text-2xl font-black tracking-tight" onClick={() => callPhoneNumber('18004429000')} type="button">1800-442-9000</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
