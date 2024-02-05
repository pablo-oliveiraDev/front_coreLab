import { ReactNode } from 'react';

export type UserContextProps = {
    children: ReactNode;
};

export type InitialValue = {
    Loading: boolean;
    Login: (email: string, password: string) => void;
    Loged: boolean;
    Mensage: string;
};
type UserImages = {
    id?: string;
    image?: string;
    userId?: string;
};
export interface UserProps {
    msg?: string;
    id?: string;
    userName?: string;
    email?: string;
    password?: string;
    createdAt?: string;
    userImages?: UserImages[];
}
