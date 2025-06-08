import { calculateAmount, calculateTotalHours } from "../helpers";
import { ClientDetails, UserDetails } from "./models";

export const startTimer = async (
    description: string,
    date: Date = new Date()
) => {
    window.localStorage.setItem("isRunning", "true");
    window.localStorage.setItem("description", description);
    window.localStorage.setItem("startedAt", date.valueOf().toString());

    const now = new Date();
    window.localStorage.setItem("timerStartTime", now.valueOf().toString());
};

export const stopTimer = async () => {
    window.localStorage.removeItem("isRunning");
    window.localStorage.removeItem("description");
    window.localStorage.removeItem("startedAt");
    window.localStorage.removeItem("timerStartTime");

    document.title = "Timer";
};

export const addEntry = async (description: string, elapsedSeconds: number) => {
    const { collection, doc, setDoc } = await import("firebase/firestore");
    const { auth, db } = await import("../firebase");
    const _startedAtMS = window.localStorage.getItem("startedAt");

    const totalHours = calculateTotalHours(elapsedSeconds);
    const totalAmount = calculateAmount(10, totalHours);

    const ref = doc(collection(db, "entries"));
    return await setDoc(ref, {
        id: ref.id,
        description,
        elapsedSeconds,
        createdAt: new Date(parseInt(_startedAtMS!)),
        endedAt: new Date(),
        price: 10.0,
        amount: totalAmount,
        userId: auth.currentUser?.uid,
    });
};

/**
 * Updates the description of the entry
 *
 * @param {string} id
 * @param {string} newDescription
 * @returns {promise}
 */
export const updateDescription = async (id: string, newDescription: string) => {
    const { doc, setDoc } = await import("firebase/firestore");
    const { db } = await import("../firebase");

    const ref = doc(db, "entries", id);
    return await setDoc(
        ref,
        {
            description: newDescription,
        },
        { merge: true }
    );
};

/**
 * Updates the date of the entry
 *
 * @param {String} id
 * @param {Date} newDate
 * @returns
 */
export const updateDate = async (id: string, newDate: Date) => {
    const { doc, setDoc } = await import("firebase/firestore");
    const { db } = await import("../firebase");

    const ref = doc(db, "entries", id);

    return await setDoc(
        ref,
        {
            createdAt: newDate,
        },
        { merge: true }
    );
};

export const updateElapsedTime = async (
    id: string,
    newElapsedSeconds: number,
    amount: number
) => {
    const { doc, setDoc } = await import("firebase/firestore");
    const { db } = await import("../firebase");

    const ref = doc(db, "entries", id);
    return await setDoc(
        ref,
        {
            elapsedSeconds: newElapsedSeconds,
            amount: amount,
        },
        { merge: true }
    );
};

export const updatePrice = async (
    id: string,
    price: number,
    amount: number
) => {
    const { doc, setDoc } = await import("firebase/firestore");
    const { db } = await import("../firebase");

    const ref = doc(db, "entries", id);
    return await setDoc(ref, { price, amount }, { merge: true });
};

export const deleteEntry = async (id: string) => {
    const { deleteDoc, doc } = await import("firebase/firestore");
    const { db } = await import("../firebase");

    const ref = doc(db, "entries", id);
    return await deleteDoc(ref);
};

export const getUserDetails = async () => {
    const { doc, getDoc } = await import("firebase/firestore");
    const { auth, db } = await import("../firebase");

    if (!auth.currentUser) throw new Error("No logged in user");

    const ref = doc(db, "users", auth.currentUser.uid);
    return await getDoc(ref);
};

export const getClientDetails = async () => {
    const { doc, getDoc } = await import("firebase/firestore");
    const { auth, db } = await import("../firebase");

    if (!auth.currentUser) throw new Error("No logged in user");

    const ref = doc(db, "clients", auth.currentUser.uid);
    return await getDoc(ref);
};

export const updateUserDetails = async (data: UserDetails) => {
    const { collection, doc, setDoc } = await import("firebase/firestore");
    const { auth, db } = await import("../firebase");

    if (!auth.currentUser) throw new Error("No logged in user");

    const ref = doc(collection(db, "users"), auth.currentUser.uid);
    return await setDoc(ref, data);
};

export const updateClientDetails = async (data: ClientDetails) => {
    const { collection, doc, setDoc } = await import("firebase/firestore");
    const { auth, db } = await import("../firebase");

    if (!auth.currentUser) throw new Error("No logged in user");

    const ref = doc(collection(db, "clients"), auth.currentUser.uid);
    return await setDoc(ref, data);
};
