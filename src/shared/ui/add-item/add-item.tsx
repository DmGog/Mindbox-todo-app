import {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {Button} from "../button";
import s from "./add-item.module.scss"
import ArowDownIcon from "../../assets/icons/arrow-down.svg"

type Props = {
    addItem: (title: string) => void
}
export const AddItem = memo(function ({addItem}: Props) {
        let [title, setTitle] = useState("")
        let [error, setError] = useState<string | null>(null)

        const addItemHandler = () => {
            if (title.trim() === "") {
                setError("Title is required")
            } else if (title.length > 30) {
                setError("Title must be 30 characters or less")
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
            if (e.key === "Enter") {
                addItemHandler()
            }
        }

        return (
            <div className={s.addItem}>
                <input

                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyPressHandler}
                    placeholder="What needs to be done?"
                />
                <div className={s.icon}>
                    <ArowDownIcon/>
                </div>
                {title && <Button onClickHandler={addItemHandler} className={s.btnItem}>add</Button>}
            </div>
        )
    }
)