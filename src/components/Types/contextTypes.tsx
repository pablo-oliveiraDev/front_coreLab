import { ReactNode } from 'react';

export type UserContextProps = {
    children: ReactNode;
};

export type InitialValue = {
    Loading: boolean;
    Login: (email: string, password: string) => void;
};
export interface UserProps {
    id: string;
    userName: string;
    email: string;
    password: string;
    createdAt?: string;
    userImages: {
        id?: string;
    };
}
