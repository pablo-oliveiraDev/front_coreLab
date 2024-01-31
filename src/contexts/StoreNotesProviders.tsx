'use client';
import { createContext, useEffect, useState } from 'react';
import {
    UserContextProps,
    InitialValue
} from '@/components/Types/contextTypes';
import Api from '@/components/Services/api';

export const StoreNotesContext = createContext<InitialValue>(
    {} as InitialValue
);

export const StoreNotesProvider = ({ children }: UserContextProps) => {
    const [Loading, SetLoading] = useState<boolean>(false);
    const [User, SetUser] = useState<Object>({});

    async function Login(email: string, password: string) {
        let NewData = {
            email: email,
            password: password
        };

        try {
            SetLoading(true);
            await Api.post('/login', NewData).then(res => {
                SetUser(res.data);
            });
        } catch (error: any) {
            console.log('context error: ' + error + User.msg);
            SetUser('');
        } finally {
            SetLoading(false);
        }
    }

    console.log(User);
    return (
        <StoreNotesContext.Provider
            value={{
                Loading,
                Login
            }}
        >
            {children}
        </StoreNotesContext.Provider>
    );
};

export default StoreNotesProvider;
