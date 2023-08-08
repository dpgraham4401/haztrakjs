import { describe } from 'node:test';
import { newClient, RCRAINFO_PREPROD, RCRAINFO_PROD } from './client';

describe('RcraClient', () => {
  it('instantiates an object', () => {
    const client = newClient({ apiBaseURL: RCRAINFO_PREPROD });
    expect(typeof client).toBe('object');
    expect(typeof client.authenticate).toBe('function');
  });
  it('Does not auto-authenticate by default', () => {
    const client = newClient({ apiBaseURL: RCRAINFO_PREPROD });
    expect(typeof client.authenticate).toBe('function');
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
