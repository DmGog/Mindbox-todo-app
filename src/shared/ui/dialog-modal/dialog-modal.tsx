import {Content, Overlay, Portal, Root, Title} from "@radix-ui/react-dialog";
import s from "./dialog-modal.module.scss"
import {Button} from "@/shared";

type Props = {
    isOpen: boolean;
    title: string;
    onClickYes: () => void;
    onClickNo: () => void;
    text: string;
};

export const DialogModal = ({onClickNo, onClickYes, isOpen, title, text}: Props) => {
    return (
        <Root open={isOpen}>
            <Portal>
                <Overlay aria-labelledby="dialog-title" className={s.overlay}/>
                <Content aria-labelledby="dialog-title" className={s.container}>
                    <Title className={s.title}>{title}</Title>
                    <div className={s.text}>{text}</div>
                    <div className={s.btnWrapper}>
                        <Button onClickHandler={onClickYes} className={s.btnYes}>Yes</Button>
                        <Button onClickHandler={onClickNo} className={s.btnNo}>No</Button>
                    </div>
                </Content>
            </Portal>
        </Root>
    );
};

