import {
    createContext,
    PropsWithChildren,
    ReactElement,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Unsubscribe, User } from "firebase/auth";
import { ClientDetails, UserDetails } from "../api/models";

export interface AuthContextProps {
    user: User | null;
    userDetails: UserDetails | null;
    clientDetails: ClientDetails | null;
    refetchData: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    userDetails: null,
    clientDetails: null,
    refetchData: () => {},
});

interface Props extends PropsWithChildren {}

export default function AuthProvider(props: Props): ReactElement {
    const [user, setUser] = useState<User | null>(null);
    const [refetch, setRefetch] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [clientDetails, setClientDetails] = useState<ClientDetails | null>(
        null
    );
    const { children } = props;

    const fetchUserDetails = async () => {
        try {
            const { getUserDetails } = await import("../api");
            const snapshot = await getUserDetails();

            if (!snapshot.exists()) {
                setUserDetails(null);
                return;
            }

            const data = snapshot.data() as UserDetails;
            setUserDetails(data);
        } catch (error: any) {
            console.warn(error);
        }
    };

    const fetchClientDetails = async () => {
        try {
            const { getClientDetails } = await import("../api");
            const snapshot = await getClientDetails();

            if (!snapshot.exists()) {
                setClientDetails(null);
                return;
            }

            const data = snapshot.data() as ClientDetails;
            setClientDetails(data);
        } catch (error: any) {
            console.warn(error);
        }
    };

    useEffect(() => {
        const watcher = async () => {
            const { onAuthStateChanged } = await import("firebase/auth");
            const { auth } = await import("../firebase");

            return onAuthStateChanged(auth, setUser);
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
        if (!user) return;

        void fetchUserDetails();
        void fetchClientDetails();
    }, [refetch, user]);

    const value = useMemo(
        () => ({
            user,
            userDetails,
            clientDetails,
            refetchData: () => setRefetch((prev) => !prev),
        }),
        [user, userDetails, clientDetails]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    const values = useContext(AuthContext);
    return values;
};
