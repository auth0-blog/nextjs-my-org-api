# A Next.js Sample Application for My Organization API

This sample project demonstrates how to use the Auth0 My Organization API within a Next.js application.


For a detailed walkthrough on building this application, please refer to the [Auth0 Blog](https://www.auth0.com/blog/).

> ⚠️ This project is intended for demonstration purposes only and is not meant for production use. ⚠️

## Requirements

To set up and run this sample project, you will need:

* Node.js 18.x or later
* npm, yarn, or pnpm package manager
* [An Auth0 Account](https://auth0.com/signup?place=header&type=button&text=sign%20up)

## To run this application

Follow these steps to get the application running locally:

1. Follow the blog to setup Organizations feature on your Auth0 tenant
1. Clone the branch from GitHub:
   ```bash
   git clone --branch starter --single-branch https://github.com/auth0-blog/nextjs-my-org-api.git
   ```
2. Navigate into the project directory and install dependencies:
   ```bash
   cd nextjs-my-org-api   
   npm install
   ```
4. Create a `.env.local` file in the root directory and add your configuration variables as described in the article.
   ```bash
   AUTH0_DOMAIN='<your-auth0-domain>'
   AUTH0_CLIENT_ID='<your-auth0-client-id>'
   AUTH0_CLIENT_SECRET='<your-auth0-client-secret>'
   # Run `openssl rand -hex 32` in your terminal to generate a random 32-byte hex string
   AUTH0_SECRET='<your-random-32-byte-hex-string>'
   APP_BASE_URL='http://localhost:3000'
   ```

5. Start the development server:
   ```
   npm run dev
   ```
6. The Application will be available at `http://localhost:3000/`.

## License
Copyright 2026 Okta, Inc.

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE.txt) file for more info.