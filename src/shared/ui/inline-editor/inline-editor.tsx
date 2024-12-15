import {ChangeEvent, memo, useEffect, useState} from "react";

type Props = {
    value: string;
    onChange: (newValue: string) => void;
    setEditMode: (editMode: boolean) => void;
};

export const InlineEditor = memo(function ({value, onChange, setEditMode}: Props) {
    let [title, setTitle] = useState(value);

    useEffect(() => {
        setTitle(value);
    }, [value]);

    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
    };

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    return (
        <input
            value={title}
            onChange={changeTitle}
            autoFocus
            onBlur={activateViewMode}
        />
    );
});
