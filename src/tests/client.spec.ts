import { AxiosError, AxiosResponse } from 'axios';
import { MOCK_API_ID, MOCK_API_KEY, MOCK_PACKING_GROUPS, MOCK_TOKEN } from './mockConstants';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { newClient, RCRAINFO_PREPROD, RCRAINFO_PROD } from '../index';
// @ts-ignore
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('RcraClient', () => {
  it('instantiates an object', () => {
    const client = newClient({ apiBaseURL: RCRAINFO_PREPROD });
    expect(typeof client).toBe('object');
    expect(typeof client.authenticate).toBe('function');
  });
  it('Retrieves a token when authenticating', async () => {
    const client = newClient({ apiBaseURL: RCRAINFO_PREPROD, apiID: MOCK_API_ID, apiKey: MOCK_API_KEY });
    await client.authenticate();
    expect(client.token).toBe(MOCK_TOKEN);
  });
  it('Auto-authentication is disabled by default', async () => {
    const client = newClient({ apiBaseURL: RCRAINFO_PREPROD, apiID: MOCK_API_ID, apiKey: MOCK_API_KEY });
    await client.getPackingGroups().catch((err: AxiosError) => {
      expect(err.response?.status).toBe(401);
    });
  });
  it('Auto-authentication is requests a token first', async () => {
    const client = newClient({
      apiBaseURL: RCRAINFO_PREPROD,
      apiID: MOCK_API_ID,
      apiKey: MOCK_API_KEY,
      authAuth: true,
    });
    const resp: AxiosResponse = await client.getPackingGroups();
    expect(resp.data).toEqual(MOCK_PACKING_GROUPS);
  });
});

describe('emanifest package', () => {
  it('exports a URL constant RCRAINFO_PREPROD', () => {
    expect(RCRAINFO_PREPROD).toBeDefined();
  });
  it('exports a URL constant RCRAINFO_PROD', () => {
    expect(RCRAINFO_PROD).toBeDefined();
  });
});
