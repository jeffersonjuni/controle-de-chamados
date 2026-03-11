'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Ticket, Settings } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Chamados',
      href: '/tickets',
      icon: Ticket,
    },
    {
      name: 'Administração',
      href: '/admin',
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-surface border-r border-border">
      <div className="p-6">
        {/* Logo */}
        <h1 className="text-xl font-bold textWhite mb-10">HelpDesk</h1>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                  
                  ${
                    active
                      ? 'bg-primary text-white'
                      : 'text-secondary hover:bg-border hover:text-white'
                  }
                  
                `}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
