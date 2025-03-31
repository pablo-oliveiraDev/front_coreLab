import { Dispatch, ReactNode, SetStateAction } from 'react';

export type UserContextProps = {
    children: ReactNode;
};

export type InitialValue = {
    Loading: boolean;
    Login: (email: string, senha: string) => void;
    Loged: boolean;
    Mensage: string | null;
    token: string | null;
    CreateUser: (nomeUser: string, email: string, senha: string) => void;
    Status: number | null;
    user: UserProps | null;
    Logout: () => void;
    SetLoged: Dispatch<SetStateAction<boolean>>;
    SetLoading: Dispatch<SetStateAction<boolean>>;
    Trigger: boolean;
    SetTrigger: Dispatch<SetStateAction<boolean>>;
    CreateTask: (
        titulo: string,
        task: string,
        status: string,
        user_id: number,
        categoria_id: number
    ) => Promise<void>;
    DataTasks: DataTask[];
};
type UserImages = {
    id: string | null;
    image: string;
    userId: string | null;
};
export interface UserProps {
    id?: string;
    token?: string;
    msg: string;
    nomeUser: string;
    email: string;
    senha: string;
    createdAt?: string;
}
export interface TaskProps {
    id?: number;
    titulo: string;
    descricao: string;
    status: string;
    user_id?: number;
    categoria_id?: number;
}
export interface DataTask {
    completedAt?: string | null;
    createdAt?: string;
    id: string;
    task: string;
    titulo: string;
    nome_categoria: string;
    status: string;
    updatedAt?: string | null;
    userId: string;
}

export type collors = {
    setCollors: Dispatch<SetStateAction<number>>;
};
