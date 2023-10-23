// Polyfill "window.fetch" used in the React component.
import 'whatwg-fetch'

// Extend Jest "expect" functionality with Testing Library assertions.
import '@testing-library/jest-dom'

// Initilizing msw server to mock urls
import { server } from "@mocks/mockServer";

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => server.restoreHandlers());
afterAll(() => server.close());