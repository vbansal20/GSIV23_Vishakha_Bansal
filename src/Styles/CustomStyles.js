import { makeStyles } from "@mui/styles";

export const CustomStyles = makeStyles((theme) => ({
    ellipsisText: {
        display: '-webkit-box',
        overflow: 'hidden',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        wordBreak: 'break-word',
    },
    appBarStyle: {
        backgroundColor: 'white !important',
    },
    cardStyles: {
        borderRadius: "10px !important",
    },
}))