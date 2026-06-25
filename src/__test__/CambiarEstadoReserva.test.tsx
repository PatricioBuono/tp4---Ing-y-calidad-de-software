import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CambiarEstadoReserva from "../components/CambiarEstadoReserva";

describe("CambiarEstadoReserva - US17 Gestionar estado de reserva", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("debe desplegar los estados válidos al hacer click en 'Cambiar Estado'", () => {
    render(<CambiarEstadoReserva estadoInicial="Pendiente" />);

    fireEvent.click(screen.getByRole("button", { name: /cambiar estado/i }));

    expect(screen.getByRole("menuitem", { name: /estado pendiente/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /estado confirmada/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /estado completada/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /estado ausente/i })).toBeInTheDocument();
  });

  test("debe deshabilitar la opción del estado actual en el menú", () => {
    render(<CambiarEstadoReserva estadoInicial="Pendiente" />);

    fireEvent.click(screen.getByRole("button", { name: /cambiar estado/i }));

    expect(screen.getByRole("menuitem", { name: /estado pendiente/i })).toBeDisabled();
    expect(screen.getByRole("menuitem", { name: /estado confirmada/i })).not.toBeDisabled();
  });

  test("debe actualizar la etiqueta a CONFIRMADA tras seleccionar 'Confirmada' y esperar la persistencia", async () => {
    render(<CambiarEstadoReserva estadoInicial="Pendiente" />);

    fireEvent.click(screen.getByRole("button", { name: /cambiar estado/i }));
    fireEvent.click(screen.getByRole("menuitem", { name: /estado confirmada/i }));

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId("etiqueta-estado")).toHaveTextContent("CONFIRMADA");
  });
});
