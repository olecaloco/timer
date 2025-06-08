export type Page = "home" | "invoice" | "login" | "settings";

export interface Entry {
    id: string;
    amount: number;
    createdAt: Date;
    description: string;
    elapsedSeconds: number;
    endedAt?: Date;
    price: number;
    userId: string;
}

export interface UserDetails {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
}

export interface ClientDetails extends UserDetails {}
