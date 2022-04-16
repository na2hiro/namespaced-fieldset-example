import type {LinksFunction, MetaFunction} from "@remix-run/cloudflare";
import {
    Link,
    Links,
    LiveReload,
    Meta, NavLink,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import {Code} from "~/components/decorated-elements";
import React from "react";

export const links: LinksFunction = () => (
    [
        {
            href: "/styles.css",
            rel: "stylesheet",
        }
    ]
)

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "namespaced-fieldset Examples",
    viewport: "width=device-width,initial-scale=1",
});

const BoldNavLink: React.FC<{ to: string }> = ({to, children}) => {
    return <NavLink to={to} style={({isActive}) => ({
        fontWeight: isActive ? "bold" : "normal",
    })}>{children}</NavLink>
}

export default function App() {
    return (
        <html lang="en">
        <head>
            <Meta/>
            <Links/>
        </head>
        <body>
        <h1>
            <a href="https://github.com/na2hiro/namespaced-fieldset"><Code>namespaced-fieldset</Code></a> Examples
        </h1>
        <ul>
            <li><BoldNavLink to="/">Basic</BoldNavLink></li>
            <li><BoldNavLink to="/nested-namespaces">Nested namespaces</BoldNavLink></li>
            <li><BoldNavLink to="/dynamic-inputs">Dynamic input elements</BoldNavLink></li>
        </ul>
        <hr/>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}
