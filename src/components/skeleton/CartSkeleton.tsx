import { Skeleton } from "@/components/ui/skeleton"
import Container from "../shared/Container"


const CartSkeleton = () => {
    return (
        <Container className="mt-8 space-y-6">
            <Skeleton className="h-[200px] w-full  rounded-lg" />
            <Skeleton className="h-[200px] w-full  rounded-lg" />
            <Skeleton className="h-[200px] w-full  rounded-lg" />
        </Container>
    )
}

export default CartSkeleton