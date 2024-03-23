const createSubtopic = {
  tags: ["Subtopic"],
  description: "Create a new subtopic",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            content: { type: "string" },
            topic_id: { type: "string" },
          },
          required: ["title", "content", "topic_id"],
          example: {
            title: "Sample Subtopic",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            topic_id: "10",
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
              subtopic: { type: "object" }, // Assuming you return the created subtopic
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
      BearerAuth: [], // Assuming authentication is required
    },
  ],
};

const getSubtopics = {
  tags: ["Subtopic"],
  description: "Get a list of subtopics for a given topic",
  parameters: [
    {
      name: "topic_id",
      in: "path",
      description: "ID of the topic to get subtopics for",
      required: true,
      schema: {
        type: "integer",
      },
    },
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
        default: 5,
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
  security: [
    {
      BearerAuth: [], // Assuming authentication is required
    },
  ],
};

const updateSubtopic = {
  tags: ["Subtopic"],
  description: "Update a subtopic",
  parameters: [
    {
      name: "subtopic_id",
      in: "path",
      description: "ID of the subtopic to update",
      required: true,
      schema: {
        type: "integer",
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
            title: { type: "string" },
            content: { type: "string" },
            topic_id: { type: "integer" },
          },
          required: ["title", "content", "topic_id"],
          example: {
            title: "Updated Title",
            content: "Updated Content",
            topic_id: 10,
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
            },
          },
        },
      },
    },
  },
  security: [
    {
      BearerAuth: [], // Assuming authentication is required
    },
  ],
};

const deleteSubtopic = {
  tags: ["Subtopic"],
  description: "Delete a subtopic by ID",
  parameters: [
    {
      name: "subtopic_id",
      in: "path",
      description: "ID of the subtopic to delete",
      required: true,
      schema: {
        type: "integer",
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
      BearerAuth: [], // Assuming authentication is required
    },
  ],
};

const subtopicDoc = {
  "/api/v1/subtopics/{topic_id}": {
    get: getSubtopics,
  },
  "/api/v1/subtopics": {
    post: createSubtopic,
  },
  "/api/v1/subtopics/{subtopic_id}": {
    patch: updateSubtopic,
    delete: deleteSubtopic,
  },
};

module.exports = subtopicDoc;
