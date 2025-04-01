export interface PaginationQueryDto {
  page: number;
  perPage: number;
  order?: string;
  orderKey?: string;
}
