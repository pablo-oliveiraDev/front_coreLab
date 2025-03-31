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
    const [user, setUser] = useState<T.UserProps | null>(null);
    const [Loged, SetLoged] = useState<boolean>(false);
    const [Status, SetStatus] = useState<number | null>(null);
    const [Mensage, SetMensage] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [Trigger, SetTrigger] = useState<boolean>(false);
    const [DataTasks, SetDataTasks] = useState<T.DataTask[]>([]);
    const router = useRouter();
    let userId: string | null;
    const HandleSetStorage = async (item: string) => {
        if (!!item || item.trim() !== '') {
            window.localStorage.setItem('User', JSON.stringify(item));
        }
    };
    useEffect(() => {
        function LoadStorage() {
            const storageUser = window.localStorage.getItem('User');
            if (storageUser !== null && storageUser !== undefined) {
                const dataParse = JSON.parse(storageUser);
                setUser(dataParse.user);
                setToken(dataParse.token);
                console.log('user :' + dataParse.user.nomeUser);
                SetLoged(true);
            }
        }
        LoadStorage();
    }, [setToken]);

    async function Login(email: string, senha: string) {
        let NewData = {
            email: email,
            senha: senha
        };

        try {
            SetLoading(true);
            await Api.post('/login', NewData).then(res => {
                HandleSetStorage(res.data);
                SetStatus(Number(res.status));
                SetMensage(res.data.message);
                SetLoged(true);
                console.log('status:' + Number(res.status));
            });
        } catch (error: any) {
            console.log('login error: ' + error + 'msg :' + user?.msg);
            SetMensage(error.toString());
        } finally {
            await setTimeout(function () {
                SetLoading(false);
            }, 4500);
            router.push('/notes', { scroll: false })!;
        }
    }
    if (Status === 200 || !!token) {
        router.push('/notes', { scroll: false });
    }

    const Logout = async () => {
        try {
            SetLoged(true);
            window.localStorage.removeItem('User');
            router.push('/')!;
        } catch (err) {
        } finally {
            setUser(null);
            SetLoged(false);
            SetMensage(null);
        }
    };

    const CreateUser = async (
        userName: string,
        email: string,
        password: string
    ) => {
        if (userName && email && password) {
            let data = {
                nomeUser: userName,
                email: email,
                senha: password
            };
            try {
                SetLoading(true);
                await Api.post('/users', data, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    SetStatus(res.data.status);
                    SetMensage(res.data.message);
                });
            } catch (err) {
                console.log('createUser error :' + err + '\n msg:' + Mensage);
                console.log(Status);
                SetMensage(Mensage);
            } finally {
                SetStatus(null);
                SetMensage('');
                setTimeout(function () {
                    SetLoading(false);
                }, 4000);

                Login(email, password)!;
            }
        }
    };

    const CreateTask = async (
        titulo: string,
        task: string,
        status: string,
        user_id: number,
        categoria_id: number
    ): Promise<void> => {
        SetLoading(true);
        let taskData: T.TaskProps = {
            titulo: titulo,
            descricao: task,
            status: status,
            user_id: user_id,
            categoria_id: categoria_id
        };

        if (!!taskData) {
            try {
                await Api.post('/tasks', taskData).then(res => {
                    SetStatus(Number(res.data.status));
                    SetMensage(res.data.msg);
                });
                toast.success(`Tarefa Criada com Sucesso!`);
            } catch (err) {
                SetLoading(false);
                console.log(err);
                toast.error(`Erro ao criar a tarefa`);
            } finally {
                setTimeout(function () {
                    SetLoading(false);
                }, 4000);
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
                token,
                CreateUser,
                user,
                Logout,
                SetLoged,
                SetLoading,
                Trigger,
                SetTrigger,
                CreateTask,
                DataTasks
            }}
        >
            {children}
        </StoreNotesContext.Provider>
    );
};

export default StoreNotesProvider;
