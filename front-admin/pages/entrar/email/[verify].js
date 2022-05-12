import { useRouter } from 'next/router'
import { EmailVerifyCode } from '../../../container/entrar/vefify'

export default function EmailView() {
  const router = useRouter()
  return (<EmailVerifyCode code={router.query.verify} />)
}
