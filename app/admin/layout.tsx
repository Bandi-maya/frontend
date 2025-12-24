"use client"
import { User, LogOut, Settings, LayoutDashboard, ShieldCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function Sidebar() {
  const location = usePathname();

  const navItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Brands", path: "/admin/brands" },
    { label: "Programs", path: "/admin/programs" },
    { label: "Categories", path: "/admin/categories" },
    { label: "Products", path: "/admin/products" },
    { label: "Orders", path: "/admin/orders" },
    { label: "Customers", path: "/admin/customers" },
    { label: "Contact Info", path: "/admin/contact-info" },
    { label: "Customization", path: "/admin/customization" }
  ];
  
  return (
    <aside className="w-64 bg-gray-900 text-gray-100 fixed left-0 top-0 h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 text-xl font-bold border-b border-gray-800">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-4 py-2 rounded-md text-sm transition
                ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-800 text-sm text-gray-400">
        © {new Date().getFullYear()} Admin
      </div>
    </aside>
  );
}


function Header() {
  const { user, logout }: any = useUser();
  const navigate = useRouter();

  useEffect(() => {
    if (!user) {
      // handleLogout();
    }
  }, [user])

  const handleLogout = () => {
    logout();
    navigate.push("/login");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          Admin <span className="text-primary">Dashboard</span>
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            {/* Avatar with Badge if Admin */}
            <div className="relative group">
              <div className="h-9 w-9 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center overflow-hidden hover:ring-2 ring-primary/20 transition-all cursor-pointer">
                {user?.avatar ? (
                  <img src={user.avatar} alt="User" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-5 w-5 text-slate-400" />
                )}
              </div>
              {user?.role === "admin" && (
                <div className="absolute -top-1 -right-1 bg-emerald-500 border-2 border-white w-3 h-3 rounded-full" title="Admin Verified" />
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 mt-2 p-2 rounded-2xl shadow-xl border-slate-100">
            <DropdownMenuLabel className="font-normal p-3">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-black text-slate-900">{user?.name || "Administrator"}</p>
                  {user?.role === "admin" && (
                    <span className="bg-primary/10 text-primary text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-slate-500 truncate">{user?.email}</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-slate-50" />

            <DropdownMenuItem asChild className="cursor-pointer py-2.5 rounded-xl focus:bg-slate-50">
              <Link href="/admin/contact-info">
                <Settings className="mr-3 h-4 w-4 text-slate-500" />
                <span className="font-semibold text-sm text-slate-700">System Settings</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-50" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer py-2.5 rounded-xl"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-bold text-sm">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

// export default Header;
export default function Layout({ children }: any) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 min-h-screen bg-gray-100">
        <Header />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
