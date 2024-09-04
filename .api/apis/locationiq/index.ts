import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'locationiq/1.5.0 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * The Search API allows converting addresses, such as a street address, into geographic
   * coordinates (latitude and longitude). These coordinates can serve various use-cases,
   * from placing markers on a map to helping algorithms determine nearby bus stops. This
   * process is also known as Forward Geocoding.
   *
   * @summary Free Form Query
   * @throws FetchError<400, types.SearchResponse400> Bad Request
   * @throws FetchError<401, types.SearchResponse401> Unauthorized
   * @throws FetchError<403, types.SearchResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<404, types.SearchResponse404> No location or places were found for the given input.
   * @throws FetchError<429, types.SearchResponse429> Request exceeded the rate-limits set on your account.
   * @throws FetchError<500, types.SearchResponse500> Internal Server Error
   */
  search(metadata: types.SearchMetadataParam): Promise<FetchResponse<200, types.SearchResponse200>> {
    return this.core.fetch('/search', 'get', metadata);
  }

  /**
   * Structured Query offers a more specific way to search for locations. Instead of using a
   * single text string, you can provide distinct address components in a structured format.
   * This includes specifying elements like street, neighborhood, city, state, country, and
   * postal code, each sent as separate API parameters.
   *
   * @summary Structured Geocoding
   * @throws FetchError<400, types.SearchStructuredResponse400> Bad Request
   * @throws FetchError<401, types.SearchStructuredResponse401> Unauthorized
   * @throws FetchError<403, types.SearchStructuredResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<404, types.SearchStructuredResponse404> No location or places were found for the given input.
   * @throws FetchError<429, types.SearchStructuredResponse429> Request exceeded the rate-limits set on your account.
   * @throws FetchError<500, types.SearchStructuredResponse500> Internal Server Error
   */
  searchStructured(metadata?: types.SearchStructuredMetadataParam): Promise<FetchResponse<200, types.SearchStructuredResponse200>> {
    return this.core.fetch('/search/structured', 'get', metadata);
  }

  /**
   * Postal Address Lookup streamlines the task of locating details when only a postal code
   * match is necessary. It’s particularly useful when you want to fetch location information
   * without handling complete addresses.
   *
   * @summary Postal Code Search
   * @throws FetchError<400, types.SearchPostalcodeResponse400> Bad Request
   * @throws FetchError<401, types.SearchPostalcodeResponse401> Unauthorized
   * @throws FetchError<403, types.SearchPostalcodeResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<404, types.SearchPostalcodeResponse404> No location or places were found for the given input.
   * @throws FetchError<429, types.SearchPostalcodeResponse429> Request exceeded the rate-limits set on your account.
   * @throws FetchError<500, types.SearchPostalcodeResponse500> Internal Server Error
   */
  searchPostalcode(metadata: types.SearchPostalcodeMetadataParam): Promise<FetchResponse<200, types.SearchPostalcodeResponse200>> {
    return this.core.fetch('/search/postalcode', 'get', metadata);
  }

  /**
   * Reverse geocoding is the process of converting a coordinate or location (latitude,
   * longitude) to a readable address or place name. This permits the identification of
   * nearby street addresses, places, and/or area subdivisions such as a neighborhood,
   * county, state, or country.
   *
   * @summary Reverse Geocoding
   * @throws FetchError<400, types.ReverseResponse400> Bad Request
   * @throws FetchError<401, types.ReverseResponse401> Unauthorized
   * @throws FetchError<403, types.ReverseResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<404, types.ReverseResponse404> No location or places were found for the given input.
   * @throws FetchError<429, types.ReverseResponse429> Request exceeded the rate-limits set on your account.
   * @throws FetchError<500, types.ReverseResponse500> Internal Server Error
   */
  reverse(metadata: types.ReverseMetadataParam): Promise<FetchResponse<200, types.ReverseResponse200>> {
    return this.core.fetch('/reverse', 'get', metadata);
  }

  /**
   * The Autocomplete API is a variant of the Search API that returns place predictions in
   * response to an HTTP request. The request specifies a textual search string and optional
   * geographic bounds. The service can be used to provide autocomplete functionality for
   * text-based geographic searches, by returning places such as businesses, addresses and
   * points of interest as a user types. 
   *
   * The Autocomplete API can match on full words as well as substrings. Applications can
   * therefore send queries as the user types, to provide on-the-fly place predictions.
   *
   * <a href="https://locationiq.com/demo#autocomplete" target="_blank">Try this API in our
   * Playground</a>
   *
   * > If you use Leaflet for your maps, you add LocationIQ's Autocomplete as a plugin
   * instantly! You can <a href="https://github.com/location-iq/leaflet-geocoder"
   * target="_blank">view instructions here</a>. You can also view a <a
   * href="https://maps.locationiq.com" target="_blank">live demo here</a>.
   *
   * > The Autocomplete API endpoint (https://api.locationiq.com/v1) offers an Anycast IP
   * address and route user requests to a datacenter closest to them. You can still manually
   * specify a `region` similar to other LocationIQ endpoints, but in the interest of
   * end-user experience, we don't recommended such a configuration.
   *
   * @summary Autocomplete
   * @throws FetchError<400, types.AutocompleteResponse400> Bad Request
   * @throws FetchError<401, types.AutocompleteResponse401> Unauthorized
   * @throws FetchError<403, types.AutocompleteResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<404, types.AutocompleteResponse404> No location or places were found for the given input.
   * @throws FetchError<429, types.AutocompleteResponse429> Request exceeded the rate-limits set on your account.
   * @throws FetchError<500, types.AutocompleteResponse500> Internal Server Error
   */
  autocomplete(metadata: types.AutocompleteMetadataParam): Promise<FetchResponse<200, types.AutocompleteResponse200>> {
    return this.core.fetch('/autocomplete', 'get', metadata);
  }

  /**
   * The lookup API allows querying the address and other details of one or multiple OSM
   * objects, such as nodes, ways, or relations.
   *
   * @summary Lookup
   * @throws FetchError<400, types.LookupResponse400> Bad Request
   * @throws FetchError<401, types.LookupResponse401> Unauthorized
   * @throws FetchError<403, types.LookupResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<404, types.LookupResponse404> No location or places were found for the given input.
   * @throws FetchError<500, types.LookupResponse500> Internal Server Error
   */
  lookup(metadata: types.LookupMetadataParam): Promise<FetchResponse<200, types.LookupResponse200>> {
    return this.core.fetch('/lookup', 'get', metadata);
  }

  /**
   * Finds the fastest route between coordinates in the supplied order.
   *
   * @summary Directions Service
   * @throws FetchError<400, types.DirectionsResponse400> Bad Request
   * @throws FetchError<401, types.DirectionsResponse401> Unauthorized
   * @throws FetchError<403, types.DirectionsResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<404, types.DirectionsResponse404> No location or places were found for the given input
   * @throws FetchError<429, types.DirectionsResponse429> Request exceeded the rate-limits set on your account
   * @throws FetchError<500, types.DirectionsResponse500> Internal Server Error
   */
  directions(metadata: types.DirectionsMetadataParam): Promise<FetchResponse<200, types.DirectionsResponse200>> {
    return this.core.fetch('/directions/{profile}/{coordinates}', 'get', metadata);
  }

  /**
   * Optimize API solves the Traveling Salesman Problem(TSP) using a greedy heuristic
   * (farthest-insertion algorithm) for 10 or more waypoints and uses brute force for less
   * than 10 waypoints. The returned path does not have to be the fastest path. As TSP is
   * NP-hard it only returns an approximation. Note that all input coordinates have to be
   * connected for the optimize service to work.
   *
   * @summary Optimize Service
   * @throws FetchError<400, types.OptimizeResponse400> Bad Request
   * @throws FetchError<401, types.OptimizeResponse401> Unauthorized
   * @throws FetchError<403, types.OptimizeResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<404, types.OptimizeResponse404> No location or places were found for the given input
   * @throws FetchError<429, types.OptimizeResponse429> Request exceeded the rate-limits set on your account
   * @throws FetchError<500, types.OptimizeResponse500> Internal Server Error
   */
  optimize(metadata: types.OptimizeMetadataParam): Promise<FetchResponse<200, types.OptimizeResponse200>> {
    return this.core.fetch('/optimize/{profile}/{coordinates}', 'get', metadata);
  }

  /**
   * Matching API matches or snaps given GPS points to the road network in the most plausible
   * way. Please note the request might result multiple sub-traces. Large jumps in the
   * timestamps (> 60s) or improbable transitions lead to trace splits if a complete matching
   * could not be found. The algorithm might not be able to match all points. Outliers are
   * removed if they can not be matched successfully.
   *
   * @summary Matching Service
   * @throws FetchError<400, types.MatchingResponse400> Bad Request
   * @throws FetchError<401, types.MatchingResponse401> Unauthorized
   * @throws FetchError<403, types.MatchingResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<404, types.MatchingResponse404> No location or places were found for the given input
   * @throws FetchError<429, types.MatchingResponse429> Request exceeded the rate-limits set on your account
   * @throws FetchError<500, types.MatchingResponse500> Internal Server Error
   */
  matching(metadata: types.MatchingMetadataParam): Promise<FetchResponse<200, types.MatchingResponse200>> {
    return this.core.fetch('/matching/{profile}/{coordinates}', 'get', metadata);
  }

  /**
   * Computes duration of the fastest route between all pairs of supplied coordinates.
   * Returns the durations or distances or both between the coordinate pairs. Note that the
   * distances are not the shortest distance between two coordinates, but rather the
   * distances of the fastest routes.
   *
   * @summary Matrix Service
   * @throws FetchError<400, types.MatrixResponse400> Bad Request
   * @throws FetchError<401, types.MatrixResponse401> Unauthorized
   * @throws FetchError<403, types.MatrixResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<404, types.MatrixResponse404> No location or places were found for the given input
   * @throws FetchError<429, types.MatrixResponse429> Request exceeded the rate-limits set on your account
   * @throws FetchError<500, types.MatrixResponse500> Internal Server Error
   */
  matrix(metadata: types.MatrixMetadataParam): Promise<FetchResponse<200, types.MatrixResponse200>> {
    return this.core.fetch('/matrix/{profile}/{coordinates}', 'get', metadata);
  }

  /**
   * Snaps a coordinate to the street network and returns the nearest n matches. Where
   * coordinates only supports a single {longitude},{latitude} entry.
   *
   * @summary Nearest Service
   * @throws FetchError<400, types.NearestResponse400> Bad Request
   * @throws FetchError<401, types.NearestResponse401> Unauthorized
   * @throws FetchError<403, types.NearestResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<404, types.NearestResponse404> No location or places were found for the given input
   * @throws FetchError<429, types.NearestResponse429> Request exceeded the rate-limits set on your account
   * @throws FetchError<500, types.NearestResponse500> Internal Server Error
   */
  nearest(metadata: types.NearestMetadataParam): Promise<FetchResponse<200, types.NearestResponse200>> {
    return this.core.fetch('/nearest/{profile}/{coordinates}', 'get', metadata);
  }

  /**
   * The Nearby API returns Points of Interest (PoI) such as cafes, hospitals or even
   * airports near a specified location.
   *
   * Note: The Nearby API endpoint is presently in BETA. The request or response format may
   * change without notice. While we don't expect to remove any elements, there will be
   * additions.
   *
   * @summary Nearby - Points of Interest (PoI) (Public BETA)
   * @throws FetchError<400, types.NearbyResponse400> Bad Request
   * @throws FetchError<401, types.NearbyResponse401> Unauthorized
   * @throws FetchError<403, types.NearbyResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<404, types.NearbyResponse404> No location or places were found for the given input.
   * @throws FetchError<429, types.NearbyResponse429> Request exceeded the rate-limits set on your account.
   * @throws FetchError<500, types.NearbyResponse500> Internal Server Error
   */
  nearby(metadata: types.NearbyMetadataParam): Promise<FetchResponse<200, types.NearbyResponse200>> {
    return this.core.fetch('/nearby', 'get', metadata);
  }

  /**
   * The Timezone API provides time offset data for locations on the surface of the earth.
   *
   * @summary Timezone
   * @throws FetchError<400, types.GetTimezoneResponse400> Bad Request
   * @throws FetchError<401, types.GetTimezoneResponse401> Unauthorized
   * @throws FetchError<403, types.GetTimezoneResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<404, types.GetTimezoneResponse404> No location or places were found for the given input.
   * @throws FetchError<429, types.GetTimezoneResponse429> Request exceeded the rate-limits set on your account.
   * @throws FetchError<500, types.GetTimezoneResponse500> Internal Server Error
   */
  getTimezone(metadata: types.GetTimezoneMetadataParam): Promise<FetchResponse<200, types.GetTimezoneResponse200>> {
    return this.core.fetch('/timezone', 'get', metadata);
  }

  /**
   * The Balance API provides a count of request credits left in the user's account for the
   * day. Balance is reset at midnight UTC every day (00:00 UTC).
   *
   * @summary Balance
   * @throws FetchError<400, types.BalanceResponse400> Bad Request
   * @throws FetchError<401, types.BalanceResponse401> Unauthorized
   * @throws FetchError<403, types.BalanceResponse403> The request has been made from an unauthorized domain.
   * @throws FetchError<429, types.BalanceResponse429> Request exceeded the rate-limits set on your account.
   * @throws FetchError<500, types.BalanceResponse500> Internal Server Error
   */
  balance(): Promise<FetchResponse<200, types.BalanceResponse200>> {
    return this.core.fetch('/balance', 'get');
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AutocompleteMetadataParam, AutocompleteResponse200, AutocompleteResponse400, AutocompleteResponse401, AutocompleteResponse403, AutocompleteResponse404, AutocompleteResponse429, AutocompleteResponse500, BalanceResponse200, BalanceResponse400, BalanceResponse401, BalanceResponse403, BalanceResponse429, BalanceResponse500, DirectionsMetadataParam, DirectionsResponse200, DirectionsResponse400, DirectionsResponse401, DirectionsResponse403, DirectionsResponse404, DirectionsResponse429, DirectionsResponse500, GetTimezoneMetadataParam, GetTimezoneResponse200, GetTimezoneResponse400, GetTimezoneResponse401, GetTimezoneResponse403, GetTimezoneResponse404, GetTimezoneResponse429, GetTimezoneResponse500, LookupMetadataParam, LookupResponse200, LookupResponse400, LookupResponse401, LookupResponse403, LookupResponse404, LookupResponse500, MatchingMetadataParam, MatchingResponse200, MatchingResponse400, MatchingResponse401, MatchingResponse403, MatchingResponse404, MatchingResponse429, MatchingResponse500, MatrixMetadataParam, MatrixResponse200, MatrixResponse400, MatrixResponse401, MatrixResponse403, MatrixResponse404, MatrixResponse429, MatrixResponse500, NearbyMetadataParam, NearbyResponse200, NearbyResponse400, NearbyResponse401, NearbyResponse403, NearbyResponse404, NearbyResponse429, NearbyResponse500, NearestMetadataParam, NearestResponse200, NearestResponse400, NearestResponse401, NearestResponse403, NearestResponse404, NearestResponse429, NearestResponse500, OptimizeMetadataParam, OptimizeResponse200, OptimizeResponse400, OptimizeResponse401, OptimizeResponse403, OptimizeResponse404, OptimizeResponse429, OptimizeResponse500, ReverseMetadataParam, ReverseResponse200, ReverseResponse400, ReverseResponse401, ReverseResponse403, ReverseResponse404, ReverseResponse429, ReverseResponse500, SearchMetadataParam, SearchPostalcodeMetadataParam, SearchPostalcodeResponse200, SearchPostalcodeResponse400, SearchPostalcodeResponse401, SearchPostalcodeResponse403, SearchPostalcodeResponse404, SearchPostalcodeResponse429, SearchPostalcodeResponse500, SearchResponse200, SearchResponse400, SearchResponse401, SearchResponse403, SearchResponse404, SearchResponse429, SearchResponse500, SearchStructuredMetadataParam, SearchStructuredResponse200, SearchStructuredResponse400, SearchStructuredResponse401, SearchStructuredResponse403, SearchStructuredResponse404, SearchStructuredResponse429, SearchStructuredResponse500 } from './types';
