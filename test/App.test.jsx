import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App'; // Ajusta la ruta según tu estructura
import '@testing-library/jest-dom';

describe('Componente App', () => {
  beforeEach(() => {
    // Simula datos en localStorage
    const pacientes = [
      { id: '1', nombre: 'Juan Pérez', propietario: 'Carlos', email: 'juan@mail.com', fecha: '2023-01-01', sintomas: 'Dolor de cabeza' }
    ];
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('debe renderizar el componente correctamente', () => {
    render(<App />);

    // Comprueba que el encabezado esté presente
    expect(screen.getByText('Seguimiento Pacientes')).toBeInTheDocument();

    // Comprueba que el paciente del localStorage está en pantalla
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();

    // Comprueba que el formulario esté visible
    expect(screen.getByText('Nombre Mascota')).toBeInTheDocument();
  });
});