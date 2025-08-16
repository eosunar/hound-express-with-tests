
// Global type definitions for the application
export interface User {
  id: string
  email: string
  name?: string
  role: 'ADMIN' | 'USER'
  createdAt: Date
  updatedAt: Date
}

export interface Guia {
  id: string
  numero: string
  origen: string
  destino: string
  estado: 'PENDIENTE' | 'EN_TRANSITO' | 'ENTREGADA' | 'CANCELADA'
  fechaCreacion: Date
  fechaEntrega?: Date
  cliente: string
  descripcion?: string
  peso?: number
  valor?: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export type GuiaStatus = 'PENDIENTE' | 'EN_TRANSITO' | 'ENTREGADA' | 'CANCELADA'

export interface GuiaFormData {
  numero: string
  origen: string
  destino: string
  cliente: string
  descripcion?: string
  peso?: number
  valor?: number
}
