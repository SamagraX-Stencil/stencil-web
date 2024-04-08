import { FC, useCallback, useEffect, useState } from "react";
import styles from "./style.module.css";

import { List } from "../../molecules/list";
import ForumIcon from "@mui/icons-material/Forum";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import moment from "moment";
import FullPageLoader from "../../components/fullpage-loader";
import { useColorPalates } from "../../molecules/theme-provider/hooks";
import { component } from "./config.json";
import { ChatItem, HistoryItem } from "./index.d";
import { map } from "lodash";
import sample from "./sample.json";


const HistoryPage: FC = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [list, setList] = useState([]);
    const theme = useColorPalates();

    const handleClick = useCallback((activeItem: HistoryItem) => {
        console.log({ activeItem });
    }, []);

    const onSecondaryActionClick = useCallback(
        (activeItem: ChatItem) => () => {
            if (window.confirm("Are you sure you want to delete this conversation?")) {
                setList(prev => {
                    return prev.filter((item: ChatItem) => item.conversationId !== activeItem.conversationId)
                })
            }
        },
        []
    );


    useEffect(() => {
        setIsFetching(true);
        const historyList = map(sample, (chatItem: ChatItem) => ({
            id: chatItem?.id,
            label: chatItem?.query,
            conversationId: chatItem?.conversationId,
            userId: chatItem?.userId,
            secondaryLabel: moment(chatItem?.updatedAt).format("hh:mm A DD/MM/YYYY"),
            icon: <ForumIcon style={{ color: theme?.primary?.light }} />,
            secondaryAction: (
                <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={onSecondaryActionClick(chatItem)}
                >
                    <DeleteOutlineIcon />
                </IconButton>
            ),
            onClick: handleClick,
            isDivider: true,
        }));
        setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            setList(historyList);
            setIsFetching(false);
        }, 2000)

    }, [handleClick, onSecondaryActionClick, theme?.primary?.light])


    return (
        <>
            <div className={styles.main}>
                <FullPageLoader loading={isFetching} color={theme?.primary?.main} />
                <div className={styles.title} style={{ color: theme?.primary?.main }}>
                    {component?.title ?? "No Label Provided"}
                </div>
                <div className={styles.chatList}>
                    <List items={list} noItem={{label:"No History Found" ,icon:<ForumIcon style={{ color: theme?.primary?.light }} />}} />
                </div>
            </div>
        </>
    );
};

export default HistoryPage;
