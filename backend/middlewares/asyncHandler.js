// import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wrapper för asynkrona route-handlers så att fel skickas vidare till Express felhantering.
 */

export default function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}