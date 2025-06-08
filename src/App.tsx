import AuthProvider from "./contexts/auth";
import Main from "./Main";

function App() {
    return (
        <AuthProvider>
            <Main />
        </AuthProvider>
    );
}

export default App;
