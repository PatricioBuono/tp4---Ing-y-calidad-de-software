import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReagendamientoTurno from "../components/ReagendamientoTurno";

describe("ReagendamientoTurno - US15 Reagendamiento de turno", () => {
  const reservaInicial = {
    id: "R-100",
    fecha: "2026-06-25",
    hora: "10:00",
  };

  const horariosDisponibles = [
    { fecha: "2026-06-25", hora: "11:00" },
    { fecha: "2026-06-25", hora: "12:00" },
    { fecha: "2026-06-26", hora: "09:00" },
  ];

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("debe renderizar el formulario de cambio mostrando la fecha y hora original como comparativa", () => {
    render(
      <ReagendamientoTurno
        reservaInicial={reservaInicial}
        horariosDisponibles={horariosDisponibles}
      />
    );

    expect(screen.getByTestId("panel-reagendamiento-turno")).toBeInTheDocument();
    expect(screen.getByText(/reagendamiento de turno/i)).toBeInTheDocument();
    expect(screen.getByText(/reserva activa r-100/i)).toBeInTheDocument();
    expect(screen.getByText(/fecha 25\/06\/2026/i)).toBeInTheDocument();
    expect(screen.getByText(/horario 10:00/i)).toBeInTheDocument();
  });

  test("debe mostrar el mensaje de error cuando el administrador selecciona una franja ocupada", async () => {
    render(
      <ReagendamientoTurno
        reservaInicial={reservaInicial}
        horariosDisponibles={horariosDisponibles}
      />
    );

    fireEvent.change(screen.getByLabelText(/fecha nueva/i), {
      target: { value: "2026-06-27" },
    });
    fireEvent.change(screen.getByLabelText(/horario nuevo/i), {
      target: { value: "18:00" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /confirmar reagendamiento/i })
    );

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    const alerta = await screen.findByRole("alert");

    expect(alerta).toHaveTextContent(
      "No se puede reagendar la franja horaria. Existe una reserva activa en este horario"
    );
  });

  test("debe actualizar con éxito la interfaz cuando el horario elegido está libre", async () => {
    render(
      <ReagendamientoTurno
        reservaInicial={reservaInicial}
        horariosDisponibles={horariosDisponibles}
      />
    );

    fireEvent.change(screen.getByLabelText(/fecha nueva/i), {
      target: { value: "2026-06-26" },
    });
    fireEvent.change(screen.getByLabelText(/horario nuevo/i), {
      target: { value: "09:00" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /confirmar reagendamiento/i })
    );

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        /reagendamiento confirmado correctamente/i
      );
    });

    expect(screen.getByText(/fecha 26\/06\/2026/i)).toBeInTheDocument();
    expect(screen.getByText(/horario 09:00/i)).toBeInTheDocument();
  });
});