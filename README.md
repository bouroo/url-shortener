# URL Shortener

This is a simple URL shortener built with Cloudflare Workers, Vue.js, and Hono.

## Setup

1.  Install dependencies:

    ```bash
    bun install
    ```

2.  Create a `.env` file and add your Turnstile sitekey:

    ```
    VITE_TURNSTILE_SITEKEY="YOUR_TURNSTILE_SITEKEY"
    ```

3.  Start the development server:

    ```bash
    wrangler dev
    ```

## Usage

1.  Open your browser to `http://localhost:8787`.
2.  Enter a long URL in the input field.
3.  Complete the CAPTCHA.
4.  Click the "Shorten" button.
5.  The shortened URL will be displayed below the form.
