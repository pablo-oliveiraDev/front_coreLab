'use client';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as T from '@/components/Types/contextTypes';
import Api from '@/components/Services/api';

export const StoreNotesContext = createContext<T.InitialValue>(
    {} as T.InitialValue
);

export const StoreNotesProvider = ({ children }: T.UserContextProps) => {
    const [Loading, SetLoading] = useState<boolean>(false);
    const [User, SetUser] = useState<T.UserProps>({} as T.UserProps);
    const [Loged, SetLoged] = useState<boolean>(false);
    const [Status, SetStatus] = useState<number>();
    const [Mensage, SetMensage] = useState<string>('');
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
        userImage: string
    ) => {
        if (userName && email && password) {
            let data = {
                userName: userName,
                email: email,
                password: password,
                userImage: userImage
            };
            try {
                SetLoading(true);
                await Api.post('/createUser', data).then(res => {
                    SetStatus(res.status);
                    SetMensage(res.data.msg);
                });
            } catch (err) {
                console.log('createUser error :' + err + '\n msg:' + Mensage);
                console.log(Status);
                SetMensage('');
            } finally {
                setTimeout(function () {
                    SetLoading(false);
                }, 10000);
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
                CreateUser
            }}
        >
            {children}
        </StoreNotesContext.Provider>
    );
};

export default StoreNotesProvider;
