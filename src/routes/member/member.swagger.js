const createMember = {
  tags: ["Members"],
  description: "Create a new member with file upload",
  consumes: ["multipart/form-data"],
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            level: { type: "string" },
            officerTitle: { type: "string" },
            phoneNumber: { type: "string" },
            workPhone: { type: "string" },
            email: { type: "string" },
            address: { type: "string" },
            profilePicture: { type: "string", format: "binary" },
          },
          required: ["name", "email"],
          example: {
            name: "John Doe",
            level: "Beginner",
            officerTitle: "Officer",
            phoneNumber: "1234567890",
            workPhone: "0987654321",
            email: "john@example.com",
            address: "123 Street, City, Country",
            profilePicture: "<file_data>",
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
              error: { type: "object" },
            },
          },
        },
      },
    },
  },
};

const getMembers = {
  tags: ["Members"],
  description: "Get a list of members with pagination",
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
                items: { $ref: "#/components/schemas/Member" },
              },
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
      BearerAuth: [],
    },
  ],
};

const updateMember = {
  tags: ["Members"],
  description: "Update a member",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of the member to update",
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
            officerTitle: { type: "string" },
            phoneNumber: { type: "string" },
            workPhone: { type: "string" },
            email: { type: "string" },
            address: { type: "string" },
          },
          required: ["name"], // Assuming 'name' is required
          example: {
            name: "Updated Member Name",
            level: "Updated Member Level",
            officerTitle: "Updated Officer Title",
            phoneNumber: "Updated Phone Number",
            workPhone: "Updated Work Phone",
            email: "updated@example.com",
            address: "Updated Address",
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

const deleteMember = {
  tags: ["Members"],
  description: "Delete a member",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of the member to delete",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  security: [
    {
      bearerAuth: [],
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

const searchMembers = {
  tags: ["Members"],
  description: "Search members by term",
  parameters: [
    {
      in: "query",
      name: "term",
      description: "Search term",
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
              members: { type: "array", items: { type: "object" } },
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
              error: { type: "object" },
            },
          },
        },
      },
    },
  },
};

const memberDoc = {
  "/api/v1/members": {
    get: getMembers,
    post: createMember,
  },
  "/api/v1/members/search": {
    get: searchMembers,
  },
  "/api/v1/members/{id}": {
    patch: updateMember,
    delete: deleteMember,
  },
};

module.exports = memberDoc;
