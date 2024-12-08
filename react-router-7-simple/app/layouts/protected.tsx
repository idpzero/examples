import type { Route } from "../routes/+types/home";
import { ensureAuthenticated } from "~/services/auth.server";
import { Link, Outlet  } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  await ensureAuthenticated( { request })

  // // sample showing getting the user.
  // if(user) {
  //   console.log(user)
  // }
}

export default function Protected() {
  return <div>
      <Outlet />
      <Link to="/logout">Logout</Link>
    </div>;
}
