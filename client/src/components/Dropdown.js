import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import classNames from 'classnames';
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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
    FETCH_POSTS_QUERY,
    DELETE_POST_MUTATION,
    DELETE_IMAGE_MUTATION,
} from '../utils/Graphql';

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
    menuIcon: {
        paddingRight: '5px',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const VerticalPostDropdown = ({ props, postId, path, filename }) => {
    const classes = useStyles();
    const [deletePost] = useMutation(DELETE_POST_MUTATION);
    const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION);
    const [menuOpen, setMenuOpen] = useState(false);
    const anchorRef = useRef(null);
    const prevOpen = useRef(menuOpen);
    useEffect(() => {
        if (prevOpen.current === true && menuOpen === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = menuOpen;
    }, [menuOpen]);

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setMenuOpen(false);
        }
    };

    const handleMenuToggle = () => {
        setMenuOpen((prevOpen) => !prevOpen);
    };

    const handleMenuClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setMenuOpen(false);
    };

    const handlePostDelete = async (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setMenuOpen(false);
        try {
            await deleteImage({ variables: { path, filename } });
            await deletePost({
                variables: {
                    postId,
                },
                update(proxy) {
                    const data = proxy.readQuery({
                        query: FETCH_POSTS_QUERY,
                    });
                    console.log(
                        data.getPosts.filter((post) => post._id !== postId)
                    );
                    data.getPosts = data.getPosts.filter(
                        (post) => post._id !== postId
                    );
                    proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
                },
            });
            props.history.push('/blog');
        } catch (error) {
            console.log(error);
        }
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
                                            className={classNames(
                                                classes.link,
                                                classes.menuItem
                                            )}
                                        >
                                            <EditIcon
                                                className={classes.menuIcon}
                                            />
                                            Edit
                                        </Link>
                                    </MenuItem>
                                    <MenuItem
                                        className={classNames(
                                            classes.link,
                                            classes.menuItem
                                        )}
                                        onClick={handlePostDelete}
                                    >
                                        <DeleteIcon
                                            className={classes.menuIcon}
                                        />
                                        Delete
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
