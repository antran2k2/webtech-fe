import { AiOutlineClose } from 'react-icons/ai';
import './PopupAttendance.scss';

function PopupAttendance({ changePopupMessage }) {
    return (
        <>
            <div className="popup-atd">
                <div className="btn-close" onClick={changePopupMessage}>
                    <AiOutlineClose />
                </div>
                <div className="message">Điểm danh thành công</div>
            </div>
        </>
    );
}

export default PopupAttendance;
