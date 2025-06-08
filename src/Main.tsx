import { useEffect, useState } from "react";
import { useAuth } from "./contexts/auth";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Invoice from "./screens/Invoice";
import Settings from "./screens/Settings";
import AppSidebar from "./components/Sidebar";
import { Page } from "./api/models";
import { Container } from "react-bootstrap";

const pages = {
    home: <Home />,
    login: <Login />,
    invoice: <Invoice />,
    settings: <Settings />,
};

export default function Main() {
    const [page, setPage] = useState<Page>("login");
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setPage("login");
        } else {
            if (page === "login") setPage("home");
        }
    }, [page, user]);

    const onLogout = async () => {
        try {
            const { signOut } = await import("firebase/auth");
            const { auth } = await import("./firebase");

            await signOut(auth);
            setPage("login");
        } catch (e) {
            console.error(e);
        }
    };

    const changePage = (value: Page) => {
        setPage(value);
    };

    return (
        <Container className="d-flex h-100">
            {user && (
                <AppSidebar
                    currentPage={page}
                    changePage={changePage}
                    onLogout={onLogout}
                />
            )}

            <section className="content">{pages[page]}</section>
        </Container>
    );
}
