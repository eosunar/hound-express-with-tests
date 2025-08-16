

'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, Package, TruckIcon, CheckCircle, X } from 'lucide-react';
import { Guia, EstadoGuia } from '@/lib/types';

interface HistorialGuiasProps {
  guia: Guia;
  isOpen: boolean;
  onClose: () => void;
}

export default function HistorialGuias({ guia, isOpen, onClose }: HistorialGuiasProps) {
  const getEstadoIcon = (estado: EstadoGuia) => {
    switch (estado) {
      case 'Pendiente':
        return <Clock className="h-4 w-4" />;
      case 'En tránsito':
        return <TruckIcon className="h-4 w-4" />;
      case 'Entregado':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getEstadoColor = (estado: EstadoGuia) => {
    switch (estado) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'En tránsito':
        return 'bg-orange-100 text-orange-800';
      case 'Entregado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[#004080]">
              Historial de Guía #{guia?.numeroGuia}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-[#004080] mb-2">Información de la Guía</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Origen:</span> {guia?.origen}
              </div>
              <div>
                <span className="font-medium">Destino:</span> {guia?.destino}
              </div>
              <div>
                <span className="font-medium">Destinatario:</span> {guia?.destinatario}
              </div>
              <div>
                <span className="font-medium">Estado Actual:</span>
                <Badge className={`ml-2 ${getEstadoColor(guia?.estado)}`}>
                  {getEstadoIcon(guia?.estado)}
                  <span className="ml-1">{guia?.estado}</span>
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#004080] mb-4">Historial de Estados</h3>
            <div className="space-y-3">
              {guia?.historial?.map((entry, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <Badge className={getEstadoColor(entry?.estado)}>
                      {getEstadoIcon(entry?.estado)}
                      <span className="ml-1">{entry?.estado}</span>
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{entry?.comentario}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatFecha(entry?.fecha)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
