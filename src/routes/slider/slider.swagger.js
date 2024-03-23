const uploadSliderImage = {
  tags: ["Slider Image"],
  description: "Upload a slider image",
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
            },
          },
        },
      },
    },
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
              sliderImgURI: { type: "object" }, // Define the structure of sliderImgURI here
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
      bearerAuth: [],
    },
  ],
};

const deleteSliderImage = {
  tags: ["Slider Image"],
  description: "Delete a slider image",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            id: { type: "string" },
            img_key: { type: "string" },
          },
          required: ["id", "img_key"],
          example: {
            id: "12345",
            img_key: "image-key.jpg",
          },
        },
      },
    },
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
      bearerAuth: [],
    },
  ],
};

const sliderImgRouteDoc = {
  "/api/v1/slider": {
    post: uploadSliderImage,
    delete: deleteSliderImage,
  },
};

module.exports = sliderImgRouteDoc;
