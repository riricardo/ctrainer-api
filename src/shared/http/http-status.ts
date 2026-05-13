const HttpStatus = {
  Ok: 200,
  Created: 201,
  NoContent: 204,
  Found: 302,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  InternalServerError: 500,
  ServiceUnavailable: 503,
} as const;

type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];

export { HttpStatus };
