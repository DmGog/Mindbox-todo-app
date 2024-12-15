import s from "./button.module.scss"
import {ReactNode} from "react";

type Props = {
    onClickHandler: () => void
    disabled?: boolean
    variant?: "active" | "default"
    children?: ReactNode
    className?: string
}
export const Button = ({onClickHandler, disabled, variant = "default", children, className}: Props) => {
    const buttonClass = `${s.button} ${variant === "active" ? s.active : ""} ${className || ""}`.trim()
    return (
        <button className={buttonClass} disabled={disabled} onClick={onClickHandler}>{children}</button>
    );
};

