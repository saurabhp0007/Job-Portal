import Container from '@/components/shared/Container'
import NotFound from '@/components/svg/NotFound'
import React from 'react'

const NotFoundPage = () => {
    return (
        <Container className='py-20'>
            <NotFound className='w-80 h-80 mx-auto' />
        </Container>
    )
}

export default NotFoundPage