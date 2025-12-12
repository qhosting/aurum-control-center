"use client";

import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/presentation/components/ui/button';
import { LogOut, Bell } from 'lucide-react';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="fixed left-64 right-0 top-0 z-30 h-16 border-b border-cyber-border bg-cyber-card">
      <div className="flex h-full items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold text-gold-500">
            Bienvenido, {session?.user?.name}
          </h1>
          <p className="text-sm text-gray-400">Panel de Control Aurum Capital</p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-400 hover:text-gold-500"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-cyber-dark">
              3
            </span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-gray-400 hover:text-gold-500"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </header>
  );
}
