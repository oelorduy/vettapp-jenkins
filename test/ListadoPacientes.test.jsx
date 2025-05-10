import { render, screen } from '@testing-library/react';
import ListadoPacientes from '../src/components/ListadoPacientes';
import React from 'react';
import '@testing-library/jest-dom';

describe('ListadoPacientes', () => {
  const setPaciente = jest.fn();
  const eliminarPaciente = jest.fn();

  test('debe mostrar el listado de pacientes cuando hay pacientes', () => {
    // Datos de ejemplo
    const pacientes = [
      { id: '1', nombre: 'Juan Pérez', edad: 30 },
      { id: '2', nombre: 'Ana Gómez', edad: 40 },
    ];

    render(
      <ListadoPacientes
        pacientes={pacientes}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
      />
    );

    // Verificar que el título de la sección esté presente
    expect(screen.getByText('Listado Pacientes')).toBeInTheDocument();
    
    // Verificar que cada paciente aparece en el listado
    pacientes.forEach((paciente) => {
      expect(screen.getByText(paciente.nombre)).toBeInTheDocument();
    });
    
    // Verificar que el botón de eliminar o la funcionalidad de eliminación está disponible
    // (Esto depende de cómo implementes los botones en el componente Paciente)
  });

  test('debe mostrar mensaje cuando no hay pacientes', () => {
    render(
      <ListadoPacientes
        pacientes={[]}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
      />
    );

    // Verificar que el mensaje "No hay pacientes" se muestra
    expect(screen.getByText('No hay pacientes')).toBeInTheDocument();

    // Verificar que se muestra el mensaje de asignar cita
    expect(
      screen.getByText('Asigna cita y aparecerán en este lugar')
    ).toBeInTheDocument();
  });
});
