# URL Shortener

This is a simple, fast, and secure URL shortener built using Cloudflare Workers for the backend API and Vue.js for the frontend user interface. It leverages Cloudflare's global network for low-latency redirects and includes CAPTCHA verification (Turnstile) to prevent abuse.

## Features

*   **Fast URL Shortening:** Quickly generate short URLs for long links.
*   **Cloudflare Workers Backend:** Utilizes Cloudflare's edge network for high performance and scalability.
*   **Vue.js Frontend:** A responsive and intuitive user interface for easy URL shortening.
*   **CAPTCHA Protection:** Integrates Cloudflare Turnstile to mitigate spam and abuse.
*   **Customizable Short Codes:** (If applicable, otherwise remove or modify) Users can specify custom short codes for their URLs.
*   **Analytics:** (If applicable, otherwise remove or modify) Basic tracking for shortened URL clicks.

## Technologies Used

*   **Backend:**
    *   [Cloudflare Workers](https://workers.cloudflare.com/): Serverless platform for the API.
    *   [Hono](https://hono.dev/): A small, fast, and modern web framework for Cloudflare Workers.
    *   [Cloudflare KV](https://developers.cloudflare.com/workers/runtime-apis/kv/): Key-value store for storing URL mappings.
*   **Frontend:**
    *   [Vue.js 3](https://vuejs.org/): Progressive JavaScript framework for building user interfaces.
    *   [Vite](https://vitejs.dev/): Next-generation frontend tooling for fast development.
    *   [TypeScript](https://www.typescriptlang.org/): Type-safe JavaScript.
*   **Other:**
    *   [Bun](https://bun.sh/): Fast all-in-one JavaScript runtime and package manager.
    *   [Wrangler](https://developers.cloudflare.com/workers/wrangler/): Cloudflare Workers CLI for development and deployment.

## Project Structure

The project is organized into two main parts:

*   `app/backend/`: Contains the Cloudflare Worker (Hono) application responsible for handling URL shortening and redirection logic.
*   `app/frontend/`: Contains the Vue.js application that provides the user interface for interacting with the URL shortener.

## Setup

To get the project up and running locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/bouroo/url-shortener.git
    cd url-shortener
    ```

2.  **Install dependencies:**

    Navigate to the root of the project and install all necessary dependencies using Bun:

    ```bash
    bun install
    ```

3.  **Configure Cloudflare Turnstile:**

    Create a `.env` file in the root directory of the project (`/mnt/d/Works/bouroo/url-shortener/.env`) and add your Cloudflare Turnstile sitekey. You can obtain a sitekey by setting up a new Turnstile widget in your Cloudflare dashboard.

    ```
    VITE_TURNSTILE_SITEKEY="YOUR_TURNSTILE_SITEKEY"
    ```

4.  **Start the development server:**

    From the project root, start the local development server. This will run both the backend Worker and the frontend application, making them accessible locally.

    ```bash
    wrangler dev
    ```

## Usage

Once the development server is running:

1.  Open your web browser and navigate to `http://localhost:8787` (or the address provided by `wrangler dev`).
2.  You will see the URL shortener interface.
3.  Enter a long URL into the input field.
4.  Complete the Cloudflare Turnstile CAPTCHA challenge.
5.  Click the "Shorten" button.
6.  The shortened URL will be displayed below the form. You can copy this URL and use it.

## Deployment

This application is designed to be deployed on Cloudflare Workers. You can deploy it using the Wrangler CLI:

1.  Ensure you are logged in to Cloudflare via Wrangler:

    ```bash
    wrangler login
    ```

2.  Deploy the Worker and frontend:

    ```bash
    wrangler deploy
    ```

    Follow the prompts to deploy your application.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.