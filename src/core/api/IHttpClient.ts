/**
 * Optional configuration for an HTTP request.
 */
export interface HttpClientConfig {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  timeout?: number;
}

/**
 * Contract for the HTTP client used to make API requests.
 * Implemented by HttpClient and used as the injection token throughout the application.
 */
export interface IHttpClient {
  /**
   * Sends a GET request to the given URL.
   *
   * @param url - Request path
   * @param config - Optional request config
   * @returns Response data
   */
  get<T>(url: string, config?: HttpClientConfig): Promise<T>;

  /**
   * Sends a POST request to the given URL.
   *
   * @param url - Request path
   * @param data - Request body
   * @param config - Optional request config
   * @returns Response data
   */
  post<T>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T>;

  /**
   * Sends a PUT request to the given URL.
   *
   * @param url - Request path
   * @param data - Request body
   * @param config - Optional request config
   * @returns Response data
   */
  put<T>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T>;

  /**
   * Sends a PATCH request to the given URL.
   *
   * @param url - Request path
   * @param data - Request body
   * @param config - Optional request config
   * @returns Response data
   */
  patch<T>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T>;

  /**
   * Sends a DELETE request to the given URL.
   *
   * @param url - Request path
   * @param config - Optional request config
   * @returns Response data
   */
  delete<T>(url: string, config?: HttpClientConfig): Promise<T>;
}
