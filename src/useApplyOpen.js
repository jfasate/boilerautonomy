import { useEffect, useState } from 'react'

const HASH = '#apply'

// Opens whenever the URL hash is #apply, so any link to "#apply" opens the form
// and the form can be shared directly as https://<site>/#apply.
export default function useApplyOpen() {
  const [open, setOpen] = useState(() => window.location.hash === HASH)
  useEffect(() => {
    const onHash = () => setOpen(window.location.hash === HASH)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const close = () => {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    setOpen(false)
  }
  return [open, close]
}
