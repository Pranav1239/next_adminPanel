"use client"
import React from 'react'
import GetCategory from './GetCategory'
import PostCategory from './PostCategory'

export default function Category() {
    return (
        <div>
            <PostCategory />
            <GetCategory />
        </div>
    )
}
