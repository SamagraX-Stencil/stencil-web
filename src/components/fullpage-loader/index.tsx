import { FC } from 'react'
import { Backdrop, Stack } from '@mui/material';
import styles from './style.module.css';
const FullPageLoader:  FC<{ loading: boolean,color?:string }> = ({ loading ,color ="#25b09b"}) => (
	<Backdrop sx={{ color: '#fff', zIndex: 99999 }} open={loading}>
		<Stack gap={2} alignItems="center">
			{/* <CircularProgress color="primary" /> */}
			<div id="loader" className={`${styles.loader}`} style={{color}}></div>
		</Stack>
	</Backdrop>
);

export default FullPageLoader