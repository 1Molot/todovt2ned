import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    classes?: string
    changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        classes,
        changeTitle
    }) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)

    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        changeTitle(localTitle)
        setIsEditMode(false)
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setLocalTitle(e.currentTarget.value)

    return (
        isEditMode
            ? <input
            value={localTitle}
            onChange={setLocalTitleHandler}
            autoFocus
            onBlur={offEditMode}
            />
            : <span
                onDoubleClick={onEditMode}
                className={classes}
            >{title}</span>
    );
};

export default EditableSpan;