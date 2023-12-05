export interface ErrorInterface {
  status: number;
  message: string;
}

export interface ErrorListInterface {
  [key: string]: ErrorInterface;
}

export interface CustomError extends Error {
  status: number;
  errors?: { message: string }[];
}
