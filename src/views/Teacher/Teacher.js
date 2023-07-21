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
                            <div className='avatar-name'>
                                <div className='avatar-name-text'>Le Thi Hoa</div>
                                <img
                                    src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/351454988_1622827338199463_4980675912654333490_n.jpg?stp=cp6_dst-jpg&_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=qDf0zlTHDHkAX-jiqg4&_nc_ht=scontent.fhan2-5.fna&oh=00_AfDYS9ktnXW-m8F4iAMl9DC34UwmOcFNN92VELpno9OASw&oe=64BF3221"
                                    alt="avatar"
                                />
                            </div>
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
