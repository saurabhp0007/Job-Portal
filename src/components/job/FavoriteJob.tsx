"use client";
import React from 'react'
import Favorite from '../icon/Favorite'
import { jobInfoProps } from '@/types/types';
import { useAppDispatch } from '@/store/hook';
import { favoriteList } from '@/store/features/userSlice';


const FavoriteJob = ({ jobDetailsData }: { jobDetailsData: jobInfoProps }) => {
    const dispatch = useAppDispatch();

    const handleFavoriteJobList = () => {
        dispatch(favoriteList(jobDetailsData))
    }
    return (
        <div onClick={handleFavoriteJobList}>
            <Favorite className='cursor-pointer' />
        </div>
    )
}

export default FavoriteJob