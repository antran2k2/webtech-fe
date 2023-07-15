import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineExclamationCircle } from 'react-icons/ai';
import './ToastMessage.scss';
import { useEffect, useState, useContext } from 'react';
import { ToastMessageContext } from '../../context/ToastMessageContext';

function ToastMessage() {
    const [role, setRole] = useState();
    const context = useContext(ToastMessageContext);

    const roles = [
        {
            type: 'error',
            title: 'Thất bại',
            text: 'Thêm mới dữ liệu thất bại',
            icon: <AiOutlineCloseCircle className="icon" />,
            backgroundColor: '#e14d45',
        },
        {
            type: 'success',
            title: 'Thành công',
            text: 'Thêm mới dữ liệu thành công',
            icon: <AiOutlineCheckCircle className="icon" />,
            backgroundColor: '#2ecc71',
        },
        {
            type: 'warning',
            title: 'Cảnh báo',
            text: 'Đang xuất hiện cảnh báo',
            icon: <AiOutlineExclamationCircle className="icon" />,
            backgroundColor: '#ed991d',
        },
    ];

    useEffect(() => {
        try {
            const roleDemo = roles.find((role) => role.type === context.propToastMessage.typeMes);
            const updatedRole = {
                ...roleDemo,
                title: context.propToastMessage.titleMes,
                text: context.propToastMessage.textMes,
            };

            setRole(updatedRole);
        } catch (error) {
            console.error(error);
        }
    }, [context.propToastMessage, roles]);

    return (
        <>
            {role && (
                <div className="toast-message" style={{ backgroundColor: role.backgroundColor }}>
                    {role.icon}
                    <div className="content">
                        <div className="title">{role.title}</div>
                        <div className="text">{role.text}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ToastMessage;
