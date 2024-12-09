import type { Route } from "./+types/home";
import { ensureAuthenticated } from "~/services/auth.server";
import { Link, Outlet, useLoaderData  } from "react-router";
import { jwtDecode } from "jwt-decode";

export async function loader({ request, params }: Route.LoaderArgs) {
  var user = await ensureAuthenticated( { request })

  return { user };
}

export default function Protected() {

  const { user } = useLoaderData<typeof loader>();

  const decoded = jwtDecode(user.token);

  return (<div>
      
      <h1 className="text-2xl">Welcome <span className="font-bold"> {user.id}</span></h1>

      <p className="pt-10">
      This is a protected area. Here are the claims that were in the id_token (and saved to the session).
      </p>
      <div>
        <pre className="text-xs py-5">
          {JSON.stringify(decoded, null, 2)}
        </pre>
      </div>
      <div>
        Want to login as someone else? <Link to="/logout">Logout</Link> and test out the flow again!
      </div>
    </div>)
}
