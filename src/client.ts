import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AuthResponse, PackingGroups } from './types';

export const RCRAINFO_PREPROD = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api';
export const RCRAINFO_PROD = 'https://rcrainfo.epa.gov/rcrainfo/rest/api';

export type RcrainfoEnv = typeof RCRAINFO_PREPROD | typeof RCRAINFO_PROD | string | undefined;

interface RcraClientConfig {
  apiBaseURL?: RcrainfoEnv;
  apiID?: string;
  apiKey?: string;
}

/**
 * Creates a new RcraClient object with the given configuration for use with the RCRAInfo API.
 * @param apiBaseURL
 * @param apiID
 * @param apiKey
 */
export const newClient = ({ apiBaseURL, apiID, apiKey }: RcraClientConfig = {}) => {
  return new RcraClient(apiBaseURL, apiID, apiKey);
};

/**
 * A client for the RCRAInfo API.
 */
class RcraClient {
  private apiClient: AxiosInstance;
  env: RcrainfoEnv;
  private apiID?: string;
  private apiKey?: string;
  token?: string;
  expiration?: string;

  constructor(apiBaseURL: RcrainfoEnv, apiID?: string, apiKey?: string) {
    this.env = apiBaseURL || RCRAINFO_PREPROD;
    this.apiID = apiID;
    this.apiKey = apiKey;
    this.apiClient = axios.create({
      baseURL: this.env,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    this.apiClient.interceptors.request.use(async (config) => {
      // if the request is for auth, don't add the token
      if (config.url?.includes('auth')) {
        return config;
      }
      if (!this.token) {
        if (!this.apiID || !this.apiKey) {
          // If there's no token and no apiID or apiKey, throw an error. We can't authenticate.
          throw new Error('Please API ID and Key to authenticate.');
        }
        // If there's no token, but there is an apiID and apiKey, try to authenticate.
        await this.authenticate().catch((err) => {
          throw new Error(`Received an error while attempting to authenticate: ${err}`);
        });
      }
      config.headers.Authorization = `Bearer ${this.token}`;
      return config;
    });
  }

  authenticate = async (): Promise<AxiosResponse<AuthResponse>> => {
    return this.apiClient
      .get(`v1/auth/${this.apiID}/${this.apiKey}`)
      .then((resp) => {
        if (resp.status === 200) {
          this.token = `${resp.data.token}`;
        }
        return resp;
      })
      .catch((err) => err);
  };

  /**
   * Returns true if the client has a valid token.
   */
  isAuthenticated = (): boolean => {
    return this.token !== undefined;
  };

  public getSite = async (siteID: string): Promise<AxiosResponse> => {
    return this.apiClient.get(`v1/site-details/${siteID}`);
  };

  public getHazardClasses = async (shippingName?: string, idNumber?: string): Promise<AxiosResponse> => {
    if (shippingName && idNumber) {
      return this.apiClient.get(
        `v1/emanifest/lookup/hazard-classes-by-shipping-name-id-number/${shippingName}/${idNumber}`,
      );
    }
    return this.apiClient.get('v1/emanifest/lookup/hazard-classes');
  };

  public getPackingGroups = async (): Promise<AxiosResponse<PackingGroups>> => {
    return this.apiClient.get('v1/emanifest/lookup/packing-groups');
  };
}
