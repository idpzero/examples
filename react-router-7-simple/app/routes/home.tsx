import type { Route } from "./+types/home";
import { NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl">Hello!</h1>

      <div className="pt-10">
        This is a demo showcasing the integration of <span className="idpzero">idpzero</span> with React Router 7 using the OAuth2 protocol. Within this example, we get an id_token and setup a session based on that token.
      </div>

      <div className="py-10">
        Head over to the <NavLink to="/protected" className="text-blue-700 hover:underline dark:text-blue-500">protected area</NavLink> to test out the authentication flows.
      </div>
      <div>
        Thanks for giving it a whirl! <br/><br/><br/>
        Cheers,<br/>
        <span className="idpzero">idpzero</span> Contributors
      </div>
    </div>
  )
}
