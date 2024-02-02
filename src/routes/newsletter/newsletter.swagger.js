const newsletter = {
  tags: ["Newsletter"],
  description: "Subscribe to newsletter",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: { type: "string" },
            name: { type: "string" },
            // token: { type: "string" },
          },
          required: ["name", "email"],
          example: {
            name: "john doe",
            email: "johndoe@example.com",
            // token:
            //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA2NTU2OTgsImV4cCI6MTY5ODQzMTY5OCwiYXVkIjoib2sxMXdmZGQxQGdtYWlsLmNvbSIsImlzcyI6ImNsdWNrY3JlZWttZWFkb3cuY29tIn0.UYSlytZlFHb85MssIwp7fs7Gc9aiR3Sf8K7y0D2UDfQ",
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
  },
};

const unsubscribe = {
  tags: ["Newsletter"],
  description: "unsubscribe from our email list",
  parameters: [
    {
      in: "query",
      name: "token",
      schema: {
        type: "string",
      },
      required: true,
      description:
        "the user email list token that was assigned when they subscribed to the email list",
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
            },
          },
        },
      },
    },
  },
};

const newsletterRouteDoc = {
  "/api/v1/subscribe": {
    post: newsletter,
  },
  "/api/v1/unsubscribe": {
    post: unsubscribe,
  },
};

module.exports = newsletterRouteDoc;
