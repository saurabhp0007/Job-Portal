import { category } from '@/data/data'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'


const Category = () => {
    return (
        <div className="sm:mt-32 mt-10">
            <h2 className="sub-title">Job Category</h2>
            <div className="lg:grid-cols-5 sm:grid-cols-3 grid grid-cols-2 gap-4">
                {category?.map((item) => (
                    <Link href={`/job?category=${encodeURIComponent(item.text).replace(/%20/g, "+")}`} key={item.id} className="hover:bg-green-400 group flex items-center gap-4 p-4 transition-all duration-300 bg-white border border-gray-300 rounded-lg" >
                        <div className="group-hover:text-white">{item.icon}</div>
                        <h4 className="group-hover:text-white lg:text-sm text-xs font-semibold text-gray-600">{item.text}</h4>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Category