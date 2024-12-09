import { createCookie, redirect } from "react-router";
import { sessionStorage } from "./session.server";
import { Authenticator } from "remix-auth";
import { OAuth2Strategy } from "remix-auth-oauth2";
import { jwtDecode } from "jwt-decode";

export class User {
  id: string;
  token: string;
  
  constructor(id: string, token: string) {
      this.id = id;
      this.token = token;
  }
}
const strategyName = "auth";

// cookie used to store the return path
let returnUrlCookie = createCookie("_rdr");

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>()

let strategy = new OAuth2Strategy({
    clientId: "web",
    authorizationEndpoint: "http://localhost:4379/authorize",
    tokenEndpoint: "http://localhost:4379/oauth/token",
    clientSecret: "458b1662639dbcd8a4c2ca3157ddaf9536fe6e77",
    scopes: ["openid", "email", "profile"],
    cookie: "_auth",
    redirectURI: "http://localhost:5173/auth/callback",
  },
  async ({ tokens, request }) => {
    const decoded = jwtDecode(tokens.idToken());
    return new User(decoded.sub!,tokens.idToken());
  },
);

authenticator.use(strategy,strategyName);

/**
 * Process logout operation. Will abandon the session and redirect to the default url.
 *
 * @param request - The request to use for processing the callback
 * @throws {Response} - A redirect to the default URL ('/')
 */
export let logout = async ({ request }: { request: Request }) => {
  let session = await sessionStorage.getSession(request.headers.get("cookie"));

  throw redirect("/", {
    headers: [
      ["Set-Cookie", await sessionStorage.destroySession(session)]
    ],
  });
}

/**
 * Process the callback from the authentication provider.
 *
 * @param request - The request to use for processing the callback
 * @throws {Response} - A redirect to the return URL (if available) or '/'
 */
export let callback = async ({ request }: { request: Request }) => {
  var user  = await authenticator.authenticate(strategyName, request);
  let session = await sessionStorage.getSession(request.headers.get("cookie"));

  session.set("user", user);

  var rdr : string = await returnUrlCookie.parse(request.headers.get("cookie"));

  if (!rdr) {
      rdr = "/";
  }

  // redirect but commit the session, and remove the return url cookie
  throw redirect(rdr, {
      headers: [
        ["Set-Cookie", await sessionStorage.commitSession(session)],
        ["Set-Cookie", await returnUrlCookie.serialize("", { maxAge: 1})] // expire it immediately
      ],
  });
}


/**
 * Return the current authenticated user, or initiate the authentication process if not authenticated.
 *
 * @param request - The request being used to check for authentication
 * @returns The authenticated user if authenticated
 * @throws {Response} - A redirect response to initiate the authentication process
 */
export let ensureAuthenticated = async ({ request }: { request: Request }) : Promise<User> => {
  let session = await sessionStorage.getSession(request.headers.get("cookie"));
  let user : User = session.get("user");
  
  if (user) {
    return user;
  }

  // if not authenticated, initiate the authentication process
  try {
    return await authenticator.authenticate(strategyName, request);
  }
  catch (e) {
    if (e instanceof Response) {
      // we add in the cookie for the return URL so we can redirect back to it after authentication
      e.headers.append("Set-Cookie", await returnUrlCookie.serialize(request.url || "/"));
    }

    throw e;
  }
}

export let getUserOrNull = async ({ request }: { request: Request }) : Promise<User | null> => {
  let session = await sessionStorage.getSession(request.headers.get("cookie"));
  let user : User = session.get("user");
  
  if (user) {
    return user;
  }

  return null
}