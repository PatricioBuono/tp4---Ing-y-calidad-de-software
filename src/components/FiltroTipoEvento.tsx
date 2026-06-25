"use client";

import React, { useState } from "react";

type TipoEvento = "Consulta" | "Demo" | "Reunión";

interface Evento {
  id: number;
  cliente: string;
  tipo: TipoEvento;
}

const EVENTOS: Evento[] = [
  { id: 1, cliente: "Ana", tipo: "Consulta" },
  { id: 2, cliente: "Luis", tipo: "Demo" },
  { id: 3, cliente: "Eva", tipo: "Reunión" },
];

export default function FiltroTipoEvento() {
  const [filtro, setFiltro] = useState<TipoEvento | "Todos">("Todos");

  const visibles =
    filtro === "Todos" ? EVENTOS : EVENTOS.filter((e) => e.tipo === filtro);

  return (
    <div>
      <button aria-label="Filtrar Demos" onClick={() => setFiltro("Demo")}>
        Demos
      </button>
      <button
        aria-label="Limpiar filtro de tipo"
        onClick={() => setFiltro("Todos")}
      >
        Limpiar
      </button>
      <ul data-testid="lista-eventos">
        {visibles.map((e) => (
          <li key={e.id}>
            {e.cliente} - {e.tipo}
          </li>
        ))}
      </ul>
    </div>
  );
}
