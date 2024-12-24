import {ChevronDownIcon} from "@radix-ui/react-icons";
import {Root, Item, Header, Trigger, Content} from "@radix-ui/react-accordion";
import {PropsWithChildren} from "react";
import s from "./accordion.module.scss"
import {Button} from "@/shared";
import TrashIcon from "@/shared/assets/icons/trash.svg";
import clsx from "clsx";

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
                        <div className={s.titleWrapper}><span className={s.title}>{title}</span>
                            <ChevronDownIcon className={s.chevron} aria-hidden/></div>
                        <Button
                            onClickHandler={deleteItem} className={clsx(s.button, s.icon)} aria-label={"delete-button"}><TrashIcon/></Button>
                    </Trigger>
                </Header>
                <Content>{children}</Content>
            </Item>
        </Root>
    );
};

