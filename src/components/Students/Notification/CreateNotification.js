import { AiOutlinePlusCircle } from 'react-icons/ai';
import './CreateNotification.scss';
import { useState } from 'react';

function CreateNotification() {
    const [showFormAdd, setShowFormAdd] = useState(false);

    const showHideFormAdd = () => {
        setShowFormAdd(!showFormAdd);
    };

    return (
        <>
            {showFormAdd ? (
                <div className="form-add-notification">
                    <div className="title-form">Hãy viết thông báo mới cho lớp học: </div>
                    <textarea />
                    <div className="btn-outline">
                        <div className="btn" onClick={showHideFormAdd}>
                            Thêm mới
                        </div>
                    </div>
                </div>
            ) : (
                <div className="create-notification">
                    <div className="btn-create-outline">
                        <div className="btn-create">
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
