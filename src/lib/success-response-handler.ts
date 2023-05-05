import { HttpStatus } from '@nestjs/common';
import { Success } from 'src/types';

export const SuccessReponse = (
  status: HttpStatus,
  message: string,
  data?: object,
): Success => {
  const responseObject: Success = { statusCode: status, message, data };
  return responseObject;
};
