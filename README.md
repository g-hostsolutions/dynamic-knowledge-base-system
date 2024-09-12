# dynamic-knowledge-base-system

# Requirements

-   **Node.js**: Version 20 or higher

# Getting Started

1. **Clone the repository**:

2. **Install dependencies**: npm ci

3. **Build the project**: npm run build

4. **Start the server**: npm start

# Authorization

needs to use a simple static token: `4f6b3d0e9c5f8a7e2d1a9b4c5e7f8d9a`

# API User Roles

Here are the possible users and their roles that can be used in the API headers:

-   **Admin User**

    -   **Email**: `admin@example.com`
    -   **Role**: Admin

-   **Editor User**

    -   **Email**: `editor@example.com`
    -   **Role**: Editor

-   **Viewer User 1**

    -   **Email**: `viewer1@example.com`
    -   **Role**: Viewer

-   **Viewer User 2**
    -   **Email**: `viewer2@example.com`
    -   **Role**: Viewer

# API Endpoints

## Health Check

-   **GET /health**
    -   **Description**: Check the health status of the API.
    -   **Required Headers**: None

## Topics

-   **GET /topics**

    -   **Description**: Retrieve all topics.
    -   **Required Headers**:
        -   `Authorization: Bearer <token>`
        -   `useremail: <email>`

-   **GET /topics/version**

    -   **Description**: Get topics by version.
    -   **Required Headers**:

        -   `Authorization: Bearer <token>`
        -   `useremail: <email>`

        **Used for**: Searching for topics by name and version.

-   **Validation Rules**:

    -   `name` (param) (string): Must be provided.
    -   `version` (query) (integer, optional): Must be numeric if provided.

-   **GET /topics/pathFinder**

    -   **Description**: Get the shortest path between topics.
    -   **Required Headers**:

        -   `Authorization: Bearer <token>`
        -   `useremail: <email>`

        **Used for**: Finding the shortest path between topics.

-   **Validation Rules query**:

    -   `sourceId` (integer): Must be a positive integer and is required.
    -   `targetId` (integer): Must be a positive integer and is required.

-   **GET /topics/:id**

    -   **Description**: Retrieve a topic and its tree structure by ID.
    -   **Required Headers**:

        -   `Authorization: Bearer <token>`
        -   `useremail: <email>`

        **Used for**: Retrieving a topic and its tree structure by ID.

-   **Validation Rules Params**:

    -   `id` (integer): Must be numeric and is required.

-   **POST /topics**

    -   **Description**: Create a new topic.
    -   **Required Headers**:

        -   `Authorization: Bearer <token>`
        -   `useremail: <email>`

**Used for**: Creating a new topic.

-   **Validation Rules on Body**:

    -   `name` (string): Must be a string and is required.
    -   `content` (string): Must be a string and is required.
    -   `version` (integer, optional): Must be a positive integer if provided.
    -   `parentTopicId` (integer, optional): Must be a positive integer if provided.

-   **PUT /topics/:id**

    -   **Description**: Update an existing topic by ID.
    -   **Required Headers**:

        -   `Authorization: Bearer <token>`
        -   `useremail: <email>`

        **Used for**: Updating an existing topic.

-   **Validation Rules on body**:
    -   `id` (integer): Must be numeric and is required.
    -   `content` (string, optional): Must be a string if provided.

# Example Usage with API Endpoints

When interacting with the API, use the appropriate DTOs to ensure that your requests are validated correctly.

**For example**:

-   **To create a topic** using `CreateTopicDTO`, your request body should include `name`, `content`, and optionally `version` and `parentTopicId`.
-   **To update a topic** using `UpdateTopicDTO`, provide the `id` in the URL and optionally include the `content` in the request body.
-   **To search for a topic by ID** using `TopicSearchDTO`, include the `id` as a path parameter in your request.
-   **To find the shortest path** between topics using `TopicPathFinderDTO`, include `sourceId` and `targetId` as query parameters.
-   **To search for topics by version** using `TopicVersionSearchDTO`, provide `name` and optionally `version` as query parameters.
