import {ChevronDownIcon} from "@radix-ui/react-icons";
import {Content, Header, Item, Root, Trigger} from "@radix-ui/react-accordion";
import {memo, PropsWithChildren} from "react";
import s from "./accordion.module.scss"
import {Button} from "@/shared";
import TrashIcon from "@/shared/assets/icons/trash.svg";
import clsx from "clsx";

type Props = {
    title: string;
    deleteItem: () => void;
    id: string
}
export const Accordion = memo(({
                                   children,
                                   title,
                                   deleteItem,
                                   id,
                               }: PropsWithChildren<Props>) => {
    return (
        <Root type="single" collapsible className={s.root}>
            <Item value={id}>
                <Header className={s.headerWrapper}>
                    <Trigger className={s.trigger}>
                        <span className={s.title}>{title}</span>
                        <ChevronDownIcon className={s.chevron}/>
                    </Trigger>
                    <Button
                        onClickHandler={deleteItem} className={clsx(s.button, s.icon)}
                        aria-label={"delete-button"}><TrashIcon/></Button>
                </Header>
                <Content>{children}</Content>
            </Item>
        </Root>
    );
});

