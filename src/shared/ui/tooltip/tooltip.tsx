import s from "./tooltip.module.scss";
import {Trigger, Root, Provider, Portal, Content, Arrow} from "@radix-ui/react-tooltip";
import {PropsWithChildren, useEffect, useState} from "react";

type Props = {
    text: string | null,
}

export const Tooltip = ({text, children}: PropsWithChildren<Props>) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (text) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [text]);

    return (
        <Provider>
            <Root open={open} onOpenChange={setOpen}>
                <Trigger asChild>
                    {children}
                </Trigger>
                <Portal>
                    {text && (
                        <Content className={s.content} sideOffset={5}>
                            {text}
                            <Arrow className={s.arrow}/>
                        </Content>
                    )}
                </Portal>
            </Root>
        </Provider>
    );
};
