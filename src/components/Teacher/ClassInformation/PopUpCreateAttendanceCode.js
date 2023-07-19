import { AiOutlineClose } from 'react-icons/ai';
import { checkLession } from '../../../utils/functionCusom/functionCusom.js';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { getLocation } from '../../../utils/functionCusom/functionCusom.js';
import { ToastMessageContext } from '../../../context/ToastMessageContext';

function PopUpCreateAttendanceCode({ handlePopUp, classObj }) {
    const [location, setLocation] = useState({
        latitude: '',
        longitude: '',
    });

    const context = useContext(ToastMessageContext);

    const lessionNumber = checkLession();

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const coords = await getLocation();
                setLocation({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchLocation();
    }, []);

    const handleCreateAttendance = async () => {
        try {
            // Kiểm tra xem đã lấy được vị trí chưa
            if (!(location.latitude && location.longitude)) {
                context.handleToastMessage('error', 'Lấy vị trí thất bại', 'Hãy mở quyền truy cập định vị và thử lại');
                return;
            }
            let locationInformation = JSON.stringify(location);

            // kiểm tra xem đã có mã của buổi học này chưa
            let data = await axios.get(
                `http://localhost:8080/teacher/class/attendance?classCode=${classObj.classCode}&lessionNumber=${lessionNumber}`,
            );

            if (data.data.length > 0) {
                await axios.put(`http://localhost:8080/teacher/class/attendance`, {
                    classCode: classObj.classCode,
                    lessionNumber: lessionNumber,
                    locationInformation: locationInformation,
                });

                context.handleToastMessage('success', 'Thành công', 'Cập nhật mã điểm danh thành công');
            } else {
                await axios.post(`http://localhost:8080/teacher/class/attendance`, {
                    classCode: classObj.classCode,
                    lessionNumber: lessionNumber,
                    locationInformation: locationInformation,
                });
                context.handleToastMessage('success', 'Thành công', 'Tạo mới mã điểm danh thành công');
            }

            handlePopUp(0);
        } catch (error) {
            console.log(error);
            context.handleToastMessage('error', 'Tạo mã thất bại', 'Đã có lỗi xảy ra');
        }
    };

    return (
        <>
            <div className="popup-create-attendance">
                <div className="container">
                    <AiOutlineClose className="icon-close" onClick={() => handlePopUp(0)} />
                    <div className="subject">Môn học: {classObj.termName}</div>
                    <div className="lession-number">Buổi học số: {lessionNumber}</div>
                    <div className="btn-create" onClick={() => handleCreateAttendance()}>
                        Tạo mã
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopUpCreateAttendanceCode;
