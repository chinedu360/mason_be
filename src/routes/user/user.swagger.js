const loginUser = {
  tags: ["Auth"],
  description: "Login a new user",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
          required: ["email", "password"],
          example: {
            email: "okere360@gmail.com",
            password: "fifa7218c!",
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
              accessToken: { type: "string" },
              refreshToken: { type: "string" },
              message: { type: "string" },
              data: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                  role: { type: "string" },
                  profilePicture: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
};

const forgotPasswordUser = {
  tags: ["Auth"],
  description: "Forgot Password",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: { type: "string" },
          },
          required: ["email"],
          example: {
            email: "johndoe@example.com",
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
              status: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    },
  },
};

const resetPasswordUser = {
  tags: ["Auth"],
  description: "Reset Password",
  parameters: [
    {
      name: "token",
      in: "path",
      description: "token from email user clicked",
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
            password: { type: "string" },
            passwordConfirm: { type: "string" },
          },
          required: ["email"],
          example: {
            password: "fifa7218c!",
            passwordConfirm: "fifa7218c!",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK",
    },
  },
};

const refreshTokenUser = {
  tags: ["Auth"],
  description: "Refresh Password",
  requestBody: {
    description: "refresh password",
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            // type: "object",
            properties: {
              accessToken: { type: "string" },
              refreshToken: { type: "string" },
            },
          },
        },
      },
    },
  },
};

const logoutUser = {
  tags: ["Auth"],
  description: "Logout",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            refreshToken: { type: "string" },
          },
          required: ["refreshToken"],
          example: {
            refreshToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODIyODk4ODYsImV4cCI6MTcxMzg0NzQ4NiwiYXVkIjoiNjQ0NWIzNTc5MmUyMTA4NjA3ZWQ2ZWQ3IiwiaXNzIjoiY2x1Y2tjcmVla21lYWRvdy5jb20ifQ.tebudrBlEdW4If0PNE0G9IxslUPjbBFDYtMc51cZbAM",
          },
        },
      },
    },
  },
  responses: {
    204: {
      description: "OK",
    },
  },
};

const userRouteDoc = {
  "/api/v1/auth/login": {
    post: loginUser,
  },
  "/api/v1/auth/forgotPassword": {
    post: forgotPasswordUser,
  },
  "/api/v1/auth/refresh-token": {
    post: refreshTokenUser,
  },
  "/api/v1/auth/resetPassword/{token}": {
    patch: resetPasswordUser,
  },
  "/api/v1/auth/logout": {
    delete: logoutUser,
  },
};

module.exports = userRouteDoc;
