
'use client';

import { Package, TruckIcon, FileTextIcon, SearchIcon } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Header({ activeSection, onSectionChange }: HeaderProps) {
  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Package },
    { id: 'registro', label: 'Registrar Guía', icon: FileTextIcon },
    { id: 'lista', label: 'Lista de Guías', icon: TruckIcon },
    { id: 'buscar', label: 'Buscar', icon: SearchIcon },
  ];

  return (
    <header className="bg-[#004080] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-blue-200" />
            <h1 className="text-xl font-bold">Hound Express</h1>
          </div>
          
          <nav className="flex space-x-1">
            {menuItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onSectionChange(id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                  activeSection === id
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:block">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
