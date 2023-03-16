import { Route, Routes } from "@solidjs/router";
import type { Component } from "solid-js";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Invoice from "./pages/Invoice";

const App: Component = () => {
    return (
        <main class="flex">
            <Sidebar />
            <section class="dark:bg-gray-900 w-full px-5 py-8">
                <Routes>
                    <Route path="/" component={Home} />
                    <Route path="/invoice" component={Invoice} />
                </Routes>
            </section>
        </main>
    );
};

export default App;
