import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
  AuthResponse,
  BillGetParameters,
  BillHistoryParameters,
  BillSearchParameters,
  ManifestCorrectionParameters,
  ManifestExistsResponse,
  ManifestSearchParameters,
  PackingGroups,
  QuickerSign,
  RcraCode,
  SiteSearchParameters,
  UserSearchParameters,
} from './types';

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

  // RCRAInfo Lookup Services

  public getStateWasteCodes = async (stateCode: string): Promise<AxiosResponse<RcraCode[]>> => {
    return this.apiClient.get(`v1/lookup/state-waste-codes/${stateCode}`);
  };

  public getFederalWasteCodes = async (): Promise<AxiosResponse<RcraCode[]>> => {
    return this.apiClient.get('v1/lookup/federal-waste-codes');
  };

  public getDensityUOMs = async (): Promise<AxiosResponse<RcraCode[]>> => {
    return this.apiClient.get('v1/lookup/density-uom');
  };

  public getSourceCodes = async (): Promise<AxiosResponse<RcraCode[]>> => {
    return this.apiClient.get('v1/lookup/source-codes');
  };

  public getManagementMethodCodes = async (): Promise<AxiosResponse<RcraCode[]>> => {
    return this.apiClient.get('v1/lookup/management-method-codes');
  };

  public getWasteMinimizationCodes = async (): Promise<AxiosResponse<RcraCode[]>> => {
    return this.apiClient.get('v1/lookup/waste-minimization-codes');
  };

  public getPortsOfEntry = async (): Promise<AxiosResponse<RcraCode[]>> => {
    return this.apiClient.get('v1/lookup/ports-of-entry');
  };

  // e-Manifest Lookup Services

  /**
   * Returns a list of all available DOT Hazard classes.
   * @param shippingName
   * @param idNumber
   */
  public getHazardClasses = async (
    shippingName?: string,
    idNumber?: string,
  ): Promise<AxiosResponse<string[] | string>> => {
    if (shippingName || idNumber) {
      // if either shippingName or idNumber is provided, attempt to get by shipping name and id number
      if (!shippingName || !idNumber) {
        // if only one is provided, throw an error
        throw new Error('Please provide both a shipping name and an ID number.');
      }
      return this.apiClient.get(
        `v1/emanifest/lookup/hazard-classes-by-shipping-name-id-number/${shippingName}/${idNumber}`,
      );
    }
    return this.apiClient.get('v1/emanifest/lookup/hazard-classes');
  };

  public getPackingGroups = async (
    shippingName?: string,
    idNumber?: string,
  ): Promise<AxiosResponse<string[] | string>> => {
    if (shippingName || idNumber) {
      // if either shippingName or idNumber is provided, attempt to get by shipping name and id number
      if (!shippingName || !idNumber) {
        // if only one is provided, throw an error
        throw new Error('Please provide both a shipping name and an ID number.');
      }
      return this.apiClient.get(
        `v1/emanifest/lookup/packing-groups-by-shipping-name-id-number/${shippingName}/${idNumber}`,
      );
    }
    return this.apiClient.get('v1/emanifest/lookup/packing-groups');
  };

  // Site Services

  public getSite = async (siteID: string): Promise<AxiosResponse> => {
    return this.apiClient.get(`v1/site-details/${siteID}`);
  };

  public getSiteExists = async (siteID: string): Promise<AxiosResponse<{ result: boolean; epaSiteId: string }>> => {
    return this.apiClient.get(`v1/site-exists/${siteID}`);
  };

  public searchSites = async (searchParameters: SiteSearchParameters): Promise<AxiosResponse<any>> => {
    return this.apiClient.post('v1/site-search', searchParameters);
  };

  // User Services

  public searchUsers = async (searchParameters: UserSearchParameters): Promise<AxiosResponse<any>> => {
    return this.apiClient.post('v1/user/user-search', searchParameters);
  };

  // e-Manifest Services

  public getBill = async (searchParameters: BillGetParameters): Promise<AxiosResponse<any>> => {
    return this.apiClient.post('v1/emanifest/billing/bill', searchParameters);
  };

  public searchBill = async (searchParameters: BillSearchParameters): Promise<AxiosResponse<any>> => {
    return this.apiClient.post('v1/emanifest/billing/bill-search', searchParameters);
  };

  public getBillHistory = async (searchParameters: BillHistoryParameters): Promise<AxiosResponse<any>> => {
    return this.apiClient.post('v1/emanifest/billing/bill-history', searchParameters);
  };

  // ToDo
  // public updateManifest = async (): Promise<AxiosResponse<any>> => {
  //   return this.apiClient.put('v1/emanifest/manifest/update');
  // };

  public deleteManifest = async (manifestTrackingNumber: string): Promise<AxiosResponse<any>> => {
    return this.apiClient.delete(`v1/emanifest/manifest/delete${manifestTrackingNumber}`);
  };

  // ToDo
  // public saveManifest = async (): Promise<AxiosResponse<any>> => {
  //   return this.apiClient.post('v1/emanifest/manifest/save');
  // };

  // ToDo
  // public getManifestAttachments = async (manifestTrackingNumber: string): Promise<AxiosResponse<any>> => {
  //   return this.apiClient.get(`v1/emanifest/manifest/${manifestTrackingNumber}/attachments`);
  // };

  public getManifestCorrections = async (manifestTrackingNumber: string): Promise<AxiosResponse<any>> => {
    return this.apiClient.get(`v1/emanifest/manifest/correction-details/${manifestTrackingNumber}`);
  };

  public getManifestCorrectionVersion = async (
    parameters: ManifestCorrectionParameters,
  ): Promise<AxiosResponse<any>> => {
    return this.apiClient.post('v1/emanifest/manifest/correction-version', parameters);
  };

  public getManifestCorrectionAttachments = async (
    parameters: ManifestCorrectionParameters,
  ): Promise<AxiosResponse<any>> => {
    return this.apiClient.post('v1/emanifest/manifest/correction-version/attachments', parameters);
  };

  public getMTN = async (siteID: string): Promise<AxiosResponse<any>> => {
    return this.apiClient.get(`v1/emanifest/manifest-tracking-numbers/${siteID}`);
  };

  public getSiteID = async (stateCode: string, siteType: string): Promise<AxiosResponse<any>> => {
    return this.apiClient.get(`v1/emanifest/site-ids/${stateCode}/${siteType}`);
  };

  public getManifest = async (manifestTrackingNumber: string): Promise<AxiosResponse<any>> => {
    return this.apiClient.get(`v1/emanifest/manifest/${manifestTrackingNumber}`);
  };

  public searchManifest = async (parameters: ManifestSearchParameters): Promise<AxiosResponse<any>> => {
    return this.apiClient.post('v1/emanifest/manifest/search', parameters);
  };

  public getMTNExists = async (manifestTrackingNumber: string): Promise<AxiosResponse<ManifestExistsResponse>> => {
    return this.apiClient.get(`v1/emanifest/manifest/mtn-exists/${manifestTrackingNumber}`);
  };

  public revertManifest = async (manifestTrackingNumber: string): Promise<AxiosResponse<any>> => {
    return this.apiClient.get(`v1/emanifest/manifest/revert/${manifestTrackingNumber}`);
  };

  public SignManifest = async (parameters: QuickerSign): Promise<AxiosResponse<any>> => {
    return this.apiClient.post('v1/emanifest/manifest/quicker-sign', parameters);
  };

  // ToDo
  // public correctManifest = async (): Promise<AxiosResponse<any>> => {
  //   return this.apiClient.post('v1/emanifest/manifest/correct');
  // };
}
