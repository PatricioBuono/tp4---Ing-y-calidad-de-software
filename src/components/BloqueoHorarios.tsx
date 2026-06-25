"use client";

import React, { useState } from "react";

type EstadoSlot = "Libre" | "Bloqueado";

interface Slot {
  id: number;
  horario: string;
  estado: EstadoSlot;
}

const SLOTS_INICIALES: Slot[] = [
  { id: 1, horario: "09:00 - 10:00", estado: "Libre" },
  { id: 2, horario: "10:00 - 11:00", estado: "Libre" },
  { id: 3, horario: "11:00 - 12:00", estado: "Libre" },
];

export default function BloqueoHorarios() {
  const [slots, setSlots] = useState<Slot[]>(SLOTS_INICIALES);
  const [seleccionado, setSeleccionado] = useState<number | null>(null);

  const handleSeleccionar = (id: number) => {
    setSeleccionado(id);
  };

  const handleBloquear = () => {
    if (seleccionado === null) return;
    setSlots((prev) =>
      prev.map((s) =>
        s.id === seleccionado ? { ...s, estado: "Bloqueado" } : s
      )
    );
    setSeleccionado(null);
  };

  return (
    <div>
      <ul data-testid="lista-horarios">
        {slots.map((s) => (
          <li key={s.id}>
            <button
              aria-label={`Seleccionar horario ${s.horario}`}
              disabled={s.estado === "Bloqueado"}
              onClick={() => handleSeleccionar(s.id)}
            >
              {s.horario} - {s.estado === "Bloqueado" ? "🔒 Bloqueado" : "Libre"}
            </button>
          </li>
        ))}
      </ul>
      <button
        aria-label="Bloquear Horario"
        onClick={handleBloquear}
        disabled={seleccionado === null}
      >
        Bloquear Horario
      </button>
    </div>
  );
}
