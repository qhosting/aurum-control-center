"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Satellite,
  CheckSquare,
  TicketCheck,
  DollarSign,
  Settings,
  Users,
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: string[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Satélites',
    href: '/dashboard/satellites',
    icon: Satellite,
    roles: ['CEO', 'MANAGER'],
  },
  {
    title: 'Tareas',
    href: '/dashboard/tasks',
    icon: CheckSquare,
  },
  {
    title: 'Tickets',
    href: '/dashboard/tickets',
    icon: TicketCheck,
  },
  {
    title: 'Finanzas',
    href: '/dashboard/finance',
    icon: DollarSign,
    roles: ['CEO', 'MANAGER'],
  },
  {
    title: 'Usuarios',
    href: '/dashboard/users',
    icon: Users,
    roles: ['CEO'],
  },
  {
    title: 'Configuración',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['CEO', 'MANAGER'],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(userRole || '')
  );

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-cyber-border bg-cyber-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-cyber-border px-6">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500">
              <span className="text-xl font-bold text-cyber-dark">A</span>
            </div>
            <span className="text-lg font-bold text-gold-500">
              Aurum Control
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4 cyber-scrollbar overflow-y-auto">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-gold-500 text-cyber-dark'
                    : 'text-gray-300 hover:bg-cyber-border hover:text-gold-500'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        {session?.user && (
          <div className="border-t border-cyber-border p-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-cyber-dark font-bold">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {session.user.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {session.user.role}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
