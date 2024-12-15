import s from "./button.module.scss"

type Props = {
    title: string
    onClickHandler: () => void
    disabled?: boolean
    variant?: "active" | "default"
}
export const Button = ({title, onClickHandler, disabled, variant = "default"}: Props) => {
    const buttonClass = variant === "active" ? `${s.button} ${s.active}` : s.button;
    return (
        <button className={buttonClass} disabled={disabled} onClick={onClickHandler}>{title}</button>
    );
};

