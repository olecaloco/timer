import { useEffect, useState } from "react";
import Home from "./screens/Home";
import Invoice from "./screens/Invoice";

import AppSidebar from "./components/Sidebar";
import { Page } from "./api/models";
import Login from "./screens/Login";
import Settings from "./screens/Settings";

const pages = {
    home: <Home />,
    login: <Login />,
    invoice: <Invoice />,
    settings: <Settings />,
};

function App() {
    const [page, setPage] = useState<Page>("login");

    useEffect(() => {
        const watcher = async () => {
            const { onAuthStateChanged } = await import("firebase/auth");
            const { auth } = await import("./firebase");

            onAuthStateChanged(auth, (user) => {
                if (user) setPage("home");
            });
        };

        watcher();
    }, []);

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
        <main>
            <AppSidebar
                currentPage={page}
                changePage={changePage}
                onLogout={onLogout}
            />

            <section className="content">{pages[page]}</section>
        </main>
    );
}

export default App;
