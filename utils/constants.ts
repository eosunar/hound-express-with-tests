
export const APP_NAME = 'Hound Express'
export const APP_DESCRIPTION = 'Sistema de gestión de guías de transporte'

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  GUIAS: '/guias',
  USUARIOS: '/usuarios',
  REPORTES: '/reportes',
  CONFIGURACION: '/configuracion',
} as const

export const GUIA_ESTADOS = {
  PENDIENTE: 'PENDIENTE',
  EN_TRANSITO: 'EN_TRANSITO',
  ENTREGADA: 'ENTREGADA',
  CANCELADA: 'CANCELADA',
} as const

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const
