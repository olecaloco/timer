import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArJy-zAv_x0lyC5IxdU6GyNqrDG2a7YC8",
    authDomain: "timer-f60f4.firebaseapp.com",
    projectId: "timer-f60f4",
    storageBucket: "timer-f60f4.appspot.com",
    messagingSenderId: "1066620665497",
    appId: "1:1066620665497:web:f68a8fb2a11e49b7324208",
};

export const app = initializeApp(firebaseConfig);

export const getAppAuth = async () => {
    const { getAuth } = await import("firebase/auth");
    return getAuth(app);
};

export const getAppFirestore = async () => {
    const { getFirestore } = await import("firebase/firestore");
    return getFirestore(app);
};
