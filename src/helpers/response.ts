export function createResponse<T>({
  message,
  data,
  code,
}: {
  message: string;
  data: T | null;
  code: number;
}) {
  return {
    message,
    data,
    code,
  };
}

export class ResponseDto<T> {
  message: string;
  data: T | null;
  code: number;

  static success<T>({
    message,
    data,
  }: {
    message: string;
    data: T;
  }) {
    return createResponse<T>({
      code: 200,
      message,
      data,
    });
  }

  static error({
    message,
    code,
  }: {
    message: string;
    code: number;
  }) {
    return createResponse<null>({
      code,
      message,
      data: null,
    });
  }
}

export class PaginationResponseDto<T> {
  message: string;
  data: {
    records: T[];
    total: number;
    page: number;
    pageSize: number;
  } | null;
  code: number;

  static success<T>(
    message: string,
    data: T[],
    total: number,
    page: number,
    pageSize: number
  ) {
    return createResponse<{
      records: T[];
      total: number;
      page: number;
      pageSize: number;
    }>({
      code: 200,
      message,
      data: {
        records: data,
        total,
        page,
        pageSize,
      },
    });
  }

  static error({
    message,
    code,
  }: {
    message: string;
    code: number;
  }) {
    return createResponse<null>({
      code,
      message,
      data: null,
    });
  }
}
