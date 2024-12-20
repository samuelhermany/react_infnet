import { useTheme } from "@mui/material/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

import { HotelIcon, DinnerDiningIcon, BabyChangingStationIcon } from "../../utils/icons";
import { generateSubtitle } from '../../utils/actions';
import { useAppContext } from '../../Context';

const CustomList = ({items, ...props}) => {
    const navigate = useNavigate();
    const { t } = useAppContext();
    const theme = useTheme();

    // Cores personalizadas
    const blue600 = theme.palette.custom.blue600;
    const green600 = theme.palette.custom.green600;
    const brown600 = theme.palette.custom.brown600;

    const getIcon = (typeAction) => {
        switch (typeAction) {
        case 1:
            return <HotelIcon/>;
        case 2:
            return <DinnerDiningIcon/>;
        case 3:
            return <BabyChangingStationIcon/>;
        default:
            return <DinnerDiningIcon/>;
        }
    }

    const actionTypeListToInt = {
        1 : "sleep",
        2: "eat",
        3: "diaper",
    }

    const typeColor = {
        1: blue600,
        2: green600,
        3: brown600, 
    }

    return (
        <List {...props}>
        {
            items.map((item, index) => {
                const typeStr = actionTypeListToInt[item.action_type];
                return <ListItem
                            key={`item-${item.id || index}`}
                            sx={{ backgroundColor: "#fff",  borderRadius: "60px",  marginTop: '1em' }}
                                id={`new-item-list-${index}`}
                                onClick={() => navigate(`/${item.action_type}/${item.id}`)}
                        >
                            <ListItemAvatar>
                                <Avatar
                                sx={{ bgcolor: typeColor[item.action_type] }}
                                >
                                    {getIcon(item.action_type)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={t(typeStr)} secondary={generateSubtitle(item, t)} />
                        </ListItem>
            })
        }
        </List>
    );
}

export default CustomList;