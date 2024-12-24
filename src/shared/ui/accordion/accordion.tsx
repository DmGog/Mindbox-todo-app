import {ChevronDownIcon} from "@radix-ui/react-icons";
import {Root, Item, Header, Trigger, Content} from "@radix-ui/react-accordion";
import {PropsWithChildren} from "react";
import s from "./accordion.module.scss"
import {Button} from "@/shared";

type Props = {
    title: string;
    deleteItem: () => void;
}
export const Accordion = ({children, title, deleteItem}: PropsWithChildren<Props>) => {
    return (
        <Root type="single" collapsible className={s.root}>
            <Item value="item-1">
                <Header>
                    <Trigger className={s.trigger}>
                        <span>{title}</span>
                        <ChevronDownIcon className={s.chevron} aria-hidden/>
                        <Button
                            onClickHandler={deleteItem}>delete</Button>
                    </Trigger>
                </Header>
                <Content>{children}</Content>
            </Item>
        </Root>
    );
};

