
import { z } from 'zod'

export const guiaSchema = z.object({
  numero: z.string().min(1, 'El número de guía es requerido'),
  origen: z.string().min(1, 'El origen es requerido'),
  destino: z.string().min(1, 'El destino es requerido'),
  cliente: z.string().min(1, 'El cliente es requerido'),
  descripcion: z.string().optional(),
  peso: z.number().positive('El peso debe ser mayor a 0').optional(),
  valor: z.number().positive('El valor debe ser mayor a 0').optional(),
})

export const userSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export type GuiaFormData = z.infer<typeof guiaSchema>
export type UserFormData = z.infer<typeof userSchema>
export type LoginFormData = z.infer<typeof loginSchema>
