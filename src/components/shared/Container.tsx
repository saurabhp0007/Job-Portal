import { cn } from '@/lib/utils'

type ContainerProps = {
    children: React.ReactNode,
    className?: string
}

const Container = ({ children, className }: ContainerProps) => {
    return (
        <div className={cn("container mx-auto lg:px-24 md:px-16 px-4", className)}>{children}</div>
    )
}

export default Container