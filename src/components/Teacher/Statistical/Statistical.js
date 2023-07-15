import { useCallback, useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import './Statistical.scss';
import ExportButton from '../../Button/ExportButton';

function Statistical({ classObj }) {
    const { listData: listStudent, loading } = useFetch(
        `http://localhost:8080/teacher/class/statistical/${classObj.classCode}`,
    );
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            if (loading === 2) {
                let newData = listStudent.map((item, index) => ({
                    id: index + 1,
                    userCode: item.userCode,
                    userName: item.userName,
                    absent: item.absent,
                }));

                setData(newData);
            }
        } catch (error) {
            console.error(error);
        }
    }, [loading, listStudent]);

    const checkAbsent = useCallback((absent) => {
        if (absent < 2) {
            return 'Cảnh báo 0';
        } else if (absent < 4) {
            return 'Cảnh báo 1';
        } else if (absent < 6) {
            return 'Cảnh báo 2';
        }
    }, []);

    return (
        <>
            <div className="statistical">
                <div className="directional">
                    <div className="left">
                        <div className="title">Môn học: Tin hoc đại cương</div>
                        <div className="title">Mã lớp: 176533</div>
                    </div>
                    <ExportButton data={data} />
                </div>
                <div className="list">
                    <div className="list-tilte">Danh sách sinh viên:</div>
                    <div className="list-items">
                        <div className="item fw6">
                            <div className="colum">STT</div>
                            <div className="colum">Mã số sinh viên</div>
                            <div className="colum">Họ và tên</div>
                            <div className="colum">Số lần vắng</div>
                            <div className="colum">Ghi chú</div>
                        </div>
                        {loading === 2 &&
                            listStudent.map((item, index) => (
                                <div className="item" key={index}>
                                    <div className="colum">{index + 1}</div>
                                    <div className="colum">{item.userCode}</div>
                                    <div className="colum">{item.userName}</div>
                                    <div className="colum">{item.absent}</div>
                                    <div className="colum">{checkAbsent(item.absent)}</div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Statistical;
