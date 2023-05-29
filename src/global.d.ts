declare interface IResponse<T> {
  code: number;
  msg: string;
  data: T;
}

declare interface IResponseList<T> extends IResponse {
  data: {
    total: number;
    list: T[];
  }
}
