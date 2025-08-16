
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Package, TruckIcon, CheckCircle, Clock, ArrowRight, History } from 'lucide-react';
import { Guia, EstadoGuia } from '@/lib/types';
import HistorialGuias from './historial-guias';

interface ListaGuiasProps {
  guias: Guia[];
  onUpdateEstado: (guiaId: string, nuevoEstado: EstadoGuia) => void;
}

export default function ListaGuias({ guias, onUpdateEstado }: ListaGuiasProps) {
  const [selectedGuia, setSelectedGuia] = useState<Guia | null>(null);

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

  const getNextEstado = (currentEstado: EstadoGuia): EstadoGuia | null => {
    switch (currentEstado) {
      case 'Pendiente':
        return 'En tránsito';
      case 'En tránsito':
        return 'Entregado';
      default:
        return null;
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

  if (!guias?.length) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No hay guías registradas aún</p>
          <p className="text-sm text-gray-500">
            Utilice el formulario de registro para crear su primera guía
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-[#004080]">
            <Package className="h-5 w-5" />
            <span>Lista de Guías ({guias.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {guias.map((guia) => {
              const nextEstado = getNextEstado(guia?.estado);
              
              return (
                <div
                  key={guia?.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-lg">#{guia?.numeroGuia}</h3>
                        <Badge className={getEstadoColor(guia?.estado)}>
                          {getEstadoIcon(guia?.estado)}
                          <span className="ml-1">{guia?.estado}</span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">De:</span> {guia?.origen}
                        </div>
                        <div>
                          <span className="font-medium">Para:</span> {guia?.destino}
                        </div>
                        <div>
                          <span className="font-medium">Destinatario:</span> {guia?.destinatario}
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Creada: {formatFecha(guia?.fechaCreacion)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedGuia(guia)}
                        className="text-[#004080] border-[#004080] hover:bg-blue-50"
                      >
                        <History className="h-4 w-4 mr-1" />
                        Historial
                      </Button>
                      
                      {nextEstado && (
                        <Button
                          size="sm"
                          onClick={() => onUpdateEstado(guia?.id, nextEstado)}
                          className="bg-[#004080] hover:bg-blue-700"
                        >
                          <ArrowRight className="h-4 w-4 mr-1" />
                          {nextEstado}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {selectedGuia && (
        <HistorialGuias
          guia={selectedGuia}
          isOpen={!!selectedGuia}
          onClose={() => setSelectedGuia(null)}
        />
      )}
    </>
  );
}
