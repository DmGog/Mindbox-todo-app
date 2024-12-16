import {ChangeEvent, memo, useEffect, useState} from "react";
import s from "./inline-editor.module.scss";
import {Tooltip} from "@/shared";

type Props = {
    value: string;
    onChange: (newValue: string) => void;
    setEditMode: (editMode: boolean) => void;
};

export const InlineEditor = memo(function ({value, onChange, setEditMode}: Props) {
    let [title, setTitle] = useState(value);
    let [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTitle(value);
    }, [value]);

    const activateViewMode = () => {
        setEditMode(false);
        if (title.length > 40) {
            setError("Title must be 40 characters or less");
        } else {
            onChange(title);
            setError(null);
        }
    };

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setTitle(newValue);

        if (newValue.length > 40) {
            setError("Title must be 40 characters or less");
        } else if (newValue.length > 30) {
            setError("Title is longer than recommended 30 characters");
        } else {
            setError(null);
        }
    };

    return (
        <Tooltip text={error}>
            <input
                maxLength={45}
                className={s.inlineEditor}
                value={title}
                onChange={changeTitle}
                autoFocus
                onBlur={activateViewMode}
            />
        </Tooltip>
    );
});
