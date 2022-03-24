import { FilterAlt, Search } from '@mui/icons-material'
import { Box, Card, CardContent, Dialog, DialogContent, Fab, InputAdornment, Link, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Filters } from '../../../models/Todo';
import styles from './FiltersCard.module.scss'

interface Props {
    distinctUsers: number[];
    searchIncomplete: (filters: Filters) => void;
}

const FIltersCard:React.FC<Props> = ({distinctUsers, searchIncomplete}) => {

    const [open, setOpen] = useState(false);

    const [flagIncomplete, setFlagIncomplete] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [userSelected, setUserSelected] = useState("");

    const submitSearch = () => {

        const filters:Filters = {
            titleFilter: searchValue,
            notCompleted: flagIncomplete,
            userIdFilter: userSelected
        }

        searchIncomplete(filters);

    };

    const handleClickSwitchIncomplete = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFlagIncomplete(!flagIncomplete);
    }

    const handleChangeSearchValue = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const handleChangeUserSelected = (e: SelectChangeEvent<string>) => {
        setUserSelected(e.target.value as string);
    }

    const handleResetFilters = () => {
        setFlagIncomplete(false);
        setSearchValue("");
        setUserSelected("");
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        
        submitSearch();

    }

    const handleClickShowDialog = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {

        submitSearch();

    }, [userSelected, flagIncomplete]);

    const card = (
        <Card>
            <CardContent>
                <Box>
                    <Typography variant="h5" color="secondary" align="center" gutterBottom>FILTERS</Typography>
                </Box>
                <form id="filters-form"  onSubmit={handleSubmit}>
                    <button hidden type="submit"></button>
                <Box display={'flex'} alignItems={'center'}>
                    <TextField 
                        size='small'
                        color="primary"
                        fullWidth
                        placeholder='Search...'
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                          }}
                        value={searchValue}
                        onChange={handleChangeSearchValue}
                    />
                </Box>
                <Box mt={4}>
                    <Typography variant="body1" color="secondary">COMPLETED</Typography>
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography variant="subtitle1" color="secondary">No</Typography>
                        <Switch checked={flagIncomplete} onChange={handleClickSwitchIncomplete} />
                    </Box>
                </Box>
                <Box mt={4}>
                    <Typography variant="body1" color="secondary">SELECT USER ID</Typography>
                    <Select 
                        fullWidth
                        size='small'
                        value={String(userSelected) ?? ""}
                        onChange={handleChangeUserSelected}
                    >
                        <MenuItem value={""} disabled>Choose a userId</MenuItem>
                        {distinctUsers.map((u, i) => (
                            <MenuItem value={String(u)} key={i}>userId: {u}</MenuItem>
                        ))}
                    </Select>
                </Box>
                <Box mt={4} display={'flex'} justifyContent={'center'}>
                    <Link className={styles.ResetFilters} color={'secondary'} onClick={handleResetFilters}>Reset filters</Link>
                </Box>
                </form>
            </CardContent>
        </Card>
    )

    return (
        <>

            <div className={styles.FiltersCardDesktop} >
                {card}
            </div>

            <div className={styles.FiltersCardMobile} >
                <Fab className={styles.FilterFab} color="secondary" onClick={handleClickShowDialog}>
                    <FilterAlt />
                </Fab>

                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogContent>
                        {card}
                    </DialogContent>
                </Dialog>
            </div>
        
        </>
    )
}

export default FIltersCard