"use client";

import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiBugBeetleFill } from "react-icons/pi";

const NavBar = () => {

    const currentPath = usePathname();

    const links = [
        {
            lable: "Dashboard",
            href: "/"
        },
        {
            lable: "Issues",
            href: "/issues"
        },
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/"> <PiBugBeetleFill />

            </Link>
            <ul className='flex space-x-6'>

                {links.map((link) =>
                    <Link
                        key={link.href}
                        className={classnames({
                            "text-zinc-900": link.href === currentPath,
                            "text-zinc-500": link.href !== currentPath,
                            "hover:text-zinc-800 transition-colors": true,

                        })}
                        href={link.href}>{link.lable}</Link>
                )}

            </ul>
        </nav>
    )
}

export default NavBar;