import {ChangeEvent, KeyboardEvent, memo, useState} from "react";

type Props = {
    addItem: (title: string) => void
}
export const AddItem = memo(function ({addItem}: Props) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() === "") {
            setError("Title is required")
        } else if (title.length > 100) {
            setError("Title must be 100 characters or less")
        } else {
            addItem(title)
            setTitle("")
            setError(null)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error) {
            setError(null)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItemHandler()
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                placeholder="What needs to be done?"
            />
            <button onClick={addItemHandler}>add</button>
            {error && error}
        </div>
    )
})