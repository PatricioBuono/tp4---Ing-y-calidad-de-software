import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Proporciona la ruta a tu aplicación Next.js para cargar la configuración de Next.js
  dir: './',
})

// Configuración personalizada de Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  // Configuración para que reconozca los matchers de testing-library
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

// createJestConfig se exporta de esta manera para asegurar que next/jest pueda cargar la configuración de Next.js de forma asíncrona
export default createJestConfig(config)