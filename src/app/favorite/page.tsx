"use client";

import Container from '@/components/shared/Container'
import JobShowCart from '@/components/shared/JobShowCart'
import EmptyData from '@/components/svg/EmptyData';
import { Button } from '@/components/ui/button';
import { removeFavoriteList } from '@/store/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook'
import React from 'react'

const FavoritePage = () => {
    const favoriteList = useAppSelector((state) => state.user.favorite);
    const dispatch = useAppDispatch();

    //clear favorite list
    const deleteFavoriteList = () => {
        dispatch(removeFavoriteList());
    }
    return (
        <Container className='mt-10'>
            {favoriteList.length ? favoriteList.map((item) => (
                <JobShowCart job={item} />
            )) : <div className="py-20 text-center">
                <EmptyData className='w-40 h-40 mx-auto' />
                <h4 className='mt-10 text-xl font-semibold text-green-500'>Empty Favorite List</h4>
            </div>}

            {/* clear favorite list */}
            {favoriteList.length ?
                <div className="flex justify-end mt-10" >
                    <Button variant="destructive" size="lg" onClick={deleteFavoriteList}>Clear Favorite List</Button>
                </div> :
                null}
        </Container>
    )
}

export default FavoritePage