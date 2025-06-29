export default {
  openapi: "3.0.0",
  info: {
    title: "Notes & Users API",
    version: "1.0.0",
    description: "API documentation for managing users and notes."
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer" },
          username: { type: "string" },
          email: { type: "string" }
        }
      },
      Note: {
        type: "object",
        properties: {
          id: { type: "integer" },
          user_id: { type: "integer" },
          title: { type: "string" },
          content: { type: "string" },
          created_at: { type: "string", format: "date-time" },
          updated_at: { type: "string", format: "date-time" }
        }
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  tags: [
    {
      name: "Users",
      description: "User management endpoints"
    },
    {
      name: "Notes",
      description: "Notes management"
    }
  ],
  paths: {
    "/users": {
      get: {
        summary: "Get all users",
        tags: ["Users"],
        responses: {
          200: {
            description: "A list of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" }
                }
              }
            }
          },
          500: { description: "Error fetching users" }
        }
      },
      post: {
        summary: "Create a new user",
        tags: ["Users"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["username", "email", "password"],
                properties: {
                  username: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "User created successfully" },
          500: { description: "Error creating user" }
        }
      }
    },
    "/users/login": {
      post: {
        summary: "Login a user",
        tags: ["Users"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string" },
                  password: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Successful login",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string" }
                  }
                }
              }
            }
          },
          401: { description: "Invalid credentials" },
          500: { description: "Server error" }
        }
      }
    },
    "/users/{id}": {
      get: {
        summary: "Get a user by ID",
        tags: ["Users"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: {
            description: "User found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" }
              }
            }
          },
          404: { description: "User not found" },
          500: { description: "Error fetching user" }
        }
      },
      put: {
        summary: "Update a user",
        tags: ["Users"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" }
            }
          }
        },
        responses: {
          200: { description: "User updated successfully" },
          404: { description: "User not found" },
          500: { description: "Error updating user" }
        }
      },
      delete: {
        summary: "Delete a user",
        tags: ["Users"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: {
            description: "User deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    user: { $ref: "#/components/schemas/User" }
                  }
                }
              }
            }
          },
          404: { description: "User not found" },
          500: { description: "Error deleting user" }
        }
      }
    },
    "/notes": {
      get: {
        summary: "Get all notes for the authenticated user",
        tags: ["Notes"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of notes",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Note" }
                }
              }
            }
          },
          401: { description: "Unauthorized" }
        }
      },
      post: {
        summary: "Create a new note",
        tags: ["Notes"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "content"],
                properties: {
                  title: { type: "string" },
                  content: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "Note created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Note" }
              }
            }
          },
          400: { description: "Missing title or content" },
          401: { description: "Unauthorized" }
        }
      }
    },
    "/notes/search": {
      get: {
        summary: "Search notes by keyword for the authenticated user",
        tags: ["Notes"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "query",
            name: "query",
            required: true,
            schema: { type: "string" },
            description: "Keyword to search in note title or content"
          }
        ],
        responses: {
          200: {
            description: "List of matching notes",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Note" }
                }
              }
            }
          },
          400: { description: "Missing or invalid search query" },
          401: { description: "Unauthorized" }
        }
      }
    }
  }
};
