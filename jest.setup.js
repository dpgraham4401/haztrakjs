// src/setupTests.js
// Establish API mocking before all tests.
import { server } from './src/tests/mocks/server.js';

beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
