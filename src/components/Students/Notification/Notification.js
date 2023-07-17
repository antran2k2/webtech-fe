import { useEffect, useState } from 'react';
import CreateNotification from './CreateNotification';
import axios from 'axios';
import useFetch from '../../../hooks/useFetch';
import { formatDate } from '../../../utils/functionCusom/functionCusom.js';

function Notification({ teacher = false }) {
    // Danh sách các môn học mà học sinh học trong kỳ
    const { listData: allClass, loading } = useFetch('http://localhost:8080/student/all-class-by-studentcode');

    const [listNotification, setListNotification] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios
            .get('http://localhost:8080/student/notification', {
                headers: { Authorization: 'Token ' + token },
            })
            .then((response) => {
                setListNotification(response.data);
            });
    }, []);

    // lấy tên lớp theo mã lớp
    const getClassNameByClassCode = (classCode) => {
        const className = allClass.find((classs) => classs.classCode === classCode).termName;
        return className;
    };

    return (
        <>
            <div className="notification">
                {teacher && <CreateNotification />}
                <div className="title">Thông báo</div>
                <div className="notification-items">
                    {listNotification.map((notification, index) => (
                        <div className="item" key={index}>
                            <div className="content">
                                <span>[{getClassNameByClassCode(notification.classCode)}]</span> {notification.content}
                            </div>
                            <div className="time">{formatDate(notification.updateAt)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Notification;
