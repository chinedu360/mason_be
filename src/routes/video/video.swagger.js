const createVideo = {
  tags: ["Video"],
  description: "Create a new Video",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            youtube_link: { type: "string" },
          },
          required: ["title", "youtube_link"], // Adjusted for required fields
          example: {
            title: "Sample Video Content",
            youtube_link: "https://www.youtube.com/watch?v=KkwMJ99w_1o",
          },
        },
      },
    },
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

const updateBlogPost = {
  tags: ["Video"],
  description: "Update a blog post",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
          },
          required: ["title", "content"],
          example: {
            title: "Updated Blog Post",
          },
        },
      },
    },
  },
  parameters: [
    {
      in: "path",
      name: "id",
      required: true,
      description: "ID of the video title to update",
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    201: {
      description: "Video title updated successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
              response: { type: "object" }, // Adjust this based on the response of your update method
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

const findAllVideo = {
  tags: ["Video"],
  description: "Find all Video",
  parameters: [
    {
      in: "query",
      name: "page",
      required: false,
      description: "Page number for pagination",
      schema: {
        type: "integer",
        example: 1,
      },
    },
    {
      in: "query",
      name: "limit",
      required: false,
      description: "Number of items per page",
      schema: {
        type: "integer",
        example: 11,
      },
    },
  ],
  responses: {
    200: {
      description: "OK",
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

const deleteVideo = {
  tags: ["Video"],
  description: "Delete a video by ID",
  parameters: [
    {
      in: "path",
      name: "id",
      required: true,
      description: "ID of the video to be deleted",
      schema: {
        type: "string",
        example: "1",
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
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resp: {
                type: "string",
                example: "Video deleted successfully",
              },
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
    401: {
      description: "Unauthorized",
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
};

const videoRouteDoc = {
  "/api/v1/video": {
    get: findAllVideo,
    post: createVideo,
  },
  "/api/v1/video/{id}": {
    patch: updateBlogPost,
    delete: deleteVideo,
  },
};

module.exports = videoRouteDoc;
