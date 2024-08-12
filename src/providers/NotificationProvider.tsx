import { PropsWithChildren, useEffect } from "react";


const NotificationProvider = ({children}: PropsWithChildren) => {
    useEffect(()=>{
        console.warn('provider init')
    }, [])
    return (
        <>
            {children}
        </>
    )
};

export default NotificationProvider;