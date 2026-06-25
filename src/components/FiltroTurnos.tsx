"use client";

import React, { useState, useTransition } from "react";

// Interfaz para representar un turno básico del calendario
interface Shift {
  id: number;
  clientName: string;
  status: "Pendiente" | "Confirmado" | "Cancelado";
  time: string;
}

// Datos iniciales de prueba para el escenario base (estados mixtos)
const INITIAL_SHIFTS: Shift[] = [
  { id: 1, clientName: "Carlos Mendoza", status: "Pendiente", time: "09:00" },
  { id: 2, clientName: "Ana Rodríguez", status: "Confirmado", time: "10:30" },
  { id: 3, clientName: "Luis Pertuz", status: "Cancelado", time: "12:00" },
  { id: 4, clientName: "Sofía Benítez", status: "Pendiente", time: "15:00" },
];

export default function ShiftFilters() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Cambiar el filtro seleccionado de forma asíncrona / reactiva
  const handleFilterChange = (status: string) => {
    startTransition(() => {
      setSelectedStatus(status);
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      setSelectedStatus(null);
    });
  };

  // Filtrado de la lista en base a la selección del Administrador
  const filteredShifts = selectedStatus
    ? INITIAL_SHIFTS.filter((shift) => shift.status === selectedStatus)
    : INITIAL_SHIFTS;

  return (
    <div className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 rounded-xl max-w-xl mx-auto shadow-sm">
      {/* Barra Superior de Controles */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Filtros de estado"
        >
          <button
            onClick={() => handleFilterChange("Pendiente")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedStatus === "Pendiente"
                ? "bg-amber-100 text-amber-800 border-2 border-amber-500"
                : "bg-zinc-100 text-zinc-600 border border-transparent hover:bg-zinc-200"
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => handleFilterChange("Cancelado")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedStatus === "Cancelado"
                ? "bg-red-100 text-red-800 border-2 border-red-500"
                : "bg-zinc-100 text-zinc-600 border border-transparent hover:bg-zinc-200"
            }`}
          >
            Cancelados
          </button>
        </div>

        <button
          onClick={clearFilters}
          disabled={!selectedStatus}
          className="text-xs text-zinc-500 hover:text-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
        >
          Limpiar Filtros
        </button>
      </div>

      {/* Grilla / Contenedor de Turnos */}
      <div className="mt-4 space-y-2" aria-busy={isPending}>
        {filteredShifts.length === 0 ? (
          <p className="text-sm text-zinc-400 text-center py-4">
            No hay turnos para este estado.
          </p>
        ) : (
          filteredShifts.map((shift) => (
            <div
              key={shift.id}
              data-testid="shift-item"
              className="flex items-center justify-between p-3 border border-zinc-100 dark:border-zinc-800 rounded-lg text-sm"
            >
              <div>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {shift.clientName}
                </p>
                <p className="text-xs text-zinc-400">{shift.time} hs</p>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  shift.status === "Confirmado"
                    ? "bg-green-100 text-green-700"
                    : shift.status === "Pendiente"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {shift.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
