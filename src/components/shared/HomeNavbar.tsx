"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation"

const HomeNavbar = () => {
    const path = usePathname();

    //home nav item
    const navItem = [
        {
            id: 1,
            title: "Dashboard",
            link: "/dashboard/home/inventory-dashboard"
        },
        {
            id: 2,
            title: "Getting Started",
            link: "/dashboard/home/gatting-started"
        },
        {
            id: 1,
            title: "Recent Upload",
            link: "/dashboard/home/recent-uplotas"
        },
        {
            id: 1,
            title: "announcement",
            link: "/dashboard/home/announcement"
        },
    ]
    return (
        <div className="space-x-5">
            {navItem?.map((item) => (
                <Link key={item.id} href={item.link} className={cn("text-gray-500", path === item.link ? "py-1 border-b-2 border-blue-400 text-black " : null)}>
                    {item.title}
                </Link>
            ))}
        </div>
    )
}

export default HomeNavbar