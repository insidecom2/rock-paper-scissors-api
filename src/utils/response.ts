import { HttpException } from "@nestjs/common";

export const returnApi = (
  status: boolean,
  data: any,
  comment: string = "Ok"
) => {
  return { status, data, comment };
};
