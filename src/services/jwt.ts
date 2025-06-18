import { jwtDecode } from 'jwt-decode'


export interface JwtPayload {
  iat: number
  exp: number
  roles: string[]
  username: string
  id: number
}

export function decodeAndStoreJwt(token: string): void {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    localStorage.setItem('jwt', token)
    localStorage.setItem('roles', JSON.stringify(decoded.roles))
  } catch (error) {
    console.error('Erreur de décodage du token', error)
  }
}
