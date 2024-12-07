import { useTheme } from "@mui/material/styles";
import { Grid, CardNewItem, Box, IconButton, Avatar, CustomList, Typography } from "../components";
import { useAppContext } from "../Context";
import babyImage from '../assets/img/baby.png';

import { HotelIcon, DinnerDiningIcon, BabyChangingStationIcon, SignalCellularAltIcon, SettingsIcon } from "../utils/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { list } from "../services/database";

import ActionInterface from "../interfaces/IAction";
import { loadProfile } from "../utils/loader";
import { calculateDuration, roundDays } from "../utils/date";
import dayjs from "dayjs";
// import { blue } from "@mui/material/colors";


const Home: React.FC = () => {
    const { t, user, supabase } = useAppContext();    
    const theme = useTheme();
    const navigate = useNavigate();
    const [baby, setBaby] = useState({});
    const [page, setPage] = useState(1);
    const [data, setData] = useState<ActionInterface | null>(null);

    // Cores personalizadas
    const blue600 = theme.palette.custom.blue600;
    const green600 = theme.palette.custom.green600;
    const brown600 = theme.palette.custom.brown600;

    const actionsMain = [
        {
            title: t("sleep"), 
            actionType: 1,
            icon: HotelIcon,
            color: blue600,
        },
        {
            title: t("eat"),
            actionType: 2,
            icon: DinnerDiningIcon,
            color: green600,
        },
        {
            title: t("diaper"),
            actionType: 3,
            icon: BabyChangingStationIcon,
            color: brown600,
        }
    ]

    const loadData = async () => {
        const { data: d, error } = await list("action", {
            "user_id": user ? user.id : null
        }, page, supabase);
        setData(d);
    }

    useEffect(() => {
        if (user) {
            loadProfile(baby, setBaby, user, supabase);
            loadData();
        }        
    }, [user]);

    return  <Grid container={true}>
                <Grid size={{ xs: 12 }}
                    sx={{
                        height: '25vh'
                    }}
                >
                    <Grid container={true}
                        sx={{
                            alignItems: 'flex-end',
                            marginTop: '1em'
                        }}
                    >
                        <Grid size={{ xs: 4 }}>
                            <Box
                                sx={{
                                    ...styles.centerBox,
                                    ...styles.centerBox
                                }}
                            >
                                <IconButton
                                    sx={{
                                        ...styles.iconButton,
                                        border: `2px solid ${theme.palette.primary.main}`
                                    }}
                                    onClick={() => navigate("/dashboard")}
                                >
                                    <SignalCellularAltIcon
                                        sx={{
                                        ...styles.icon,
                                        color: `${theme.palette.primary.main}`,
                                    }} />
                                </IconButton>
                                <Box sx={{
                                    ...styles.centerBox,
                                    ...styles.boxText
                                }}>
                                    <Typography component="p" sx={{...styles.text2}}>{baby?.height?.value} cm</Typography>
                                    <Typography component="p" sx={{...styles.text3}}>{t('length')}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                            <Box
                                sx={{
                                    ...styles.centerBox
                                }}
                            >
                                <Avatar
                                    sx={{ width: 90, height: 90 }}
                                    src={babyImage}
                                />
                                <Box sx={{
                                    ...styles.centerBox,
                                    ...styles.boxText
                                }}>
                                    <Typography component="p" sx={{...styles.text1}}>{baby?.name?.value}</Typography>
                                    <Typography component="p" sx={{...styles.text3}}>{roundDays(calculateDuration(baby?.birth?.value, dayjs().startOf('day').format(), "day"))} {t('days')}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                            <Box
                                sx={{
                                    ...styles.centerBox
                                }}
                            >
                                <IconButton
                                    sx={{
                                        ...styles.iconButton,
                                        border: `2px solid ${theme.palette.primary.main}`
                                    }}
                                    onClick={() => navigate("/settings")}
                                >
                                    <SettingsIcon
                                        sx={{
                                        ...styles.icon,
                                        color: `${theme.palette.primary.main}`,
                                    }}
                                    />
                                </IconButton>
                                <Box sx={{
                                    ...styles.centerBox,
                                    ...styles.boxText
                                }}>
                                    <Typography component="p" sx={{...styles.text2}}>{baby?.weight?.value} kg</Typography>
                                    <Typography component="p" sx={{...styles.text3}}>Peso</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid 
                    item={true}
                    size={{ xs: 12 }}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        height: '75vh'
                    }}
                >
                    <Grid container={true}
                        sx={{
                            marginTop: '-50px',
                            padding: 2
                        }}
                    >
                        <Grid size={{ xs: 12 }} item={true}>
                            <Grid container={true} spacing={2}>
                                {
                                    actionsMain.map((action, i) => <Grid key={i} size={{ xs: 4 }}>
                                        <CardNewItem                                            
                                            title={action.title}
                                            Icon={action.icon}
                                            color={action.color}
                                            actionType={action.actionType}
                                        />
                                    </Grid>)
                                }
                            </Grid>
                            <Grid container={true} sx={{
                                marginTop: '1em'
                            }}>
                                <Grid size={{ xs: 12 }}>
                                    { data ? <CustomList
                                        sx={{
                                            overflow: 'auto',
                                            maxHeight: '56.5vh'
                                        }}
                                        items={data}
                                    /> : null}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
};

const styles = {
    centerBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconButton: {
        height: '2.5em',
        width: '2.5em',
    },
    icon: {
        fontSize: '1.5em'
    },
    boxText: {
        marginTop: '.5em'
    },
    text1: {
        wordBreak: 'break-all',
        fontSize: '1.2em',
        fontWeight: '500',
        fontFamily: '"Lato", sans-serif',
    },
    text2: {
        wordBreak: 'break-all',
        fontSize: '.8em',
        fontWeight: '600',
        fontFamily: '"Lato", sans-serif',
    }, 
    text3: {
        wordBreak: 'break-all',
        fontSize: '.8em',
        fontWeight: '400',
    }
}

export default Home;