const createTopic = {
  tags: ["Topic"],
  description: "Create a new topic",
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            // Assuming req.files[0] represents the image
            image: { type: "string", format: "binary" },
          },
          required: ["name", "image"],
          example: {
            name: "Sample Topic",
            image: "binary_data_here",
          },
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "Created",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
              article: { type: "object" }, // Assuming you return the created article
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

const getArticle = {
  tags: ["Topic"],
  description: "Get a list of articles with pagination",
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
        default: 3,
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
              data: { type: "array", items: { type: "object" } },
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
};

const updateArticleTopic = {
  tags: ["Topic"],
  description: "Update an article topic",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of the article topic to update",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            image: { type: "string", format: "binary" },
          },
          required: ["name"],
          example: {
            name: "Updated Topic Name",
            image: "binary_data_here",
          },
        },
      },
    },
    required: false,
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
      // This indicates that the endpoint requires an access token for authentication
      BearerAuth: [],
    },
  ],
};

const deleteArticleTopic = {
  tags: ["Topic"],
  description: "Delete an article topic",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of the article topic to delete",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            img_key: { type: "string" },
          },
          required: ["img_key"],
          example: {
            img_key: "example_key.jpg",
          },
        },
      },
    },
    required: true,
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

const articleDoc = {
  "/api/v1/articles": {
    get: getArticle,
    post: createTopic,
  },
  "/api/v1/articles/{id}": {
    patch: updateArticleTopic,
    delete: deleteArticleTopic,
  },
};

module.exports = articleDoc;
