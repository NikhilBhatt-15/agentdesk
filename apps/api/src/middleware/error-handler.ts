import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "@agentdesk/db";
import {
  AppError,
  ConflictError,
} from "../lib/error";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request",
        details: error.issues,
      },
    });

    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
      },
    });

    return;
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError
  ) {
    if (error.code === "P2002") {
      const appError = new ConflictError(
        "Resource already exists",
        "RESOURCE_ALREADY_EXISTS",
      );

      res.status(appError.statusCode).json({
        error: {
          code: appError.code,
          message: appError.message,
        },
      });

      return;
    }
  }

  console.error(error);

  res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    },
  });
};