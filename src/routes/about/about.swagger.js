const AboutPost = {
  tags: ["About"],
  description: "Create or update the about page content",
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            content: { type: "string" },
            content_image: { type: "string", format: "binary" }, // Adjusted for binary data
          },
          required: ["content"],
          example: {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            content_image: "binary_data_here", // Adjusted for binary data
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Updated",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
            example: {
              message: "About post updated successfully",
            },
          },
        },
      },
    },
    201: {
      description: "Created",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
            example: {
              message: "About post created successfully",
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
            example: {
              message: "Missing required fields",
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
            example: {
              message: "Internal server error",
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

const findAboutPost = {
  tags: ["About"],
  description: "Find all about details",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {}, // Add properties as needed based on the response
                },
              },
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

const aboutRouteDoc = {
  "/api/v1/about": {
    post: AboutPost,
    get: findAboutPost,
  },
};

module.exports = aboutRouteDoc;
