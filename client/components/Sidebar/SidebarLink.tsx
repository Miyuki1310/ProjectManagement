import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  //   isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  //   isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  //   const screenWidth = window.innerWidth;
  //   const dispatch = useDispatch();
  //   const { isSidebarCollapsed } = useSelector((state: any) => state.global);
  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-2 py-4 pl-7 transition-all hover:bg-gray-200 dark:hover:bg-gray-800 ${isActive && "border-l-8 border-blue-300 bg-gray-100 dark:bg-gray-800"}`}
      >
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100"></Icon>
        <span className={`font-bold text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default SidebarLink;
