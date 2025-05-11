import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Formulario from '../src/components/Formulario';
import { act } from 'react';

const setPacientesMock = jest.fn();
const setPacienteMock = jest.fn();

beforeEach(() => {
    global.alert = jest.fn();
    jest.clearAllMocks();
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Formulario', () => {
    const paciente = {
        id: '1',
        nombre: 'Luna',
        propietario: 'Carlos Perez',
        email: 'carlos@example.com',
        fecha: '2025-12-12',
        observaciones: 'Paciente con buena salud',
    };

    it('debería renderizar el formulario correctamente', () => {
        render(
       <Formulario
        pacientes={[]}
        setPacientes={setPacientesMock}
        paciente={{ nombre: '', propietario: '', email: '', fecha: '', observaciones: '' }}
        setPaciente={setPacienteMock}
       />
       );

        expect(screen.getByLabelText(/Nombre Mascota/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nombre Propietario/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Fecha de Cita/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Observaciones/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Agregar paciente/i })).toBeInTheDocument();
    });

    it('debería mostrar error si el campo nombre está vacío', async () => {
  // Mock de la función alert
  global.alert = jest.fn();

  render(
    <Formulario
      pacientes={[]}
      setPacientes={setPacientesMock}
      paciente={{ nombre: '', propietario: '', email: '', fecha: '', observaciones: '' }}
      setPaciente={setPacienteMock}
    />
  );

  // Cambiar los valores de los campos
  fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Juan Perez' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@example.com' } });
  fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
  fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

  // Hacer clic en el botón de agregar pacienteclear
  fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

  // Esperar que se haya llamado al alert con el mensaje correcto
  await waitFor(() => {
    expect(global.alert).toHaveBeenCalledWith('El campo nombre está vacío');
  });
});


    it('debería mostrar error si el campo propietario está vacío', async () => {
         render(
    <Formulario
      pacientes={[]}
      setPacientes={setPacientesMock}
      paciente={{ nombre: '', propietario: '', email: '', fecha: '', observaciones: '' }}
      setPaciente={setPacienteMock}
    />
  );

        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@example.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
    expect(global.alert).toHaveBeenCalledWith('El campo propietario está vacío');
  });
    });

     it('debería mostrar error si el email está vacío', async () => {
        render(
     <Formulario
      pacientes={[]}
      setPacientes={setPacientesMock}
      paciente={{ nombre: '', propietario: '', email: '', fecha: '', observaciones: '' }}
      setPaciente={setPacienteMock}
      />
      );

        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Juan Perez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('El campo email está vacío');
        });
    });

      it('debería mostrar error si el email es inválido', async () => {
        render(
    <Formulario
      pacientes={[]}
      setPacientes={setPacientesMock}
      paciente={{ nombre: '', propietario: '', email: '', fecha: '', observaciones: '' }}
      setPaciente={setPacienteMock}
    />
  );

        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Juan Perez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juanexample.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('El email ingresado no es válido');
        });
    });

   it('debería mostrar error si la fecha está vacía', async () => {
        render(
    <Formulario
      pacientes={[]}
      setPacientes={setPacientesMock}
      paciente={{ nombre: '', propietario: '', email: '', fecha: '', observaciones: '' }}
      setPaciente={setPacienteMock}
    />
  );

        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Juan Perez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@example.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('El campo fecha está vacío');
        });
    });

   it('debería mostrar error si la fecha es anterior a hoy', async () => {
        render(
    <Formulario
      pacientes={[]}
      setPacientes={setPacientesMock}
      paciente={{ nombre: '', propietario: '', email: '', fecha: '', observaciones: '' }}
      setPaciente={setPacienteMock}
    />
  );

        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Juan Perez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@example.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2022-01-01' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('La fecha no puede ser menor a la fecha actual');
        });
    });

    it('debería mostrar error si observaciones está vacío', async () => {
        render(
    <Formulario
      pacientes={[]}
      setPacientes={setPacientesMock}
      paciente={{ nombre: '', propietario: '', email: '', fecha: '', observaciones: '' }}
      setPaciente={setPacienteMock}
    />
  );

        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Juan Perez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@example.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: '' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('El campo observaciones está vacío');
        });
    });

    it('debería agregar paciente cuando el formulario es válido', async () => {
       render(
    <Formulario
      pacientes={[]}
      setPacientes={setPacientesMock}
      paciente={{ nombre: '', propietario: '', email: '', fecha: '', observaciones: '' }}
      setPaciente={setPacienteMock}
    />
  );

        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Ana Gomez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'ana@example.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(setPacientesMock).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({
                    nombre: 'Luna',
                    propietario: 'Ana Gomez',
                    email: 'ana@example.com',
                    fecha: '2025-12-12',
                    observaciones: 'Paciente saludable',
                }),
            ]));
        });
    });

   it('debería editar paciente cuando se envía formulario con paciente existente', async () => {
        render(
    <Formulario
      pacientes={[]}
      setPacientes={setPacientesMock}
      paciente={{ nombre: '', propietario: '', email: '', fecha: '', observaciones: '' }}
      setPaciente={setPacienteMock}
    />
  );

        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Ana Gomez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'ana@example.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(setPacientesMock).toHaveBeenCalled();
            const llamadas = setPacientesMock.mock.calls;
            const pacientesActualizados = llamadas[0][0];

            expect(pacientesActualizados).toEqual(expect.arrayContaining([
  expect.objectContaining({
    nombre: 'Luna',
    propietario: 'Ana Gomez',
    email: 'ana@example.com',
    fecha: '2025-12-12',
    observaciones: 'Paciente saludable',
  })
]));
        });
    });

});
