export const openapiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Droppit API",
    version: "1.0.0",
  },
  servers: [{ url: "/" }],
  paths: {
    "/api/v1/waitlist": {
      post: {
        summary: "Join waitlist",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/WaitlistJoinRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/WaitlistJoinResponse" },
              },
            },
          },
          "400": {
            description: "Invalid input",
          },
          "500": {
            description: "Server error",
          },
        },
      },
    },
    "/api/v1/app-passwords": {
      get: {
        summary: "List app passwords (admin)",
        parameters: [
          {
            name: "x-admin-key",
            in: "header",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "OK",
          },
          "401": { description: "Unauthorized" },
          "500": { description: "Server misconfigured" },
        },
      },
      post: {
        summary: "Create app password (admin)",
        parameters: [
          {
            name: "x-admin-key",
            in: "header",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AppPasswordCreateRequest" },
            },
          },
        },
        responses: {
          "201": { description: "Created" },
          "400": { description: "Missing name" },
          "401": { description: "Unauthorized" },
          "500": { description: "Server misconfigured" },
        },
      },
    },
    "/api/v1/app-passwords/revoke": {
      post: {
        summary: "Revoke app password (admin)",
        parameters: [
          {
            name: "x-admin-key",
            in: "header",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AppPasswordRevokeRequest" },
            },
          },
        },
        responses: {
          "200": { description: "OK" },
          "400": { description: "Missing id" },
          "401": { description: "Unauthorized" },
          "500": { description: "Server misconfigured" },
        },
      },
    },
    "/api/v1/app-passwords/verify": {
      post: {
        summary: "Verify app password (Bearer token)",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "OK" },
          "401": { description: "Unauthorized" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer" },
    },
    schemas: {
      WaitlistJoinRequest: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          name: { type: "string" },
        },
        required: ["email"],
        additionalProperties: false,
      },
      WaitlistJoinResponse: {
        type: "object",
        properties: {
          msg: { type: "string" },
          entry: {
            type: "object",
            properties: {
              id: { type: "string" },
              email: { type: "string", format: "email" },
              createdAt: { type: "string", format: "date-time" },
            },
            required: ["id", "email", "createdAt"],
            additionalProperties: false,
          },
        },
        required: ["msg", "entry"],
        additionalProperties: false,
      },
      AppPasswordCreateRequest: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
        required: ["name"],
        additionalProperties: false,
      },
      AppPasswordRevokeRequest: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
        additionalProperties: false,
      },
    },
  },
} as const;

