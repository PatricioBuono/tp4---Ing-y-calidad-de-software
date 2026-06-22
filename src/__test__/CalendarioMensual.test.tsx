import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CalendarioMensual from "../components/CalendarioMensual";

describe("CalendarioMensual - US01 Navegación y vista por defecto", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-06-15T12:00:00"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("debe renderizar el mes y año actual por defecto", () => {
    render(<CalendarioMensual />);

    expect(
      screen.getByRole("heading", { name: /junio de 2026/i })
    ).toBeInTheDocument();
  });

  test("debe navegar al mes siguiente al hacer clic en 'Siguiente'", () => {
    render(<CalendarioMensual />);

    fireEvent.click(
      screen.getByRole("button", { name: /siguiente/i })
    );

    expect(
      screen.getByRole("heading", { name: /julio de 2026/i })
    ).toBeInTheDocument();
  });

  test("debe navegar al mes anterior al hacer clic en 'Anterior'", () => {
    render(<CalendarioMensual />);

    fireEvent.click(
      screen.getByRole("button", { name: /anterior/i })
    );

    expect(
      screen.getByRole("heading", { name: /mayo de 2026/i })
    ).toBeInTheDocument();
  });
});