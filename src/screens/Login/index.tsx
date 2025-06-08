import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../contexts/auth";

const Login = () => {
    const { loading: userFetchLoading } = useAuth();
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);

            const { GoogleAuthProvider, signInWithPopup } = await import(
                "firebase/auth"
            );
            const { auth } = await import("../../firebase");

            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center flex-column gap-2 w-100 h-100">
            <h1>Welcome to Timeria</h1>
            <p>A simple single client timer app with invoicing.</p>
            <Button
                variant="light"
                onClick={onLogin}
                disabled={loading || userFetchLoading}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 533.5 544.3"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.4H272v95.2h146.9c-6.3 33.7-25.1 62.2-53.5 81.1v67.4h86.6c50.8-46.8 81.5-115.7 81.5-193.3z"
                        fill="#4285F4"
                    />
                    <path
                        d="M272 544.3c72.6 0 133.5-24.1 178-65.3l-86.6-67.4c-23.9 16-54.5 25.4-91.4 25.4-70.3 0-129.9-47.5-151.2-111.2H30.1v69.8C74.8 482.9 166.8 544.3 272 544.3z"
                        fill="#34A853"
                    />
                    <path
                        d="M120.8 325.8c-10.3-30.6-10.3-63.6 0-94.2V161.8H30.1c-32.1 64.1-32.1 140.7 0 204.8l90.7-70.8z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M272 107.1c39.4 0 75 13.6 103 40.2l77.1-77.1C405.5 24.1 344.6 0 272 0 166.8 0 74.8 61.4 30.1 161.8l90.7 70.8C142.1 154.6 201.7 107.1 272 107.1z"
                        fill="#EA4335"
                    />
                </svg>
                <span className="ms-2">Login with Google</span>
            </Button>
        </div>
    );
};

export default Login;
