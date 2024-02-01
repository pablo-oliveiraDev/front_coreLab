'use client';
import { createContext, useEffect, useState } from 'react';
import * as T from '@/components/Types/contextTypes';
import Api from '@/components/Services/api';

export const StoreNotesContext = createContext<T.InitialValue>(
    {} as T.InitialValue
);

export const StoreNotesProvider = ({ children }: T.UserContextProps) => {
    const [Loading, SetLoading] = useState<boolean>(false);
    const [User, SetUser] = useState<T.UserProps>({} as T.UserProps);

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

// login
// :
// createdAt
// :
// "19/01/2024 00:33:51"
// email
// :
// "pabloliverfe@gmail.com"
// id
// :
// "65a9eda494605fb37d463fc3"
// password
// :
// "pablo020685"
// userImages
// :
// Array(1)
// 0
// :
// id
// :
// "65a9eda494605fb37d463fc4"
// image
// :
// "iVBORw0KGgoAAAANSUhEUgAAB4AAAAQ4CAIAAABnsVYUAAAAA
// userId
// :
// "65a9eda494605fb37d463fc3"
