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

    // Adelantamos los temporizadores falsos de Jest para resolver la promesa asíncrona (simulación <= 2.5s)
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Validaciones finales de éxito tras el procesamiento asíncrono
    expect(await screen.findByText("Nota guardada correctamente")).toBeInTheDocument();
    expect(screen.getByTestId("panel-detalles-reserva")).toBeInTheDocument();
  });

  test("debe mostrar alerta de error si el texto ingresado supera el límite de 200 caracteres", () => {
    render(<NotasReserva />);
    
    const textarea = screen.getByRole("textbox", { name: /notas internas/i });
    const textoExcedido = "a".repeat(201); // Genera 201 caracteres

    fireEvent.change(textarea, { target: { value: textoExcedido } });

    const botonGuardar = screen.getByRole("button", { name: /guardar nota/i });
    fireEvent.click(botonGuardar);

    // Validaciones de longitud (Criterio de Aceptación 3)
    expect(screen.getByRole("alert")).toHaveTextContent("La nota excede el límite de caracteres permitido");
  });

  test("debe mostrar alerta de error si el texto ingresado supera el límite de 200 caracteres", () => {
    render(<NotasReserva />);
    
    const textarea = screen.getByRole("textbox", { name: /notas internas/i });
    const textoExcedido = "a".repeat(201); // Genera 201 caracteres

    fireEvent.change(textarea, { target: { value: textoExcedido } });

    const botonGuardar = screen.getByRole("button", { name: /guardar nota/i });
    fireEvent.click(botonGuardar);

    // Validaciones de longitud (Criterio de Aceptación 3)
    expect(screen.getByRole("alert")).toHaveTextContent("La nota excede el límite de caracteres permitido");
  });

});