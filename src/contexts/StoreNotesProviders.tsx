'use client';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as T from '@/components/Types/contextTypes';
import Api from '@/components/Services/api';
import { toast } from 'react-toastify';

export const StoreNotesContext = createContext<T.InitialValue>(
    {} as T.InitialValue
);

export const StoreNotesProvider = ({ children }: T.UserContextProps) => {
    const [Loading, SetLoading] = useState<boolean>(false);
    const [User, SetUser] = useState<T.UserProps | null>(
        {} as T.UserProps | null
    );
    const [Loged, SetLoged] = useState<boolean>(false);
    const [Status, SetStatus] = useState<number | null>(null);
    const [Mensage, SetMensage] = useState<string | null>(null);
    const [Trigger, SetTrigger] = useState<boolean>(false);
    const router = useRouter();
    const HandleSetStorage = async (item: T.UserProps | null) => {
        if (item) {
            window.localStorage.setItem('User', JSON.stringify(item));
        }
    };
    useEffect(() => {
        function LoadStorage() {
            const storageUser = window.localStorage.getItem('User');
            if (storageUser !== null && storageUser !== undefined) {
                SetUser(JSON.parse(storageUser));
                SetLoged(true);
            }
        }
        LoadStorage();
    }, []);
    async function Login(email: string, password: string) {
        let NewData = {
            email: email,
            password: password
        };
        let userImage: any;
        try {
            SetLoading(true);
            await Api.post('/login', NewData).then(res => {
                HandleSetStorage(res.data);
                SetStatus(res.status);
                SetMensage(res.data.msg);
                SetLoged(true);
            });
        } catch (error: any) {
            console.log('login error: ' + error + 'msg :' + User?.msg);
            SetUser(null);
        } finally {
            setTimeout(function () {
                SetLoading(false);
            }, 4000);
        }
    }
    if (Status === 200 || !!User?.msg) {
        router.push('/notes', { scroll: false });
    }

    const Logout = async () => {
        SetLoged(false);
        SetUser(null);
        window.localStorage.removeItem('User');
        router.push('/');
    };

    const CreateUser = async (
        userName: string,
        email: string,
        password: string,
        imgUser: File | null
    ) => {
        if (userName && email && password) {
            let data = {
                userName: userName,
                email: email,
                password: password,
                imgUser: imgUser
            };
            try {
                SetLoading(true);
                await Api.post('/createUser', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    SetStatus(res.status);
                    SetMensage(res.data.msg);
                });
            } catch (err) {
                console.log('createUser error :' + err + '\n msg:' + Mensage);
                console.log(Status);
                SetMensage('');
            } finally {
                SetStatus(null);
                SetMensage('');
                setTimeout(function () {
                    SetLoading(false);
                }, 4000);
            }
        }
    };
    const CreateTask = async (
        id: string,
        userId: string,
        titulo: string,
        task: string
    ) => {
        SetLoading(true);
        let data: T.TaskProps = {
            id: id,
            userId: userId,
            titulo: titulo,
            task: task
        };

        if (!!data) {
            try {
                await Api.post('/createTask', data).then(res => {
                    SetStatus(res.status);
                    SetMensage(res.data.msg);
                });
            } catch (err) {
                SetLoading(false);
                console.log(err);
                toast.error(`Erro ao criar a tarefa`);
            } finally {
                setTimeout(function () {
                    SetLoading(false);
                }, 4000);
                toast.success(`Tarefa Criada com Sucesso!`);
            }
        }
    };
    return (
        <StoreNotesContext.Provider
            value={{
                Loading,
                Login,
                Loged,
                Mensage,
                Status,
                CreateUser,
                User,
                Logout,
                SetLoged,
                Trigger,
                SetTrigger,
                CreateTask
            }}
        >
            {children}
        </StoreNotesContext.Provider>
    );
};

export default StoreNotesProvider;
