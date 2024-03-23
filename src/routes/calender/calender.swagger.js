const createCalendar = {
  tags: ["Calendar"],
  description: "Create calendar links for a user",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            user_id: { type: "integer" },
            public_link: { type: "string" },
            brother_link: { type: "string" },
            officer_link: { type: "string" },
          },
          required: ["user_id"],
          example: {
            user_id: 123,
            public_link: "https://calendar.google.com/public_link",
            brother_link: "https://calendar.google.com/brother_link",
            officer_link: "https://calendar.google.com/officer_link",
          },
        },
      },
    },
    required: true,
  },
  responses: {
    200: {
      description: "OK",
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
      BearerAuth: [],
    },
  ],
};

const getCalenderLinks = {
  tags: ["Calendar"],
  description: "Get calendar links",
  responses: {
    200: {
      description: "Success",
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
                  properties: {
                    user_id: { type: "integer" },
                    public_link: { type: "string" },
                    brother_link: { type: "string" },
                    officer_link: { type: "string" },
                  },
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

const updateCalenderLinks = {
  tags: ["Calendar"],
  description: "Update calendar links",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            public_link: { type: "string" },
            brother_link: { type: "string" },
            officer_link: { type: "string" },
          },
          required: [],
          example: {
            public_link: "https://example.com/public",
            brother_link: "https://example.com/brother",
            officer_link: "https://example.com/officer",
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
              success: { type: "boolean" },
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

const calenderDoc = {
  "/api/v1/calenders": {
    get: getCalenderLinks,
    post: createCalendar,
    patch: updateCalenderLinks,
  },
};

module.exports = calenderDoc;
