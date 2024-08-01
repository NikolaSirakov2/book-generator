'use client';
import React, { useState, useEffect } from 'react';
import { likeBook, dislikeBook } from '../../api/api';

interface BookLikeProps {
    bookId: string;
    token: string;
    defaultLiked: boolean;
}

const BookLike: React.FC<BookLikeProps> = ({ bookId, token, defaultLiked }) => {
    const [liked, setLiked] = useState(defaultLiked);

    useEffect(() => {
        setLiked(defaultLiked);
    }, [defaultLiked]);

    const toggleLike = async (event: React.MouseEvent) => {
        event.preventDefault();
        try {
            if (liked) {
                await dislikeBook(bookId, token);
            } else {
                await likeBook(bookId, token);
            }
            setLiked(!liked);
        } catch (error) {
            console.error("Error toggling like:", error);
            setLiked(!liked);
        }
    };

    return (
        <button onClick={toggleLike} style={{
            cursor: 'pointer',
            outline: 'none',
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            userSelect: 'none',
        }}>
            {liked ? '❤️' : '🖤'}
        </button>
    );
}

export default BookLike;
