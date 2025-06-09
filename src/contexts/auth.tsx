import {
    createContext,
    Dispatch,
    PropsWithChildren,
    ReactElement,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Unsubscribe, User } from "firebase/auth";
import { ClientDetails, UserDetails } from "../api/models";
import { getClientDetails, getUserDetails } from "../api";

export interface AuthContextProps {
    user: User | null;
    loading: boolean;
    userDetails: UserDetails | null;
    clientDetails: ClientDetails | null;
    setUpdateDetailsFlag: Dispatch<boolean>;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: false,
    userDetails: null,
    clientDetails: null,
    setUpdateDetailsFlag: (update: boolean) => {},
});

interface Props extends PropsWithChildren {}

export default function AuthProvider(props: Props): ReactElement {
    const [user, setUser] = useState<User | null>(null);
    const [updateDetailsFlag, setUpdateDetailsFlag] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [clientDetails, setClientDetails] = useState<ClientDetails | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);
    const { children } = props;

    useEffect(() => {
        const watcher = async () => {
            const { onAuthStateChanged } = await import("firebase/auth");
            const { auth } = await import("../firebase");

            return onAuthStateChanged(auth, (userState) => {
                setUser(userState);
                setLoading(false);
                setUpdateDetailsFlag(true);
            });
        };

        let unsub: Unsubscribe | undefined;
        watcher().then((unsubscribe) => {
            unsub = unsubscribe;
        });

        return () => {
            if (unsub) {
                unsub();
            }
        };
    }, []);

    useEffect(() => {
        if (!updateDetailsFlag || !user) return;

        getUserDetails().then((snapshot) => {
            if (!snapshot.exists()) {
                setUserDetails(null);
            } else {
                const details = snapshot.data() as UserDetails;
                setUserDetails(details);
            }
        });

        getClientDetails().then((snapshot) => {
            if (!snapshot.exists()) {
                setClientDetails(null);
            } else {
                const details = snapshot.data() as ClientDetails;
                setClientDetails(details);
            }
        });

        setUpdateDetailsFlag(false);
    }, [updateDetailsFlag, user]);

    const value = useMemo(
        () => ({
            user,
            userDetails,
            clientDetails,
            loading,
            setUpdateDetailsFlag,
        }),
        [user, userDetails, clientDetails, loading, setUpdateDetailsFlag]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    const values = useContext(AuthContext);
    return values;
};
