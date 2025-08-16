
import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '@/hooks/use-local-storage'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

// Sobrescribir el mock global para este test
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useLocalStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('inicializa con el valor por defecto cuando localStorage está vacío', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    expect(result.current[0]).toBe('default-value')
    expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key')
  })

  it('guarda valores en localStorage al actualizar', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    act(() => {
      result.current[1]('new-value')
    })
    
    expect(result.current[0]).toBe('new-value')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'))
  })

  it('maneja objetos complejos', () => {
    const complexObject = { name: 'test', count: 5, items: ['a', 'b', 'c'] }
    const { result } = renderHook(() => useLocalStorage('test-key', null))
    
    act(() => {
      result.current[1](complexObject)
    })
    
    expect(result.current[0]).toEqual(complexObject)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(complexObject))
  })
})
