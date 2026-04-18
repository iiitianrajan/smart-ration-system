export function downloadFile(filename, content, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export function downloadCsv(filename, headers, rows) {
  const escapeCell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`
  const csvContent = [headers.map(escapeCell).join(','), ...rows.map((row) => row.map(escapeCell).join(','))].join('\n')
  downloadFile(filename, csvContent, 'text/csv;charset=utf-8')
}

export async function copyToClipboard(value) {
  await window.navigator.clipboard.writeText(String(value))
}

export function openMapQuery(query) {
  const encodedQuery = encodeURIComponent(query)
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodedQuery}`, '_blank', 'noopener,noreferrer')
}

export function callPhoneNumber(phoneNumber) {
  window.location.href = `tel:${phoneNumber}`
}
