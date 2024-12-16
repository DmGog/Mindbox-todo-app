import {Root, Portal, Overlay, Content, Title} from "@radix-ui/react-dialog";
import s from "./dialog-modal.module.scss"
import {ReactNode} from "react";
import {Button} from "../button";

type Props = {
    isOpen: boolean;
    title: string;
    onClickYes: () => void;
    onClickNo: () => void;
    children?: ReactNode;
};

export const DialogModal = ({onClickNo, onClickYes, isOpen, title, children}: Props) => {
    return (
        <Root open={isOpen}>
            <Portal>
                <Overlay aria-labelledby="dialog-title" className={s.overlay}/>
                <Content aria-labelledby="dialog-title" className={s.container}>
                    <Title className={s.title}>{title}</Title>
                    {children && <div className={s.text}>{children}</div>}
                    <div className={s.btnWrapper}>
                        <Button onClickHandler={onClickYes} className={s.btnYes}>Yes</Button>
                        <Button onClickHandler={onClickNo} className={s.btnNo}>No</Button>
                    </div>
                </Content>
            </Portal>
        </Root>
    );
};

