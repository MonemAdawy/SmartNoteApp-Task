## Smart Note API

A Node.js + Express REST API for managing notes with user auth and OpenAI-powered summarization.

### How to Run

1. Clone the repo
2. Run `npm install`
3. Create `.env` file based on `.env.example`
4. Run `npm run dev`

### Main Endpoints
- `POST /auth/verify`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /user/profile`
- `POST /user/upload-profilePicture`
- `DELETE /user/delete-profilePicture`
- `POST /note/create`
- `GET /note/get-all`
- `DELETE /note/:noteId`
- `POST /note/:noteId/summarize`

>  Note1: GraphQL is implemented in the GET /notes endpoint as specified in the assessment. All other functionalities are covered via REST API.

>  Note2: GraphQL Endpoint: http://localhost:3000/graphql

>  Note3: This project is built using JavaScript (not TypeScript) as per the assessment requirements.

