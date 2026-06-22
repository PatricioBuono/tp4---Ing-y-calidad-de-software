"use client";

import React, { useState } from "react";

const CalendarioMensual: React.FC = () => {
  const [fecha, setFecha] = useState<Date>(new Date());

  const formatearMesAnio = (date: Date): string => {
    return date.toLocaleDateString("es-ES", {
      month: "long",
      year: "numeric",
    });
  };

  const irMesAnterior = () => {
    setFecha((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const irMesSiguiente = () => {
    setFecha((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const titulo =
    formatearMesAnio(fecha).charAt(0).toUpperCase() +
    formatearMesAnio(fecha).slice(1);

  return (
    <div>
      <button aria-label="Anterior" onClick={irMesAnterior}>
        Anterior
      </button>

      <h1>{titulo}</h1>

      <button aria-label="Siguiente" onClick={irMesSiguiente}>
        Siguiente
      </button>
    </div>
  );
};

export default CalendarioMensual;