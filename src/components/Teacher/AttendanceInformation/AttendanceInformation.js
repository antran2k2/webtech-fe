import { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import './AttendanceInformation.scss';

function AttendanceInformation({ classObj }) {
    const [inputLessionNumber, setInputLessionNumber] = useState();
    const [lessionNumber, setLessionNumber] = useState(1);

    const { listData: listStudent, loading } = useFetch(
        `http://localhost:8080/teacher/class/students-attendance-on-lession?classCode=${classObj.classCode}&lessionNumber=${lessionNumber}`,
    );

    const handleChangeLession = () => {
        if (inputLessionNumber !== 0) {
            setLessionNumber(inputLessionNumber);
        }
    };

    return (
        <>
            <div className="attendance-information">
                <div className="options">
                    <div className="title-option">Buổi học: </div>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        placeholder="1"
                        value={inputLessionNumber}
                        onChange={(e) => setInputLessionNumber(e.target.value)}
                    />
                    <div className="btn-submit" onClick={handleChangeLession}>
                        Xác nhận
                    </div>
                </div>
                <div className="list-student">
                    <div className="list-tilte">Danh sách sinh viên:</div>
                    <div className="list-items">
                        <div className="item fw6">
                            <div className="colum">STT</div>
                            <div className="colum">Mã số sinh viên</div>
                            <div className="colum">Họ và tên</div>
                            <div className="colum">Trạng thái</div>
                            <div className="colum">Hành động</div>
                        </div>
                        {loading === 2 &&
                            listStudent.map((item, index) => (
                                <div className="item" key={index}>
                                    <div className="colum">{index + 1}</div>
                                    <div className="colum">{item.userCode}</div>
                                    <div className="colum">{item.userName}</div>
                                    <div className="colum">
                                        <input type="checkbox" checked={item.status} />
                                    </div>
                                    <div className="colum">
                                        <div className="btn">Lưu</div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AttendanceInformation;
