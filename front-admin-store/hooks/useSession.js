export const useSession = async () => {
  const fetch = async () => {
    try {
      const res = await fetch(`${process.env.URL_BASE}/api/auth/getAuth`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
    } catch (e) {
      console.error(e)
    }
  }
  fetch()
  return [session, { loading, error }]
}