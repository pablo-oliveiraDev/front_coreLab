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
    const [User, SetUser] = useState<any>(null);
    const [Loged, SetLoged] = useState<boolean>(false);
    const [Status, SetStatus] = useState<number | null>(null);
    const [Mensage, SetMensage] = useState<string | null>(null);
    const [Trigger, SetTrigger] = useState<boolean>(false);
    const [DataTasks, SetDataTasks] = useState<any>();
    const router = useRouter();
    let userId: string | null;
    const HandleSetStorage = async (item: T.UserProps) => {
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

        try {
            SetLoading(true);
            await Api.post('/login', NewData).then(res => {
                HandleSetStorage(res.data.login);
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
    if (Status === 200 || !!User) {
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

    const CreateTask = async (userId: string, titulo: string, task: string) => {
        SetLoading(true);
        let taskData: T.TaskProps = {
            userId: userId,
            titulo: titulo,
            task: task
        };

        if (!!taskData) {
            try {
                await Api.post('/createTask', taskData).then(res => {
                    SetStatus(res.status);
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

    useEffect(() => {
        async function getDataTasks() {
            let taskData: any = {
                userId: User?.id
            };
            if (User !== null && User !== undefined) {
                await Api.get('/findTaskByUser', taskData).then(res => {
                    SetDataTasks(res.data.tasks[0]);
                });
            }
        }
        getDataTasks();
    }, [User]);
    console.log(DataTasks);
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
                CreateTask,
                DataTasks
            }}
        >
            {children}
        </StoreNotesContext.Provider>
    );
};

export default StoreNotesProvider;
