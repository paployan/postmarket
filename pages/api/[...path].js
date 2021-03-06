import httpProxy from 'http-proxy';
import Cookies from 'cookies';
import url from 'url';
// Get the actual API_URL as an environment variable. For real
// applications, you might want to get it from 'next/config' instead.
const API_URL = process.env.API_URL;
const proxy = httpProxy.createProxyServer({
  target: {
    protocol: 'https:',
    host: 'gevorgyan.pro',
    port: 443,
  },
  changeOrigin: true,
});
// You can export a config variable from any API route in Next.js.
// We'll use this to disable the bodyParser, otherwise Next.js
// would read and parse the entire request body before we
// can forward the request to the API. By skipping the bodyParser,
// we can just stream all requests through to the actual API.
export const config = {
  api: {
    bodyParser: false
  },
};

export default (req, res) => {
  // Return a Promise to let Next.js know when we're done
  // processing the request:
  return new Promise((resolve, reject) => {
    // In case the current API request is for logging in,
    // we'll need to intercept the API response.
    // More on that in a bit.
    const {pathname} = url.parse(req.url);
    const isLogin = pathname === '/api/auth/login';
    // Get the `access_token` cookie:
    const cookies = new Cookies(req, res)
    const access_token = cookies.get('access-token')
    // Rewrite the URL: strip out the leading '/api'.
    // For example, '/api/login' would become '/login'.
    // ️You might want to adjust this depending
    // on the base path of your API.
    req.url = req.url.replace(/^\/api/, '')
    // Don't forward cookies to the API:
    req.headers.cookie = ''
    // Set access_token header from cookie:
    if (access_token) {
        req.headers['access-token'] = access_token;
    }
    // In case the request is for login, we need to
    // intercept the API's response. It contains the
    // auth token that we want to strip out and set
    // as an HTTP-only cookie.
    if (isLogin) {
        proxy.once('proxyRes', interceptLoginResponse)
    }
    // Don't forget to handle errors:
    proxy.once('error', reject)
    // Forward the request to the API
    proxy.web(req, res, {
      target: API_URL,
      // Don't autoRewrite because we manually rewrite
      // the URL in the route handler.
      autoRewrite: false,
      // In case we're dealing with a login request,
      // we need to tell http-proxy that we'll handle
      // the client-response ourselves (since we don't
      // want to pass along the auth token).
      selfHandleResponse: isLogin
    })
    function interceptLoginResponse(proxyRes, req, res) {
      // Read the API's response body from
      // the stream:
      let apiResponseBody = ''
      proxyRes.on('data', (chunk) => {
          apiResponseBody += chunk
      })
      // Once we've read the entire API
      // response body, we're ready to
      // handle it:
      proxyRes.on('end', () => {
        try {
          // Extract the access_token from API's response:
          const responseBody = JSON.parse(apiResponseBody)
          if (!responseBody['access-token']) {
            reject(responseBody.message);
            res.status(422).json(responseBody)
          }
          // // Set the access_token as an HTTP-only cookie.
          // // We'll also set the SameSite attribute to
          // // 'lax' for some additional CSRF protection.
          const cookies = new Cookies(req, res);
          const dt = new Date();
          dt.setMinutes(dt.getMinutes() + responseBody.expires_in);
          cookies.set('access-token', responseBody['access-token'], {
            expires: dt,
            httpOnly: true,
            sameSite: 'lax',
          })
          // Our response to the client won't contain
          // the actual access_token. This way the auth token
          // never gets exposed to the client.
          res.status(200).json({
            loggedIn: true,
            user: responseBody.user,
          })
          resolve();
        } catch (err) {
          reject(err)
        }
      })
    }
  });
};
