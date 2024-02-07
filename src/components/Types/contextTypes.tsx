import { ReactNode } from 'react';

export type UserContextProps = {
    children: ReactNode;
};

export type InitialValue = {
    Loading: boolean;
    Login: (email: string, password: string) => void;
    Loged: boolean;
    Mensage: string | null;
    CreateUser: (
        userName: string ,
        email: string ,
        password: string,
        imgUser: File | null
    ) => (void);
    Status: number | null;
    User:UserProps
};
type UserImages = {
    id?: string | null;
    image: string ;
    userId?: string | null;
};
export type UserProps= {
    msg?: string;
    id?: string;
    userName?: string;
    email?: string;
    password?: string;
    createdAt?: string;
    userImages: UserImages[];
}
