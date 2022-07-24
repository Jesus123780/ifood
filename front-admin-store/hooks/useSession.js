export const getSession = async () => {
  try {
    const res = await fetch(`${process.env.URL_BASE}api/auth/getAuth`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    const data = await res.json()
    const { ok, ok: { user }, isSession } = data || {}
    const { deviceid, token } = user || {}
    return {
      user,
      ok,
      isSession,
      deviceid,
      token
    }
  } catch (e) {
    return e
  }
}