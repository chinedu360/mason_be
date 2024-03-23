const getAllOfficer = {
  tags: ["Officer"],
  description: "Get a list of officers with pagination",
  parameters: [
    {
      name: "page",
      in: "query",
      description: "Page number for pagination",
      required: false,
      schema: {
        type: "integer",
        default: 1,
      },
    },
    {
      name: "limit",
      in: "query",
      description: "Number of items per page",
      required: false,
      schema: {
        type: "integer",
        default: 10,
      },
    },
  ],
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
              length: { type: "integer" },
              currentPage: { type: "integer" },
              itemsPerPage: { type: "integer" },
              data: {
                type: "array",
                items: { $ref: "#/components/schemas/Officer" },
              }, // Assuming an "Officer" schema exists
            },
          },
        },
      },
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
  },
  security: [
    {
      // This indicates that the endpoint requires an access token for authentication
      BearerAuth: [],
    },
  ],
};

const updateOfficer = {
  tags: ["Officer"],
  description: "Update an officer",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of the officer to update",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            level: { type: "string" },
          },
          required: ["name"],
          example: {
            name: "Updated Officer Name",
            level: "Updated Officer Title",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
              updateResp: { type: "object" },
            },
          },
        },
      },
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const deleteOfficerRole = {
  tags: ["Officer"],
  description: "Delete an officer role by setting the level to NULL",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of the officer to remove the role from",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
              error: { type: "string" }, // Include error details for 500
            },
          },
        },
      },
    },
  },
  security: [
    {
      BearerAuth: [], // Assuming this endpoint requires authentication
    },
  ],
};

const fileUpload = {
  tags: ["Officer"],
  description:
    "Upload an Excel file containing member information and register users with emails.",
  parameters: [], // No query parameters needed for this endpoint
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            file: {
              type: "string",
              format: "binary",
              description: "The Excel file containing member data.",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "File uploaded and users registered successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: { type: "string" }, // Success message
              length: { type: "integer" }, // Number of users registered
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
  },
  security: [
    {
      // This indicates that the endpoint requires an access token for authentication
      BearerAuth: [],
    },
  ],
};

const officerDoc = {
  "/api/v1/officers": {
    get: getAllOfficer,
    post: fileUpload,
  },
  "/api/v1/officers/{id}": {
    patch: updateOfficer,
  },
  "/api/v1/officers/{id}/level": {
    patch: deleteOfficerRole,
  },
};

module.exports = officerDoc;
