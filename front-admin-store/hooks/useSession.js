const useSession = async () => {
  try {
    const res = await fetch(`${process.env.URL_BASE}/api/auth/getAuth`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    const data = await res.json()
    return data
  } catch (e) {
    return e
  }
}
export default useSession