import React from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";

interface AccountLinkProps {
    userId: string;
}

const AccountLink: React.FC<AccountLinkProps> = ({ userId }) => {
    const path = usePathname();

    const isActive = (href: string) => {
        return path === href;
    };

    return (
        <Link href={`/dashboard/account/${userId}`}>
            <div
                className={`mb-4 group flex flex-col items-center cursor-pointer ${
                    isActive(`/dashboard/account/${userId}`) ? "text-blue-400" : ""
                }`}
            >
                <Settings size={24} />
                <span className="opacity-0 group-hover:opacity-100">Account</span>
            </div>
        </Link>
    );
};

export default AccountLink;