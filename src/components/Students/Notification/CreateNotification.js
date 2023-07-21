import { AiOutlinePlusCircle } from 'react-icons/ai';
import './CreateNotification.scss';
import { useState } from 'react';
import axios from 'axios';

function CreateNotification({ classObj }) {
    // Khởi tạo trạng thái (state) để lưu trữ giá trị của textarea
    const [textValue, setTextValue] = useState('');

    const [showFormAdd, setShowFormAdd] = useState(false);

    const showHideFormAdd = () => {
        setShowFormAdd(!showFormAdd);
    };
    // Hàm xử lý sự kiện thay đổi nội dung của textarea
    const handleChange = (event) => {
        setTextValue(event.target.value);
    };

    // Xử lý thêm thông báo
    const handleAddNotification = async () => {
        let token = localStorage.getItem('token');

        // Thực hiện thêm thông báo
        await axios.post(
            'http://localhost:8080/teacher/notification',
            {
                classCode: classObj.classCode,
                content: textValue,
            },
            {
                headers: { Authorization: 'Token ' + token },
            },
        );

        showHideFormAdd();
    };

    return (
        <>
            {showFormAdd ? (
                <div className="form-add-notification">
                    <div className="title-form">Hãy viết thông báo mới cho lớp học: </div>
                    <textarea value={textValue} onChange={handleChange} />
                    <div className="btn-outline">
                        <div className="btn" onClick={handleAddNotification}>
                            Thêm mới
                        </div>
                    </div>
                </div>
            ) : (
                <div className="create-notification">
                    <div className="btn-create-outline">
                        <div className="btn-create" style={{ marginTop: '20px' }}>
                            <AiOutlinePlusCircle className="btn-icon" />
                            <div className="btn-text" onClick={showHideFormAdd}>
                                Thêm thông báo
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateNotification;
