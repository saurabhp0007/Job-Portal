import Category from '@/components/shared/Category'
import Container from '@/components/shared/Container'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Category"
}


const page = () => {
    return (
        <Container className='mt-20'>
            <Category />
        </Container>
    )
}

export default page