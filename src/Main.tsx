import { useEffect, useState } from "react";
import { useAuth } from "./contexts/auth";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Invoice from "./screens/Invoice";
import Settings from "./screens/Settings";
import AppSidebar from "./components/Sidebar";
import { Page } from "./api/models";
import { Container } from "react-bootstrap";
import { Route, Switch, useLocation } from "wouter";

const pages = {
    home: <Home />,
    login: <Login />,
    invoice: <Invoice />,
    settings: <Settings />,
};

export default function Main() {
    const [location, navigate] = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            if (location === "/login") navigate("/");
        }
    }, [location, user]);

    const onLogout = async () => {
        try {
            const { signOut } = await import("firebase/auth");
            const { auth } = await import("./firebase");

            await signOut(auth);
            navigate("/login");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Container className="d-flex h-100">
            {user && <AppSidebar onLogout={onLogout} />}

            <section className="content">
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/invoice" component={Invoice} />
                    <Route path="/settings" component={Settings} />
                    <Route>404: No such page!</Route>
                </Switch>
            </section>
        </Container>
    );
}
