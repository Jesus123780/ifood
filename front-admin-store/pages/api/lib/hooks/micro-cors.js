import { RequestHandler } from 'micro'
// docker compose -f docker/development/docker-compose.yml up
export default function Cors() {
  return RequestHandler
}