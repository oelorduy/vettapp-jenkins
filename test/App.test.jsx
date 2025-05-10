import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App"; // ajusta el path según tu estructura
import '@testing-library/jest-dom';
// Simular datos en localStorage antes de cada prueba
beforeEach(() => {
  const pacientesMock = [
    {
      id: "1",
      nombre: "Juan Pérez",
      propietario: "Carlos",
      email: "juan@mail.com",
      fecha: "2023-01-01",
      observaciones: "Control anual",
    },
  ];
  localStorage.setItem("pacientes", JSON.stringify(pacientesMock));
});

afterEach(() => {
  localStorage.clear();
});

test("debe renderizar el componente correctamente", () => {
  render(<App />);
  expect(screen.getByText(/Modulo de Citas/i)).toBeInTheDocument();
  expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
  expect(screen.getByText("Carlos")).toBeInTheDocument();
  expect(screen.getByText("juan@mail.com")).toBeInTheDocument();
  expect(screen.getByText("2023-01-01")).toBeInTheDocument();
});

test("debe eliminar un paciente", async () => {
  render(<App />);
  const botonEliminar = screen.getByRole("button", { name: /eliminar/i });
  await userEvent.click(botonEliminar);
  expect(screen.queryByText("Juan Pérez")).not.toBeInTheDocument();
});

test("debe editar un paciente", async () => {
  render(<App />);
  const botonEditar = screen.getByRole("button", { name: /editar/i });
  await userEvent.click(botonEditar);

  const inputNombre = screen.getByLabelText(/Nombre Mascota/i);
  expect(inputNombre).toHaveValue("Juan Pérez");

  const inputPropietario = screen.getByLabelText(/Nombre Propietario/i);
  expect(inputPropietario).toHaveValue("Carlos");

  const inputEmail = screen.getByLabelText(/Email/i);
  expect(inputEmail).toHaveValue("juan@mail.com");
});

test("debe agregar un nuevo paciente", async () => {
  render(<App />);
  const inputNombre = screen.getByLabelText(/Nombre Mascota/i);
  const inputPropietario = screen.getByLabelText(/Nombre Propietario/i);
  const inputEmail = screen.getByLabelText(/Email/i);
  const inputFecha = screen.getByLabelText(/Fecha de Cita/i);
  const inputObs = screen.getByLabelText(/Observaciones/i);
  const btnSubmit = screen.getByRole("button", { name: /agregar paciente/i });

  await userEvent.clear(inputNombre);
  await userEvent.type(inputNombre, "Luna");
  await userEvent.type(inputPropietario, "Ana");
  await userEvent.type(inputEmail, "luna@mail.com");
  await userEvent.type(inputFecha, "2025-05-10");
  await userEvent.type(inputObs, "Chequeo general");

  await userEvent.click(btnSubmit);

  expect(screen.getByText("Luna")).toBeInTheDocument();
  expect(screen.getByText("Ana")).toBeInTheDocument();
  expect(screen.getByText("luna@mail.com")).toBeInTheDocument();
  expect(screen.getByText("2025-05-10")).toBeInTheDocument();
});

test("debe mostrar mensaje de error si se envía el formulario vacío", async () => {
  render(<App />);
  const btnSubmit = screen.getByRole("button", { name: /agregar paciente/i });

  await userEvent.click(btnSubmit);

  expect(
    screen.getByText(/todos los campos son obligatorios/i)
  ).toBeInTheDocument();
});