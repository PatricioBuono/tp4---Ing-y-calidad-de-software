import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CancelarReserva from "../components/CancelarReserva";

describe("CancelarReserva - US18 Cancelar reserva", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("debe mostrar el modal de confirmación al hacer click en 'Cancelar'", () => {
    render(<CancelarReserva estadoInicial="Pendiente" />);

    fireEvent.click(screen.getByRole("button", { name: /^cancelar$/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText(/está seguro que desea cancelar esta reserva/i)
    ).toBeInTheDocument();
  });

  test("debe deshabilitar el botón 'Cancelar' si la reserva está en estado 'Completada'", () => {
    render(<CancelarReserva estadoInicial="Completada" />);

    expect(screen.getByRole("button", { name: /^cancelar$/i })).toBeDisabled();
  });

  test("debe actualizar la etiqueta a 'CANCELADA' al confirmar la cancelación", async () => {
    render(<CancelarReserva estadoInicial="Pendiente" />);

    fireEvent.click(screen.getByRole("button", { name: /^cancelar$/i }));
    fireEvent.click(screen.getByRole("button", { name: /^confirmar$/i }));

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId("etiqueta-estado")).toHaveTextContent("CANCELADA");
  });
});
