import { Card, CardContent, Divider, List, ListItem, Pagination, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import styles from './ResultCard.module.scss';
import React from 'react'
import { Todo } from '../../../models/Todo';
import { Clear, Done } from '@mui/icons-material';

interface Props {
    list: Todo[],
    count: number,
    currentPage: number,
    updateCurrentPage: (newPage:number) => void
}

const ResultCard:React.FC<Props> = ({list, count, currentPage, updateCurrentPage}) => {

    const handleChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
        updateCurrentPage(value);
    }

    return (
        <Card>
            <CardContent>

                <Box className={styles.ResultTitle}>
                    <Typography variant="body1" color="secondary">user id</Typography>
                    <Typography variant="body1" color="secondary">title</Typography>
                    <Typography variant="body1" color="secondary" align="right">completed</Typography>
                </Box>
                <Divider />

                <List>
                    {list.map(item => (
                        <ListItem className={styles.ListItem} key={item.id}>
                            <Typography variant="subtitle1">{item.userId}</Typography>
                            <Typography variant="subtitle1">{item.title}</Typography>
                            <Box display={'flex'} justifyContent={'flex-end'}>
                                {item.completed
                                    ?   <Done className={styles.Icon} />
                                    :   <Clear className={styles.Icon} />
                                }
                            </Box>                            
                        </ListItem>
                    ))}
                </List>
                
                <Box display={'flex'} justifyContent={'center'}>
                    <Stack spacing={2}>
                        <Pagination color="secondary" count={count} page={currentPage} onChange={handleChangePage} />
                    </Stack>
                </Box>

            </CardContent>
        </Card>
    )
}

export default ResultCard