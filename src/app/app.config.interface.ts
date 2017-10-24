export interface IAppConfig {
  loginEndpoint: string;
  contentEndpoint: string;
  uploadEndpoint: string;
  requestRetry: number;
  uploadRetry: number;
  uploadChunkRetry: number;
}
