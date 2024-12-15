import {Indicator, Root} from "@radix-ui/react-checkbox";
import {CheckIcon} from "@radix-ui/react-icons";
import s from "./checkbox.module.scss"

type Props = {
    onChangeChecked?: (checked: boolean) => void;
    isChecked?: boolean;
}
export const Checkbox = ({onChangeChecked, isChecked}: Props) => {

    const handleCheckedChange = (): void => {
        if (onChangeChecked) {
            onChangeChecked(!isChecked);
        }
    };

    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <Root className={s.Root} checked={isChecked} onCheckedChange={handleCheckedChange}>
                <Indicator className={s.Indicator}>
                    <CheckIcon/>
                </Indicator>
            </Root>
        </div>
    )
}


