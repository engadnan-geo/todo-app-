const swaggerJsdoc = require("swagger-jsdoc");
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: any = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fullstack Todo API",
      version: "1.0.0",
      description: "API documentation for your Fullstack Todo app built with Express + TypeScript",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // ✅ Tell swagger-jsdoc where to look for route annotations
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);