import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BloqueoHorarios from "../components/BloqueoHorarios";

describe("BloqueoHorarios - US02 Bloqueo de Horarios y Disponibilidad", () => {

  // Prueba 1: muestra los horarios libres al iniciar
  test("muestra los 3 horarios como libres al iniciar", () => {
    render(<BloqueoHorarios />);
    const lista = screen.getByTestId("lista-horarios");
    expect(lista.children).toHaveLength(3);
    expect(lista).not.toHaveTextContent("Bloqueado");
  });

  // Prueba 2: al seleccionar un horario y confirmar, queda bloqueado
  test("bloquea el horario seleccionado", () => {
    render(<BloqueoHorarios />);
    fireEvent.click(
      screen.getByRole("button", { name: /seleccionar horario 09:00 - 10:00/i })
    );
    fireEvent.click(screen.getByRole("button", { name: /bloquear horario/i }));
    const lista = screen.getByTestId("lista-horarios");
    expect(lista).toHaveTextContent("Bloqueado");
  });

  // Prueba 3: un horario bloqueado no puede volver a seleccionarse/reservarse
  test("un horario bloqueado queda inhabilitado para nuevas reservas", () => {
    render(<BloqueoHorarios />);
    const botonHorario = screen.getByRole("button", {
      name: /seleccionar horario 09:00 - 10:00/i,
    });
    fireEvent.click(botonHorario);
    fireEvent.click(screen.getByRole("button", { name: /bloquear horario/i }));
    expect(botonHorario).toBeDisabled();
  });
});
