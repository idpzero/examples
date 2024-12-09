import { Link, NavLink, Outlet, useLoaderData } from "react-router";
import { getUserOrNull } from "~/services/auth.server";
import type { Route } from "../+types/root";


export async function loader({ request }: Route.LoaderArgs) {
  return getUserOrNull({request})
}


export default function DefaultLayout() {

  const user = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="p-5 bg-slate-900">
        <div className="flex">
          <div className="flex-1">
            <NavLink to="/" className="text-white hover:underline pr-5">Home</NavLink> <NavLink to="/protected" className="text-white hover:underline">Protected Area</NavLink>
          </div>
          <div className="flex-none">
          {user ? <Link to="/logout" className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Logout</Link> : <span></span> }
          </div>
        </div>
      </div>
      <div className="p-10">
          <Outlet />
      </div>

    </div>
  )
}
