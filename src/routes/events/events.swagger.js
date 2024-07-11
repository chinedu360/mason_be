const createEvent = {
  tags: ["Event"],
  description: "Create a new event",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            event_name: { type: "string" },
            event_date: { type: "string", format: "date" },
            description: { type: "string" },
          },
          required: ["event_name", "event_date", "description"], // Adjusted for required fields
          example: {
            event_name: "The masons event",
            event_date: "2024-06-19",
            description:
              "lorem ipsum dolor sit amet, consectetur adipiscing elit",
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

// const updateBlogPost = {
//   tags: ["Blog"],
//   description: "Update a blog post",
//   requestBody: {
//     required: true,
//     content: {
//       "multipart/form-data": {
//         schema: {
//           type: "object",
//           properties: {
//             title: { type: "string" },
//             content: { type: "string" },
//             content_image: { type: "string", format: "binary" },
//             display_image: { type: "string", format: "binary" },
//             featured_image_url: { type: "string", format: "binary" },
//           },
//           required: ["title", "content"],
//           example: {
//             title: "Updated Blog Post",
//             content: "Updated content of the blog post",
//             content_image: "binary_data_here",
//             display_image: "binary_data_here",
//             featured_image_url: "binary_data_here",
//           },
//         },
//       },
//     },
//   },
//   parameters: [
//     {
//       in: "path",
//       name: "id",
//       required: true,
//       description: "ID of the blog post to update",
//       schema: {
//         type: "string",
//       },
//     },
//   ],
//   responses: {
//     201: {
//       description: "Blog post updated successfully",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               message: { type: "string" },
//               response: { type: "object" }, // Adjust this based on the response of your update method
//             },
//           },
//         },
//       },
//     },
//     400: {
//       description: "Bad Request",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               message: { type: "string" },
//             },
//           },
//         },
//       },
//     },
//     404: {
//       description: "Not Found",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               message: { type: "string" },
//             },
//           },
//         },
//       },
//     },
//     500: {
//       description: "Internal Server Error",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               message: { type: "string" },
//             },
//           },
//         },
//       },
//     },
//   },
//   security: [
//     {
//       BearerAuth: [],
//     },
//   ],
// };

// /

// const findByBlogPostByAuthorId = {
//   tags: ["Blog"],
//   description: "Find blog posts by author ID",
//   parameters: [
//     {
//       in: "path",
//       name: "author_id",
//       required: true,
//       description: "ID of the author whose blog posts are to be retrieved",
//       schema: {
//         type: "string",
//         example: "123456789",
//       },
//     },
//     {
//       in: "query",
//       name: "page",
//       required: false,
//       description: "Page number for pagination",
//       schema: {
//         type: "integer",
//         example: 1,
//       },
//     },
//     {
//       in: "query",
//       name: "limit",
//       required: false,
//       description: "Number of items per page",
//       schema: {
//         type: "integer",
//         example: 10,
//       },
//     },
//   ],
//   security: [
//     {
//       BearerAuth: [], // Assuming it requires bearer token authentication
//     },
//   ],
//   responses: {
//     200: {
//       description: "OK",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               message: { type: "string" },
//               length: { type: "integer" },
//               currentPage: { type: "integer" },
//               itemsPerPage: { type: "integer" },
//               data: {
//                 type: "array",
//                 items: {
//                   type: "object",
//                   properties: {}, // Add properties as needed based on the response
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     400: {
//       description: "Bad Request",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               message: { type: "string" },
//             },
//           },
//         },
//       },
//     },
//     500: {
//       description: "Internal Server Error",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               message: { type: "string" },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// const deleteBlogPost = {
//   tags: ["Blog"],
//   description: "Delete a blog post by ID",
//   parameters: [
//     {
//       in: "path",
//       name: "id",
//       required: true,
//       description: "ID of the blog post to be deleted",
//       schema: {
//         type: "string",
//         example: "123456789",
//       },
//     },
//   ],
//   security: [
//     {
//       bearerAuth: [],
//     },
//   ],
//   responses: {
//     200: {
//       description: "OK",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               resp: {
//                 type: "string",
//                 example: "Blog post deleted successfully",
//               },
//             },
//           },
//         },
//       },
//     },
//     400: {
//       description: "Bad Request",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               message: { type: "string" },
//             },
//           },
//         },
//       },
//     },
//     401: {
//       description: "Unauthorized",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               message: { type: "string" },
//             },
//           },
//         },
//       },
//     },
//     500: {
//       description: "Internal Server Error",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               message: { type: "string" },
//             },
//           },
//         },
//       },
//     },
//   },
// };

const eventRouteDoc = {
  "/api/v1/event": {
    // get: findAllBlogPosts,
    post: createEvent,
  },
  //   "/api/v1/blog/{author_id}": {
  //     get: findByBlogPostByAuthorId,
  //   },
  //   "/api/v1/blog/{id}": {
  //     patch: updateBlogPost,
  //     delete: deleteBlogPost,
  //   },
};

module.exports = eventRouteDoc;
