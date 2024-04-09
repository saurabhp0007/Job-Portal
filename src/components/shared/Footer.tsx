import React from 'react'
import Container from '../shared/Container'
import Link from 'next/link'
import FaceBook from '../icon/FaceBook'
import Linkdin from '../icon/Linkdin'
import Instagram from '../icon/Instagram'


const Footer = () => {
    return (
        <footer className='py-10 mt-20 text-white bg-gray-800'>
            <Container className='lg:grid-cols-3 grid items-center grid-cols-1 space-y-12'>
                <div className="lg:text-left text-center">
                    <h2 className="text-2xl font-medium">DashJ<span className='font-bold text-green-500'>o</span>b</h2>
                </div>

                <div className="justify-self-center flex flex-col gap-4">
                    <Link href="#">Home</Link>
                    <Link href="#">Category</Link>
                    <Link href="#">Jobs</Link>
                </div>

                <div className="lg:justify-self-end flex flex-row justify-center gap-6">
                    <FaceBook />
                    <Linkdin />
                    <Instagram />
                </div>
            </Container>
        </footer>
    )
}

export default Footer