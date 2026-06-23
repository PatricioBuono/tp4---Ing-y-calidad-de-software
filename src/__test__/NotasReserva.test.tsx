import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotasReserva from "../components/NotasReserva";

describe("NotasReserva - US14 Edición de Notas de Reserva", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });


});