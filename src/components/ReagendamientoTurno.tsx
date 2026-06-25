"use client";

import React, { useEffect, useMemo, useState } from "react";

interface ReservaTurno {
  id: string;
  fecha: string;
  hora: string;
}

interface HorarioDisponible {
  fecha: string;
  hora: string;
}

export interface ReagendamientoTurnoProps {
  reservaInicial: ReservaTurno;
  horariosDisponibles: HorarioDisponible[];
}

const MENSAJE_ERROR_OCUPADO =
  "No se puede reagendar la franja horaria. Existe una reserva activa en este horario";

function normalizarFechaParaInput(fecha: string): string {
  if (fecha.includes("T")) {
    return fecha.slice(0, 10);
  }

  return fecha;
}

function formatearFecha(fecha: string): string {
  const normalizada = normalizarFechaParaInput(fecha);
  if (!normalizada) {
    return "";
  }

  const partes = normalizada.split("-");
  if (partes.length !== 3) {
    return fecha;
  }

  const [anio, mes, dia] = partes;
  return `${dia}/${mes}/${anio}`;
}

const ReagendamientoTurno: React.FC<ReagendamientoTurnoProps> = ({
  reservaInicial,
  horariosDisponibles = [],
}) => {
  const fechaInicial = normalizarFechaParaInput(reservaInicial.fecha);
  const [reservaActual, setReservaActual] = useState<ReservaTurno>(reservaInicial);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(fechaInicial);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>(reservaInicial.hora);
  const [cargando, setCargando] = useState<boolean>(false);
  const [mensajeExito, setMensajeExito] = useState<string>("");
  const [mensajeError, setMensajeError] = useState<string>("");

  const horariosDelDia = useMemo<HorarioDisponible[]>(() => {
    return horariosDisponibles.filter(
      (horario) => horario.fecha === fechaSeleccionada
    );
  }, [horariosDisponibles, fechaSeleccionada]);

  useEffect(() => {
    if (horariosDelDia.length === 0) {
      setHoraSeleccionada("");
      return;
    }

    const horaValida = horariosDelDia.some(
      (horario) => horario.hora === horaSeleccionada
    );

    if (!horaValida) {
      setHoraSeleccionada(horariosDelDia[0].hora);
    }
  }, [horariosDelDia, horaSeleccionada]);

  const manejarConfirmacion = async (): Promise<void> => {
    setMensajeError("");
    setMensajeExito("");

    const horarioExiste = horariosDisponibles.some(
      (horario) =>
        horario.fecha === fechaSeleccionada && horario.hora === horaSeleccionada
    );

    if (!horarioExiste) {
      setMensajeError(MENSAJE_ERROR_OCUPADO);
      return;
    }

    setCargando(true);

    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    setReservaActual((reservaAnterior) => ({
      ...reservaAnterior,
      fecha: fechaSeleccionada,
      hora: horaSeleccionada,
    }));
    setCargando(false);
    setMensajeExito("Reagendamiento confirmado correctamente");
  };

  return (
    <section
      data-testid="panel-reagendamiento-turno"
      className="flex w-full max-w-2xl flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          AgendaYA
        </p>
        <h3 className="text-2xl font-semibold text-zinc-900">
          Reagendamiento de turno
        </h3>
        <p className="text-sm text-zinc-600">
          Reserva activa {reservaActual.id} con fecha {formatearFecha(reservaActual.fecha)} y horario {reservaActual.hora}.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
          Fecha nueva
          <input
            aria-label="Fecha nueva"
            type="date"
            value={fechaSeleccionada}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFechaSeleccionada(event.target.value)
            }
            className="rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none transition focus:border-zinc-900"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
          Horario nuevo
          <select
            aria-label="Horario nuevo"
            value={horaSeleccionada}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setHoraSeleccionada(event.target.value)
            }
            className="rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none transition focus:border-zinc-900"
          >
            <option value="">Seleccionar horario</option>
            {horariosDelDia.map((horario) => (
              <option key={`${horario.fecha}-${horario.hora}`} value={horario.hora}>
                {horario.hora}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={manejarConfirmacion}
          disabled={cargando}
          className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {cargando ? "Confirmando..." : "Confirmar Reagendamiento"}
        </button>
      </div>

      {mensajeError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {mensajeError}
        </div>
      )}

      {mensajeExito && (
        <div
          role="status"
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          {mensajeExito}
        </div>
      )}
    </section>
  );
};

export default ReagendamientoTurno;