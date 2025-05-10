import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Formulario } from '../src/components/Formulario'; // Ajusta si tu archivo está en otra ruta
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
        paciente={{}}  // Aquí puedes poner un objeto vacío o un objeto con datos de paciente si lo necesitas
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
    window.alert = jest.fn();

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

 test('envía el formulario correctamente con datos válidos', () => {
  render(
    <Formulario
      pacientes={[]}
      setPacientes={mockSetPacientes}
      paciente={{}}  // Asegúrate de que el estado inicial esté correctamente configurado
      setPaciente={mockSetPaciente}
    />
  );

  fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Max' } });
  fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Luis' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'carlos@example.com' } });
  fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-05-10' } });
  fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Revisión general' } });

  const boton = screen.getByRole('button', { name: /Agregar paciente/i });
  fireEvent.click(boton);

  // Verifica que setPacientes haya sido llamado
  expect(mockSetPacientes).toHaveBeenCalledTimes(1);
  expect(mockSetPaciente).toHaveBeenCalledTimes(1);
});

test('permite editar un paciente existente', () => {
  const pacienteExistente = {
    //id: '123',
    nombre: 'Max',
    propietario: 'Luis',
    email: 'luis@example.com',
    fecha: '2025-05-15',
    observaciones: 'Dolor de oído'
  };

  render(
    <Formulario
      pacientes={[]}
      setPacientes={mockSetPacientes}
      paciente={pacienteExistente}  // Asegúrate de pasar el pacienteExistente correctamente
      setPaciente={mockSetPaciente}
    />
  );

  // Verifica que los campos se llenen con los valores de pacienteExistente
  expect(screen.getByLabelText(/Nombre Mascota/i).value).toBe('Max');
  expect(screen.getByLabelText(/Nombre Propietario/i).value).toBe('Luis'); // Asegúrate de que "Luis" es el valor correcto

  fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Mejorando' } });
  fireEvent.click(screen.getByRole('button', { name: /Editar paciente/i }));

  // Verifica que setPacientes sea llamado con los valores correctos
  expect(mockSetPacientes).toHaveBeenCalledWith(
    expect.arrayContaining([
      expect.objectContaining({
        //id: '123',
        nombre: 'Max',
        propietario: 'Luis',
        email: 'luis@example.com',
        fecha: '2025-05-15',
        observaciones: 'Mejorando' // Asegúrate de que "Mejorando" esté pasando correctamente
      })
    ])
  );
});


});
