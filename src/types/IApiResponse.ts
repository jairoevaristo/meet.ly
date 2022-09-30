export interface Entity<T> {
  data: T | null
  message: string | null;
}

export interface IApiResponse<T> {
  entity: Entity<T>;
  success: boolean;
}