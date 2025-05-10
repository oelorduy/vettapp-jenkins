// Paciente.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Paciente from "../src/components/Paciente";
import '@testing-library/jest-dom';

describe("Paciente.jsx", () => {
  const mockPaciente = {
    nombre: "Luna",
    propietario: "Carlos",
    email: "carlos@example.com",
    fecha: "2025-05-10",
    observaciones: "Control general",
    id: "abc123",
  };

  const setPaciente = jest.fn();
  const eliminarPaciente = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe mostrar la información del paciente", () => {
    render(
      <Paciente
        paciente={mockPaciente}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
      />
    );

    expect(screen.getByText("Nombre:")).toBeInTheDocument();
    expect(screen.getByText("Luna")).toBeInTheDocument();
    expect(screen.getByText("Propietario:")).toBeInTheDocument();
    expect(screen.getByText("Carlos")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("carlos@example.com")).toBeInTheDocument();
    expect(screen.getByText("Fecha de Cita:")).toBeInTheDocument();
    expect(screen.getByText("2025-05-10")).toBeInTheDocument();
    expect(screen.getByText("Control general")).toBeInTheDocument();
  });

  it("debe ejecutar setPaciente al hacer clic en Editar", () => {
    render(
      <Paciente
        paciente={mockPaciente}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
      />
    );

    const btnEditar = screen.getByRole("button", { name: /editar/i });
    fireEvent.click(btnEditar);

    expect(setPaciente).toHaveBeenCalledWith(mockPaciente);
  });

  it("debe ejecutar eliminarPaciente si se confirma el diálogo", () => {
    window.confirm = jest.fn(() => true); // Simula confirm positivo

    render(
      <Paciente
        paciente={mockPaciente}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
      />
    );

    const btnEliminar = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(btnEliminar);

    expect(window.confirm).toHaveBeenCalledWith("Deseas eliminar este paciente?");
    expect(eliminarPaciente).toHaveBeenCalledWith("abc123");
  });

  it("no debe ejecutar eliminarPaciente si se cancela el diálogo", () => {
    window.confirm = jest.fn(() => false); // Simula cancelación

    render(
      <Paciente
        paciente={mockPaciente}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
      />
    );

    const btnEliminar = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(btnEliminar);

    expect(eliminarPaciente).not.toHaveBeenCalled();
  });
});