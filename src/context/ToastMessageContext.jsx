import { useState, createContext } from 'react';

const ToastMessageContext = createContext();

function ToastMessageProvider({ children }) {
    const [isToastMessage, setIsToastMessage] = useState(false);
    const [propToastMessage, setPropToastMessage] = useState({
        typeMes: 'success',
        titleMes: 'Thành công',
        textMes: 'Thêm mới dữ liệu thành công',
    });

    const handleToastMessage = (typeMes, titleMes, textMes) => {
        setPropToastMessage({
            typeMes: typeMes,
            titleMes: titleMes,
            textMes: textMes,
        });

        setIsToastMessage(false);
        setTimeout(() => {
            setIsToastMessage(true);
        }, 0);
    };

    const value = {
        isToastMessage,
        propToastMessage,
        handleToastMessage,
    };

    return <ToastMessageContext.Provider value={value} > {children} </ToastMessageContext.Provider>;
}

export { ToastMessageContext, ToastMessageProvider };