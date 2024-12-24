import s from "./scroll.module.scss"
import {Root, Scrollbar, Thumb, Viewport} from "@radix-ui/react-scroll-area";
import {PropsWithChildren} from "react";

type Props ={}
export const Scroll = ({children}:PropsWithChildren<Props>) => {
    return (
        <Root className={s.scrollAreaRoot}>
            <Viewport className={s.scrollAreaViewport}>
                {children}
            </Viewport>
            <Scrollbar className={s.scrollAreaScrollbar} orientation="vertical">
                <Thumb className={s.scrollAreaThumb}/>
            </Scrollbar>
        </Root>
    );
};

