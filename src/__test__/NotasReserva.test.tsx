import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotasReserva from "../components/NotasReserva";

describe("NotasReserva - US14 Edición de Notas de Reserva", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("debe mostrar mensaje de éxito y mantener el panel al guardar una nota válida de forma asíncrona", async () => {
    render(<NotasReserva notaInicial="Cliente prefiere café" />);

    const botonGuardar = screen.getByRole("button", { name: /guardar nota/i });
    fireEvent.click(botonGuardar);

    // Se verifica el estado de carga intermedio
    expect(screen.getByRole("button", { name: /guardando\.\.\./i })).toBeInTheDocument();

    // Adelantamos los temporizadores falsos de Jest para resolver la promesa asíncrona
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Validaciones de éxito (Criterio de Aceptación 1)
    expect(await screen.findByText("Nota guardada correctamente")).toBeInTheDocument();
    expect(screen.getByTestId("panel-detalles-reserva")).toBeInTheDocument();
  });

});