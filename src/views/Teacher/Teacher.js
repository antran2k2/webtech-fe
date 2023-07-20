import './Teacher.scss';
import ClassList from '../../components/Teacher/ClassList/ClassList';
import Detail from '../../components/Teacher/Detail/Detail';
import { useState } from 'react';
import { checkLession } from '../../utils/functionCusom/functionCusom';

function Teacher() {
    const lessionNumber = checkLession();

    // Tình trạng chọn list: danh sách lớp đang dạy trong kỳ, detail: chi tiết 1 lớp
    const [options, setOptions] = useState('list');

    // Thông tin lớp chi tiết (truyền vào detail)
    const [classObj, setClassObj] = useState({});

    const handleSetOptions = (option, classObjNew) => {
        setClassObj(classObjNew);
        setOptions(option);
    };

    return (
        <>
            <div className="container">
                <div className="header">
                    <div className="title">
                        <div className="title-logo">
                            <img
                                src="https://storage.googleapis.com/hust-files/5807675312963584/images/hust-logo-official_.3m.jpeg"
                                alt="avatar"
                            />
                        </div>
                        <div className="title-info">
                            <div className="title-top">HỆ THỐNG QUẢN TRỊ ĐẠI HỌC TRỰC TUYẾN</div>
                            <div className="title-bot">
                                ĐẠI HỌC BÁCH KHOA HÀ NỘI - TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG
                            </div>
                        </div>
                    </div>
                    <div className="avatar">
                        <img
                            src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/313928031_1857605907938653_6284185701097598776_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZD_ddflYUFUAX9aKNAg&_nc_ht=scontent.fhan2-4.fna&oh=00_AfAF_2xkWbg1xx5ssnZqCLPYrk9_vGWpa2mL8rJ-4KVzEw&oe=64BACEE1"
                            alt="avatar"
                        />
                        <div className="current-time">Tuần học thứ {lessionNumber}: 17/07 - 23/07 </div>
                    </div>
                </div>
                {options === 'list' && <ClassList handleSetOptions={handleSetOptions} />}
                {options === 'detail' && <Detail classObj={classObj} />}
            </div>
        </>
    );
}

export default Teacher;
