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
    const [User, SetUser] = useState<T.UserProps>({} as T.UserProps);
    const [Loged, SetLoged] = useState<boolean>(false);
    const [Status, SetStatus] = useState<number | null>(null);
    const [Mensage, SetMensage] = useState<string | null>('');
    const router = useRouter();

    async function Login(email: string, password: string) {
        let NewData = {
            email: email,
            password: password
        };
        let userImage: any;
        try {
            SetLoading(true);
            await Api.post('/login', NewData).then(res => {
                SetUser(res.data);
                SetStatus(res.status);
                SetMensage(res.data.msg);
            });
        } catch (error: any) {
            console.log('login error: ' + error + 'msg :' + User.msg);
            //SetUser('');
        } finally {
            SetLoged(true);
            setTimeout(function () {
                SetLoading(false);
            }, 10000);
        }
    }
    if (Status === 200) {
        router.push('/notes', { scroll: false });
    }

    const Logout = () => {
        SetLoged(false);
        //SetUser('');
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
                    console.log(Mensage);
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
                }, 10000);
            }
        }
    };
    console.log(User);
    return (
        <StoreNotesContext.Provider
            value={{
                Loading,
                Login,
                Loged,
                Mensage,
                Status,
                CreateUser,
                User
            }}
        >
            {children}
        </StoreNotesContext.Provider>
    );
};

export default StoreNotesProvider;
