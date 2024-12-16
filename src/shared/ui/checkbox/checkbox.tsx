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
        <div className={s.checkbox}>
            <Root className={s.root} checked={isChecked} onCheckedChange={handleCheckedChange}>
                <Indicator className={s.indicator}>
                    <CheckIcon/>
                </Indicator>
            </Root>
        </div>
    )
}


