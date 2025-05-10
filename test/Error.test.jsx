import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from '../src/components/Error';
import '@testing-library/jest-dom';

describe('Componente Error', () => {
  test('muestra el mensaje de error correctamente', () => {
    const mensaje = 'Este es un error de prueba';

    render(<Error>{mensaje}</Error>);

    // Verifica que el texto se haya renderizado
    expect(screen.getByText(mensaje)).toBeInTheDocument();
    expect(screen.getByText(mensaje).tagName).toBe('P');
    expect(screen.getByText(mensaje).parentElement).toHaveClass('bg-red-800');
  });
});
