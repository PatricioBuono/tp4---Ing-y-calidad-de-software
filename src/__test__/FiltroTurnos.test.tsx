import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShiftFilters from "../components/FiltroTurnos"; // Asegúrate de que la ruta sea correcta según tu estructura de proyecto

describe("US10 - Filtro de turnos por estado", () => {
  // Escenario 1: Aplicación de filtro simple
  test('Escenario 1: Al filtrar por "Pendientes" debe ocultar visualmente los confirmados y cancelados en menos de 1.5s', async () => {
    render(<ShiftFilters />);

    // Verificamos que inicialmente aparezcan los turnos de prueba mixtos
    expect(screen.getByText("Carlos Mendoza")).toBeInTheDocument(); // Pendiente
    expect(screen.getByText("Ana Rodríguez")).toBeInTheDocument(); // Confirmado
    expect(screen.getByText("Luis Pertuz")).toBeInTheDocument(); // Cancelado

    // El Administrador hace clic sobre el filtro "Pendientes"
    const pendingFilterButton = screen.getByRole("button", {
      name: /Pendientes/i,
    });
    fireEvent.click(pendingFilterButton);

    // Verificación en un rango de tiempo menor a 1.5s (1500ms)
    await waitFor(
      () => {
        const currentShifts = screen.getAllByTestId("shift-item");
        // Solo deben quedar los 2 turnos con estado "Pendiente"
        expect(currentShifts).toHaveLength(2);
      },
      { timeout: 1500 },
    );

    // Confirmamos que permanecen los pendientes y desaparecieron los demás
    expect(screen.getByText("Carlos Mendoza")).toBeInTheDocument();
    expect(screen.getByText("Sofía Benítez")).toBeInTheDocument();
    expect(screen.queryByText("Ana Rodríguez")).not.toBeInTheDocument();
    expect(screen.queryByText("Luis Pertuz")).not.toBeInTheDocument();
  });

  // Escenario 2: Remoción de filtros
  test('Escenario 2: Al hacer clic en "Limpiar Filtros" se debe volver a renderizar la totalidad de los turnos', async () => {
    render(<ShiftFilters />);

    // 1. Aplicamos un filtro primero para aislar la vista
    const pendingFilterButton = screen.getByRole("button", {
      name: /Pendientes/i,
    });
    fireEvent.click(pendingFilterButton);

    // Verificamos que la vista se haya reducido
    expect(screen.getAllByTestId("shift-item")).toHaveLength(2);

    // 2. El Administrador hace clic en "Limpiar Filtros"
    const clearButton = screen.getByRole("button", {
      name: /Limpiar Filtros/i,
    });
    fireEvent.click(clearButton);

    // 3. Entonces vuelve a renderizar la totalidad de los turnos originales
    await waitFor(() => {
      const allShifts = screen.getAllByTestId("shift-item");
      expect(allShifts).toHaveLength(4);
    });

    // Se verifica que volvieron a aparecer los elementos previamente ocultos
    expect(screen.getByText("Ana Rodríguez")).toBeInTheDocument();
    expect(screen.getByText("Luis Pertuz")).toBeInTheDocument();
  });
});
