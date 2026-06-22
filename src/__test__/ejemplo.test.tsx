import { render, screen } from '@testing-library/react'

describe('Prueba base del entorno', () => {
  it('debería pasar este test básico', () => {
    render(<h1>¡Entorno de test configurado!</h1>)
    const elemento = screen.getByText('¡Entorno de test configurado!')
    expect(elemento).toBeInTheDocument()
  })
})