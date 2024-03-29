import { Dispatch, ReactNode, SetStateAction } from 'react';

export type UserContextProps = {
    children: ReactNode;
};

export type InitialValue = {
    Loading: boolean;
    Login: (email: string, password: string) => void;
    Loged: boolean;
    Mensage: string | null;
    CreateUser: (
        userName: string,
        email: string,
        password: string,
        imgUser: File | null
    ) => void;
    Status: number | null;
    User: UserProps[] | null;
    Logout: () => void;
    SetLoged: Dispatch<SetStateAction<boolean>>;
    Trigger: boolean;
    SetTrigger: Dispatch<SetStateAction<boolean>>;
    CreateTask: (userId: any, titulo: string, task: string) => void;
    DataTasks:DataTask[] ;
};
type UserImages = {
    id: string | null;
    image: string;
    userId: string | null;
};
export interface UserProps {
    msg: string;
    id: string;
    userName: string;
    email: string;
    password: string;
    createdAt?: string;
    userImages: UserImages[];
};
export interface TaskProps {
    userId: string | undefined;
    titulo: string;
    task: string;
}
export interface DataTask {
    completedAt: string |null;
    createdAt: string;
    id: string;
    task: string;
    titulo: string;
    updatedAt:string| null;
    userId: string;
}
