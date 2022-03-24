import { AppBar, Container, Typography } from '@mui/material'
import React from 'react'
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <AppBar className={styles.Footer} color="secondary">
            <Container>
                <Typography variant="subtitle2">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco</Typography>
            </Container>
        </AppBar>
    )
}

export default Footer