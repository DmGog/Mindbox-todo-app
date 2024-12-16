import s from "./button.module.scss"
import {memo, PropsWithChildren} from "react";
import clsx from "clsx";

type Props = {
    onClickHandler: () => void
    disabled?: boolean
    variant?: "active" | "default"
    className?: string
}
export const Button = memo(({
                                onClickHandler,
                                disabled,
                                variant = "default",
                                children,
                                className
                            }: PropsWithChildren<Props>) => {
    const buttonClass = clsx(s.button, {[s.active]: variant === "active",}, className);
    return (
        <button className={buttonClass} disabled={disabled} onClick={onClickHandler}>{children}</button>
    );
});

