import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	root: {
		padding: '0.5em 0',
		justifyContent: 'flex-start'
	},
	label: {
		display: 'inline',
		padding: '0.5em',
		backgroundColor: '#33333320',
		borderRadius: '5px',
		marginRight: '0.25em',
		color: '#333333'
	}
}));

const Label = props => {
	const classes = useStyles();
	return (
		<Box flex className={classes.root}>
			{props.tags.map(tag => {
				return (
					<Typography className={classes.label} variant='subtitle1'>
						{'#' + tag}
					</Typography>
				);
			})}
		</Box>
	);
};

export default Label;
