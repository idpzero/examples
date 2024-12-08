import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("auth/callback", "routes/auth/callback.tsx"),
    layout("layouts/protected.tsx", [
        route("dashboard", "routes/dashboard.tsx")
    ]),
    route("logout", "routes/logout.tsx"),
] satisfies RouteConfig;
