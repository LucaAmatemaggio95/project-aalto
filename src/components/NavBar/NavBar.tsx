import { AppBar, Box, Container } from '@mui/material'
import React from 'react'
import styles from './NavBar.module.scss'
import Logo from '../../assets/images/aalto_it.png';

const NavBar = () => {

    return (
        <AppBar className={styles.AppBar} color="primary">
            <Container>
                <Box>
                    <img 
                        src={Logo}
                        alt={'Logo'}
                    />
                </Box>
            </Container>
        </AppBar>   
    )
}

export default NavBar