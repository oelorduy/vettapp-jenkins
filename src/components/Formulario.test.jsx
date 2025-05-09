import React from 'react';  // Agregar esta línea
import { render, screen, fireEvent } from '@testing-library/react';
import { Formulario } from './Formulario'; // Ajusta el path si es necesario
import '@testing-library/jest-dom';

describe('Formulario', () => {
  const mockSetPacientes = jest.fn();
  const mockSetPaciente = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza los campos del formulario', () => {
    render(
      <Formulario
        pacientes={[]}
        setPacientes={mockSetPacientes}
        paciente={{}}
        setPaciente={mockSetPaciente}
      />
    );

    expect(screen.getByLabelText(/Nombre Mascota/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre Propietario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha de Cita/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Observaciones/i)).toBeInTheDocument();
  });

  test('muestra alerta si se intenta enviar vacío', () => {
    window.alert = jest.fn(); // Mock de alert

    render(
      <Formulario
        pacientes={[]}
        setPacientes={mockSetPacientes}
        paciente={{}}
        setPaciente={mockSetPaciente}
      />
    );

    const boton = screen.getByRole('button', { name: /Agregar paciente/i });
    fireEvent.click(boton);

    expect(window.alert).toHaveBeenCalledWith('El campo nombre está vacío');
  });

  test('permite escribir en los campos', () => {
    render(
      <Formulario
        pacientes={[]}
        setPacientes={mockSetPacientes}
        paciente={{}}
        setPaciente={mockSetPaciente}
      />
    );

    const inputNombre = screen.getByLabelText(/Nombre Mascota/i);
    fireEvent.change(inputNombre, { target: { value: 'Firulais' } });

    expect(inputNombre.value).toBe('Firulais');
  });
});