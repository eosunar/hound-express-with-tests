
'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Package, TruckIcon, CheckCircle, FileText } from 'lucide-react';
import { Contadores } from '@/lib/types';

interface EstadoGeneralProps {
  contadores: Contadores;
}

export default function EstadoGeneral({ contadores }: EstadoGeneralProps) {
  const stats = [
    {
      title: 'Total de Guías',
      value: contadores?.total ?? 0,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pendientes',
      value: contadores?.pendientes ?? 0,
      icon: Package,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'En Tránsito',
      value: contadores?.enTransito ?? 0,
      icon: TruckIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Entregadas',
      value: contadores?.entregadas ?? 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map(({ title, value, icon: Icon, color, bgColor }) => (
        <Card key={title} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className={`text-3xl font-bold ${color}`}>
                  {value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${bgColor}`}>
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
