import React, { useContext, useEffect } from 'react';
import { useMessageContext } from '../../hooks/useMessageContext';
import UseSocketSetup from '../../hooks/UseSocketSetup';
import AdminNavbar from './AdminNavbar';
import { useNewMessageContext } from '../../hooks/useNewMessageContext';
import AdminHeader from './AdminHeader';
import MessageBox from './MessageBox';

export default function Notifications() {
    const { messages } = useMessageContext();
    const { hasNewMessage, dispatch } = useNewMessageContext();

    useEffect(() => {
        // Perform any side effects here if needed when messages change
        if (hasNewMessage === "new_message" || hasNewMessage === "default") {
            dispatch({ type: "SEEN_MESSAGE" });
        }

        console.log("inside notifications", hasNewMessage);
    }, [hasNewMessage]);

    // UseSocketSetup();

    return (
        <>
            <AdminHeader />
            <section className="h-screen flex flex-col lg:flex-row py-1 bg-blueGray-50">
                <AdminNavbar />
                {messages && messages.length > 0 ? (
                    <div className="my-10 mx-10 lg:mx-32 w-full flex flex-wrap flex-col lg:flex-row justify-between">
                        {messages.map((message, index) => (
                            <MessageBox key={message.id || index} message={message}/>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center bg-zinc-900 h-screen'>
                        <div className='flex flex-row space-x-2'>
                            <span className='sr-only'>Loading...</span>
                            <div className='h-8 w-8 bg-white rounded-full animate-none [animation-delay:-1s]'></div>
                            <div className='h-8 w-8 bg-white rounded-full animate-none [animation-delay:-1s]'></div>
                            <div className='h-8 w-8 bg-white rounded-full animate-none'></div>
                        </div>
                        <br />
                        <div className='text-xl font-mono font-semibold text-gray-200'>No Messages</div>
                    </div>
                )}
            </section>
        </>
    );
}
