import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    titleMaxLength: number
    addItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormPropsType> = (
    {
        titleMaxLength,
        addItem
    }) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === " ") {
            setError(true)
        }
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && addItemHandler()
    const isTitleLengthTooLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = !title.length || isTitleLengthTooLong || error

    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: "red"}}>Title is too long!</div>
        : null
    const userMessage = error
        ? <div style={{color: "red"}}>Title is required!</div>
        : null
    const inputClasses = error || isTitleLengthTooLong ? "input-error" : undefined
    return (
        <div className="add-form">
            <input
                placeholder="Please, enter title"
                value={title}
                onChange={setTitleHandler}
                onKeyDown={addTaskOnKeyPressHandler}
                className={inputClasses}
            />
            <button
                disabled={isAddBtnDisabled}
                onClick={addItemHandler}
            >+
            </button>
            {titleMaxLengthWarning || userMessage}
        </div>
    );
};

export default AddItemForm;