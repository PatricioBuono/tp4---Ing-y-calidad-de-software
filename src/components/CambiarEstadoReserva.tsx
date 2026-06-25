"use client";

import React, { useState } from "react";

type EstadoReserva = "Pendiente" | "Confirmada" | "Completada" | "Ausente" | "Cancelada";

const ESTADOS_VALIDOS: EstadoReserva[] = ["Pendiente", "Confirmada", "Completada", "Ausente"];

interface CambiarEstadoReservaProps {
  estadoInicial?: EstadoReserva;
}

const CambiarEstadoReserva: React.FC<CambiarEstadoReservaProps> = ({
  estadoInicial = "Pendiente",
}) => {
  const [estado, setEstado] = useState<EstadoReserva>(estadoInicial);
  const [menuAbierto, setMenuAbierto] = useState<boolean>(false);
  const [guardando, setGuardando] = useState<boolean>(false);
  const [mensajeError, setMensajeError] = useState<string>("");

  const handleCambiarEstado = () => {
    if (estado === "Cancelada") {
      setMensajeError("No se puede cambiar el estado de una reserva cancelada");
      return;
    }
    setMensajeError("");
    setMenuAbierto(true);
  };

  const handleSeleccionarEstado = async (nuevoEstado: EstadoReserva) => {
    setMenuAbierto(false);
    setGuardando(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setEstado(nuevoEstado);
    setGuardando(false);
  };

  return (
    <div data-testid="panel-estado-reserva" style={{ padding: "20px" }}>
      <h3>Estado de la Reserva</h3>

      <span data-testid="etiqueta-estado">{estado.toUpperCase()}</span>

      {mensajeError && (
        <div role="alert" style={{ color: "red", marginTop: "10px" }}>
          {mensajeError}
        </div>
      )}

      <button
        aria-label="Cambiar Estado"
        onClick={handleCambiarEstado}
        disabled={guardando}
        style={{ marginTop: "10px", padding: "8px 16px", cursor: guardando ? "not-allowed" : "pointer" }}
      >
        {guardando ? "Guardando..." : "Cambiar Estado"}
      </button>

      {menuAbierto && (
        <ul role="menu" style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
          {ESTADOS_VALIDOS.map((opcion) => (
            <li key={opcion}>
              <button
                role="menuitem"
                aria-label={`Estado ${opcion}`}
                disabled={opcion === estado}
                onClick={() => handleSeleccionarEstado(opcion)}
                style={{
                  display: "block",
                  padding: "8px 16px",
                  cursor: opcion === estado ? "not-allowed" : "pointer",
                  opacity: opcion === estado ? 0.5 : 1,
                }}
              >
                {opcion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CambiarEstadoReserva;
