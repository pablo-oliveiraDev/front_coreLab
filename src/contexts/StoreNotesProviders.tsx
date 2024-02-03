'use client';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as T from '@/components/Types/contextTypes';
import Api from '@/components/Services/api';
//import { setTimeout } from 'timers';

export const StoreNotesContext = createContext<T.InitialValue>(
    {} as T.InitialValue
);

export const StoreNotesProvider = ({ children }: T.UserContextProps) => {
    const [Loading, SetLoading] = useState<boolean>(false);
    const [User, SetUser] = useState<T.UserProps>({} as T.UserProps);
    const [Loged, SetLoged] = useState<boolean>(false);
    const [Status, SetStatus] = useState<Number>();
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
            });
        } catch (error: any) {
            console.log('context error: ' + error + 'msg :' + User.msg);
            SetUser('');
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
    };

    const CreateLogin = async (userName:string,email:string,password:string,userImage:string) => {};

    return (
        <StoreNotesContext.Provider
            value={{
                Loading,
                Login,
                Loged
            }}
        >
            {children}
        </StoreNotesContext.Provider>
    );
};

export default StoreNotesProvider;
