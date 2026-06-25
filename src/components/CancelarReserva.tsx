"use client";

import React, { useState } from "react";

type EstadoReserva = "Pendiente" | "Confirmada" | "Completada" | "Cancelada" | "Ausente";

interface CancelarReservaProps {
  estadoInicial?: EstadoReserva;
}

const CancelarReserva: React.FC<CancelarReservaProps> = ({
  estadoInicial = "Pendiente",
}) => {
  const [estado, setEstado] = useState<EstadoReserva>(estadoInicial);
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
  const [procesando, setProcesando] = useState<boolean>(false);

  const esCancelable = estado !== "Cancelada" && estado !== "Completada";

  const handleCancelar = () => {
    setModalAbierto(true);
  };

  const handleConfirmar = async () => {
    setProcesando(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEstado("Cancelada");
    setProcesando(false);
    setModalAbierto(false);
  };

  const handleVolver = () => {
    setModalAbierto(false);
  };

  return (
    <div data-testid="panel-cancelar-reserva" style={{ padding: "20px" }}>
      <h3>Cancelar Reserva</h3>

      <span data-testid="etiqueta-estado">{estado.toUpperCase()}</span>

      <button
        aria-label="Cancelar"
        onClick={handleCancelar}
        disabled={!esCancelable}
        style={{ marginTop: "10px", padding: "8px 16px", cursor: esCancelable ? "pointer" : "not-allowed" }}
      >
        Cancelar
      </button>

      {modalAbierto && (
        <div role="dialog" aria-modal="true" style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc" }}>
          <p>¿Está seguro que desea cancelar esta reserva? Esta acción liberará el turno.</p>

          <button
            aria-label="Confirmar"
            onClick={handleConfirmar}
            disabled={procesando}
            style={{ marginRight: "10px", padding: "8px 16px", cursor: procesando ? "not-allowed" : "pointer" }}
          >
            {procesando ? "Procesando..." : "Confirmar"}
          </button>

          <button
            aria-label="Volver"
            onClick={handleVolver}
            disabled={procesando}
            style={{ padding: "8px 16px", cursor: procesando ? "not-allowed" : "pointer" }}
          >
            Volver
          </button>
        </div>
      )}
    </div>
  );
};

export default CancelarReserva;
