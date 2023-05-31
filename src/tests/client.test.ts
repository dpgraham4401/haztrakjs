import { API_ID, API_KEY } from './constants';
import { RCRAINFO_PREPROD, RCRAINFO_PROD, newClient } from '../index';

describe('RcraClient', () => {
  test('RCRAINFO_PREPROD is defined', () => {
    expect(RCRAINFO_PREPROD).toBeDefined();
  });
  test('RCRAINFO_PROD is defined', () => {
    expect(RCRAINFO_PROD).toBeDefined();
  });
  test('instantiates', () => {
    const client = newClient({ apiBaseURL: RCRAINFO_PREPROD });
    expect(typeof client).toBe('object');
  });
  test('Uses PreProd by default', () => {
    const client = newClient();
    expect(client.env).toBe(RCRAINFO_PREPROD);
  });
  test('Retrieves a token', async () => {
    const client = newClient({
      apiBaseURL: RCRAINFO_PREPROD,
      apiID: 'apiID',
      apiKey: 'apiKey',
    });
    await client.authenticate();
    expect(client.token).toBe('myToken');
  });
  test('isAuthenticated is updated after authenticate', async () => {
    const client = newClient({
      apiBaseURL: RCRAINFO_PREPROD,
      apiID: API_ID,
      apiKey: API_KEY,
    });
    expect(client.isAuthenticated()).toBe(false);
    await client.authenticate();
    expect(client.isAuthenticated()).toBe(true);
  });
  test('Bearer token is added to requests', async () => {
    const client = newClient({
      apiBaseURL: RCRAINFO_PREPROD,
      apiID: API_ID,
      apiKey: API_KEY,
    });
    await client.authenticate();
    // Our mock service worker will return a 401 if the Authorization header is not === 'Bearer myToken'
    const resp = await client.getPackingGroups();
    expect(resp.status).toBe(200);
  });
  test('automatically authenticates', async () => {
    const client = newClient({
      apiBaseURL: RCRAINFO_PREPROD,
      apiID: API_ID,
      apiKey: API_KEY,
    });
    // Our mock service worker will return a 401 if the Authorization header is not === 'Bearer myToken'
    const resp = await client.getPackingGroups();
    expect(resp.status).toBe(200);
  });
});
