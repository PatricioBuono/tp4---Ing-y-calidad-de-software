"use client";

import React, { useState } from "react";

interface NotasReservaProps {
  notaInicial?: string;
}

const NotasReserva: React.FC<NotasReservaProps> = ({ notaInicial = "" }) => {
  const [nota, setNota] = useState<string>(notaInicial);
  const [mensajeExito, setMensajeExito] = useState<string>("");
  const [mensajeError, setMensajeError] = useState<string>("");
  const [guardando, setGuardando] = useState<boolean>(false);

  const LIMITE_CARACTERES = 200;

  const manejarCambio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNota(e.target.value);
  };

  const guardarNota = async () => {
    setMensajeExito("");
    setMensajeError("");

    // Validación de campo vacío
    if (!nota.trim()) {
      setMensajeError("La nota no puede estar vacía");
      return;
    }

    // Validación de longitud máxima
    if (nota.length > LIMITE_CARACTERES) {
      setMensajeError("La nota excede el límite de caracteres permitido");
      return;
    }

    setGuardando(true);

    // Simulación de persistencia asíncrona (tiempo máximo 2.5s)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setGuardando(false);
    setMensajeExito("Nota guardada correctamente");
  };

  return (
    <div data-testid="panel-detalles-reserva" style={{ padding: "20px" }}>
      <h3>Información Adicional / Notas Internas</h3>
      
      <textarea
        aria-label="Notas internas"
        value={nota}
        onChange={manejarCambio}
        placeholder="Agregar notas internas sobre el cliente..."
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <div style={{ fontSize: "12px", marginBottom: "10px", color: nota.length > LIMITE_CARACTERES ? "red" : "gray" }}>
        Caracteres: {nota.length} / {LIMITE_CARACTERES}
      </div>

    {mensajeError && (
        <div role="alert" style={{ color: "red", display: "block", marginBottom: "10px" }}>
        {mensajeError}
        </div>
    )}

    {mensajeExito && (
        <div role="alert" style={{ color: "green", display: "block", marginBottom: "10px" }}>
        {mensajeExito}
        </div>
    )}

      <button
        aria-label="Guardar Nota"
        onClick={guardarNota}
        disabled={guardando}
        style={{ padding: "8px 16px", cursor: guardando ? "not-allowed" : "pointer" }}
      >
        {guardando ? "Guardando..." : "Guardar Nota"}
      </button>
    </div>
  );
};

export default NotasReserva;