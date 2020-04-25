import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuList,
    MenuItem,
    makeStyles,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    shareIcon: {
        padding: '5px',
        fontSize: '27px',
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

const VerticalPostDropdown = ({ postId }) => {
    const classes = useStyles();
    const [menuOpen, setMenuOpen] = useState(false);
    const anchorRef = useRef(null);
    const prevOpen = useRef(menuOpen);
    useEffect(() => {
        if (prevOpen.current === true && menuOpen === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = menuOpen;
    }, [menuOpen]);

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setMenuOpen(false);
        }
    }

    const handleMenuToggle = () => {
        setMenuOpen((prevOpen) => !prevOpen);
    };

    const handleMenuClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setMenuOpen(false);
    };
    return (
        <>
            <MoreVertIcon
                ref={anchorRef}
                aria-controls={menuOpen ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={handleMenuToggle}
                className={classes.shareIcon}
            />
            <Popper
                open={menuOpen}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom'
                                    ? 'center top'
                                    : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleMenuClose}>
                                <MenuList
                                    autoFocusItem={menuOpen}
                                    id='menu-list-grow'
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleMenuClose}>
                                        <Link
                                            to={`/updateblog/${postId}`}
                                            className={classes.link}
                                        >
                                            Edit
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleMenuClose}>
                                        <Link
                                            to={`/updateblog/${postId}`}
                                            className={classes.link}
                                        >
                                            Delete
                                        </Link>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export { VerticalPostDropdown };
