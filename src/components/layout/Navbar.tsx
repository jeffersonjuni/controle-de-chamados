'use client';

import { Menu, User } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6">
      {/* Lado esquerdo */}
      <div className="flex items-center gap-4">
        {/* Botão menu */}
        <button
          onClick={toggleSidebar}
          aria-label="Abrir ou fechar menu lateral"
          className="p-2 rounded-md hover:bg-border transition"
        >
          <Menu size={20} />
        </button>

        {/* Título */}
        <h1 className="text-lg font-semibold text-white">Dashboard</h1>
      </div>

      {/* Lado direito */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-secondary">
          <User size={18} />

          <span className="text-sm">Usuário</span>
        </div>
      </div>
    </header>
  );
}
