import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/default.tsx", [ 
        index("routes/home.tsx"),
        route("auth/callback", "routes/auth/callback.tsx"),
        route("protected", "routes/protected.tsx"),
        route("logout", "routes/logout.tsx"),
    ])
    
] satisfies RouteConfig;
