export const startTimer = async (description: string) => {
    try {
        const { doc, setDoc } = await import("firebase/firestore");
        const { getAppFirestore } = await import("../firebase");
        const db = await getAppFirestore();

        const ref = doc(db, "state", "w1tcGRmCMz1TUolOlh6E");
        return await setDoc(ref, {
            description,
            isRunning: true,
            startedAt: new Date(),
        });
    } catch (e) {
        console.error(e);
    }
};

export const stopTimer = async () => {
    const { doc, setDoc } = await import("firebase/firestore");
    const { getAppFirestore } = await import("../firebase");
    const db = await getAppFirestore();

    const ref = doc(db, "state", "w1tcGRmCMz1TUolOlh6E");
    return await setDoc(ref, {
        description: null,
        isRunning: false,
        startedAt: null,
    });
};

export const addEntry = async (description: string, elapsedSeconds: number) => {
    const { collection, doc, setDoc } = await import("firebase/firestore");
    const { getAppFirestore } = await import("../firebase");
    const db = await getAppFirestore();

    const ref = doc(collection(db, "entries"));
    return await setDoc(ref, {
        id: ref.id,
        description,
        elapsedSeconds,
        createdAt: new Date(),
        price: 10.0,
        amount: 0,
    });
};

export const updateDescription = async (id: string, newDescription: string) => {
    const { doc, setDoc } = await import("firebase/firestore");
    const { getAppFirestore } = await import("../firebase");
    const db = await getAppFirestore();

    const ref = doc(db, "entries", id);
    return await setDoc(
        ref,
        {
            description: newDescription,
        },
        { merge: true }
    );
};

export const updateDate = async (id: string, newDate: Date) => {
    const { doc, setDoc } = await import("firebase/firestore");
    const { getAppFirestore } = await import("../firebase");
    const db = await getAppFirestore();

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
    newElapsedSeconds: number
) => {
    const { doc, setDoc } = await import("firebase/firestore");
    const { getAppFirestore } = await import("../firebase");
    const db = await getAppFirestore();

    const ref = doc(db, "entries", id);
    return await setDoc(
        ref,
        {
            elapsedSeconds: newElapsedSeconds,
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
    const { getAppFirestore } = await import("../firebase");
    const db = await getAppFirestore();

    const ref = doc(db, "entries", id);
    return await setDoc(ref, { price, amount }, { merge: true });
};

export const deleteEntry = async (id: string) => {
    try {
        const { deleteDoc, doc } = await import("firebase/firestore");
        const { getAppFirestore } = await import("../firebase");
        const db = await getAppFirestore();

        const ref = doc(db, "entries", id);
        return await deleteDoc(ref);
    } catch (e) {
        console.error(e);
    }
};
