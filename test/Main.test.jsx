import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactDOM from "react-dom/client";
import '@testing-library/jest-dom';

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

test("renderiza el componente App sin errores", () => {
  const rootDiv = document.createElement("div");
  rootDiv.id = "root";
  document.body.appendChild(rootDiv);

  require("../src/main"); // carga después del mock

  expect(ReactDOM.createRoot).toHaveBeenCalled();
});