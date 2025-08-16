
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GuiaForm from '@/components/guia-form'
import { Guia } from '@/lib/types'

// Mock data
const mockGuias: Guia[] = [
  {
    id: '1',
    numeroGuia: 'GE001',
    origen: 'Bogotá',
    destino: 'Medellín',
    destinatario: 'Juan Pérez',
    fechaCreacion: '2024-01-01T00:00:00.000Z',
    estado: 'Pendiente',
    historial: [{
      estado: 'Pendiente',
      fecha: '2024-01-01T00:00:00.000Z',
      comentario: 'Guía creada'
    }]
  }
]

const mockOnAddGuia = jest.fn()

describe('GuiaForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza el formulario correctamente', () => {
    render(<GuiaForm guias={[]} onAddGuia={mockOnAddGuia} />)
    
    expect(screen.getByText('Registrar Nueva Guía')).toBeInTheDocument()
    expect(screen.getByLabelText(/Número de Guía/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Origen/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Destino/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Destinatario/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Registrar Guía/ })).toBeInTheDocument()
  })

  it('muestra errores de validación cuando los campos están vacíos', async () => {
    const user = userEvent.setup()
    render(<GuiaForm guias={[]} onAddGuia={mockOnAddGuia} />)
    
    const submitButton = screen.getByRole('button', { name: /Registrar Guía/ })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('El número de guía es obligatorio')).toBeInTheDocument()
      expect(screen.getByText('El origen es obligatorio')).toBeInTheDocument()
      expect(screen.getByText('El destino es obligatorio')).toBeInTheDocument()
      expect(screen.getByText('El destinatario es obligatorio')).toBeInTheDocument()
    })
    
    expect(mockOnAddGuia).not.toHaveBeenCalled()
  })

  it('crea una nueva guía exitosamente', async () => {
    const user = userEvent.setup()
    render(<GuiaForm guias={[]} onAddGuia={mockOnAddGuia} />)
    
    // Llenar todos los campos
    await user.type(screen.getByLabelText(/Número de Guía/), 'GE002')
    await user.type(screen.getByLabelText(/Origen/), 'Cali')
    await user.type(screen.getByLabelText(/Destino/), 'Barranquilla')
    await user.type(screen.getByLabelText(/Destinatario/), 'María García')
    
    // Enviar formulario
    const submitButton = screen.getByRole('button', { name: /Registrar Guía/ })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnAddGuia).toHaveBeenCalledWith({
        numeroGuia: 'GE002',
        origen: 'Cali',
        destino: 'Barranquilla',
        destinatario: 'María García',
        fechaCreacion: expect.any(String),
        estado: 'Pendiente',
        historial: [{
          estado: 'Pendiente',
          fecha: expect.any(String),
          comentario: 'Guía creada'
        }]
      })
    })
  })
})
