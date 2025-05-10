import React from 'react';
// Formulario.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Formulario } from "../components/Formulario"; // Ajusta la ruta si es diferente
import { clear } from '@testing-library/user-event/dist/cjs/utility/clear.js';

describe("Formulario.jsx", () => {
  const mockSetPacientes = jest.fn();
  const mockSetPaciente = jest.fn();

  beforeEach(() => {
    window.alert = jest.fn(); // Mockear alertas
    jest.clearAllMocks(); // Limpiar mocks entre tests
  });

  test("muestra alerta si nombre está vacío", () => {
    render(<Formulario pacientes={[]} setPacientes={mockSetPacientes} paciente={{}} setPaciente={mockSetPaciente} />);
    fireEvent.click(screen.getByRole("button", { name: /Agregar paciente/i }));
    expect(window.alert).toHaveBeenCalledWith("El campo nombre está vacío");
  });

  test("muestra alerta si propietario está vacío", () => {
    render(<Formulario pacientes={[]} setPacientes={mockSetPacientes} paciente={{}} setPaciente={mockSetPaciente} />);
    fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: "Max" } });
    fireEvent.click(screen.getByRole("button", { name: /Agregar paciente/i }));
    expect(window.alert).toHaveBeenCalledWith("El campo propietario está vacío");
  });

  test("muestra alerta si email está vacío", () => {
    render(<Formulario pacientes={[]} setPacientes={mockSetPacientes} paciente={{}} setPaciente={mockSetPaciente} />);
    fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: "Max" } });
    fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: "Luis" } });
    fireEvent.click(screen.getByRole("button", { name: /Agregar paciente/i }));
    expect(window.alert).toHaveBeenCalledWith("El campo email está vacío");
  });

  test("muestra alerta si el email tiene formato inválido", () => {
    render(<Formulario pacientes={[]} setPacientes={mockSetPacientes} paciente={{}} setPaciente={mockSetPaciente} />);
    fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: "Max" } });
    fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: "Luis" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "correo-invalido" } });
    fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: "2025-05-10" } });
    fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: "Chequeo" } });
    fireEvent.click(screen.getByRole("button", { name: /Agregar paciente/i }));
    expect(window.alert).toHaveBeenCalledWith("El email ingresado no es válido");
  });

  test("muestra alerta si la fecha es anterior a hoy", () => {
    render(<Formulario pacientes={[]} setPacientes={mockSetPacientes} paciente={{}} setPaciente={mockSetPaciente} />);
    fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: "Max" } });
    fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: "Luis" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "luis@mail.com" } });
    fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: "2020-01-01" } });
    fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: "Chequeo" } });
    fireEvent.click(screen.getByRole("button", { name: /Agregar paciente/i }));
    expect(window.alert).toHaveBeenCalledWith("La fecha no puede ser menor a la fecha actual");
  });

  test("muestra alerta si el campo observaciones está vacío", () => {
    render(<Formulario pacientes={[]} setPacientes={mockSetPacientes} paciente={{}} setPaciente={mockSetPaciente} />);
    fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: "Max" } });
    fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: "Luis" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "luis@mail.com" } });
    fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: "2025-05-10" } });
    fireEvent.click(screen.getByRole("button", { name: /Agregar paciente/i }));
    expect(window.alert).toHaveBeenCalledWith("El campo síntomas está vacío");
  });

  test("muestra alerta de éxito cuando se completa correctamente el formulario", () => {
    render(<Formulario pacientes={[]} setPacientes={mockSetPacientes} paciente={{}} setPaciente={mockSetPaciente} />);
    fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: "Max" } });
    fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: "Luis" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "luis@mail.com" } });
    fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: "2025-05-10" } });
    fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: "Chequeo general" } });
    fireEvent.click(screen.getByRole("button", { name: /Agregar paciente/i }));
    expect(window.alert).toHaveBeenCalledWith("Ingreso de Paciente Exitoso");
  });
});
clear