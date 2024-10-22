import { useState } from "react";
import Button from "react-bootstrap/Button";

const Login = () => {
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
        <div className="pt-3 px-3">
            <Button onClick={onLogin} disabled={loading}>
                Login with Google
            </Button>
        </div>
    );
};

export default Login;
