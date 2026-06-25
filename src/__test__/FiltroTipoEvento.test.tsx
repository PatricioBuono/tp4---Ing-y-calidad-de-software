import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FiltroTipoEvento from "../components/FiltroTipoEvento";

describe("FiltroTipoEvento - US16 Filtro por Tipo de Evento", () => {

  // Prueba 1: muestra todos los eventos al iniciar, sin filtro aplicado
  test("muestra los 3 eventos al iniciar", () => {
    render(<FiltroTipoEvento />);
    const lista = screen.getByTestId("lista-eventos");
    expect(lista.children).toHaveLength(3);
  });

  // Prueba 2: al filtrar por "Demos" solo queda el evento de ese tipo
  test("filtra y muestra solo los eventos de tipo Demo", () => {
    render(<FiltroTipoEvento />);
    fireEvent.click(screen.getByRole("button", { name: /filtrar demos/i }));
    const lista = screen.getByTestId("lista-eventos");
    expect(lista.children).toHaveLength(1);
    expect(lista).toHaveTextContent("Luis");
  });

  // Prueba 3: al limpiar el filtro, vuelven a verse todos los eventos
  test("vuelve a mostrar todos los eventos al limpiar el filtro", () => {
    render(<FiltroTipoEvento />);
    fireEvent.click(screen.getByRole("button", { name: /filtrar demos/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /limpiar filtro de tipo/i })
    );
    const lista = screen.getByTestId("lista-eventos");
    expect(lista.children).toHaveLength(3);
  });
});
