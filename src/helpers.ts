import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Entry } from "./api/models";

export function convertToHumanTime(seconds: number) {
    const displaySeconds = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const displayMinutes = minutes % 60;

    const formatter = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
    });

    return {
        seconds: formatter.format(displaySeconds),
        minutes: formatter.format(displayMinutes),
        hours: formatter.format(hours),
    };
}

export function calculateNewTotalSeconds(
    hours: string,
    minutes: string,
    seconds: string
) {
    const h = parseInt(hours) * 3600;
    const m = parseInt(minutes) * 60;
    const s = parseInt(seconds);
    const total = h + m + s;

    return total;
}

export const hoursFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
});

export const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "code",
});

export function calculateTotalHours(seconds: number) {
    return Math.round((seconds / 3600 + Number.EPSILON) * 100) / 100;
}

export const converter = {
    toFirestore(entry: Entry) {
        return entry;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
        const data = snapshot.data(options)!;
        return {
            ...data,
            createdAt: data.createdAt.toDate(),
            endedAt: data.endedAt?.toDate(),
        } as Entry;
    },
};

export function calculateAmount(price: number, totalHours: number): number {
    return Math.round((totalHours * price + Number.EPSILON) * 100) / 100;
}

export function formatToHTMLDateValue(date: Date, withDate = false) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const monthLabel = month < 10 ? `0${month}` : month;

    if (withDate) {
        const currentDate = date.getDate();
        const dateLabel = currentDate < 10 ? `0${currentDate}` : currentDate;
        return `${year}-${monthLabel}-${dateLabel}`;
    }

    return `${year}-${monthLabel}`;
}
