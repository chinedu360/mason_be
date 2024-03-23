const lodgedetail = {
  tags: ["Lodge Detail"],
  description: "Save lodge details to the database",
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            bgcolor: { type: "string" },
            lodgenumber: { type: "string" },
            lodgelogo: { type: "string", format: "binary" },
            brotheronlybgimage: { type: "string", format: "binary" },
          },
          required: [
            "bgcolor",
            "lodgenumber",
            "lodgelogo",
            "brotheronlybgimage",
          ],
          example: {
            bgcolor: "#ffffff",
            lodgenumber: "123",
            lodgelogo: "binary_data_here",
            brotheronlybgimage: "binary_data_here",
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
              lodgeinfo: { type: "object" }, // Assuming you return the lodge info object
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

const lodgedetailRouteDoc = {
  "/api/v1/lodgedetail": {
    post: lodgedetail,
  },
};

module.exports = lodgedetailRouteDoc;
