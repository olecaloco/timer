import { Nav } from "react-bootstrap";
import { Page } from "../api/models";

interface Props {
    currentPage: Page;
    changePage: (value: Page) => void;
    onLogout: () => void;
}

const Sidebar: React.FC<Props> = ({ currentPage, changePage, onLogout }) => (
    <aside className="sidebar p-3">
        <Nav variant="pills" className="flex-column gap-2">
            <Nav.Item>
                <Nav.Link
                    className={`
                    d-flex align-items-center gap-2
                    ${currentPage === "home" ? "text-white" : "text-muted"}
                    `}
                    active={currentPage === "home"}
                    disabled={currentPage === "login"}
                    onClick={() => changePage("home")}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        style={{
                            width: "2rem",
                            height: "2rem",
                        }}
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="sidebar-label">Timer</span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    className={`
                    d-flex align-items-center gap-2
                    ${currentPage === "invoice" ? "text-white" : "text-muted"}
                    `}
                    active={currentPage === "invoice"}
                    disabled={currentPage === "login"}
                    onClick={() => changePage("invoice")}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        style={{
                            width: "2rem",
                            height: "2rem",
                        }}
                    >
                        <path
                            fillRule="evenodd"
                            d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="sidebar-label">Invoice</span>
                </Nav.Link>
            </Nav.Item>
        </Nav>
        {currentPage !== "login" && (
            <Nav variant="pills" className="flex-column gap-2">
                <Nav.Item>
                    <Nav.Link
                        className={`
                    d-flex align-items-center gap-2
                    ${currentPage === "settings" ? "text-white" : "text-muted"}
                    `}
                        active={currentPage === "settings"}
                        onClick={() => changePage("settings")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                width: "2rem",
                                height: "2rem",
                            }}
                        >
                            <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                            <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                            <path d="M12 2v2" />
                            <path d="M12 22v-2" />
                            <path d="m17 20.66-1-1.73" />
                            <path d="M11 10.27 7 3.34" />
                            <path d="m20.66 17-1.73-1" />
                            <path d="m3.34 7 1.73 1" />
                            <path d="M14 12h8" />
                            <path d="M2 12h2" />
                            <path d="m20.66 7-1.73 1" />
                            <path d="m3.34 17 1.73-1" />
                            <path d="m17 3.34-1 1.73" />
                            <path d="m11 13.73-4 6.93" />
                        </svg>
                        <span className="sidebar-label">Settings</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        className="d-flex align-items-center gap-2 text-muted"
                        onClick={onLogout}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            style={{
                                width: "2rem",
                                height: "2rem",
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                            />
                        </svg>

                        <span className="sidebar-label">Log out</span>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        )}
    </aside>
);

export default Sidebar;
