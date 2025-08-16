
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { SearchIcon, Package, AlertCircle, History } from 'lucide-react';
import { Guia } from '@/lib/types';
import HistorialGuias from './historial-guias';

interface BuscarGuiasProps {
  guias: Guia[];
}

export default function BuscarGuias({ guias }: BuscarGuiasProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<Guia | null>(null);
  const [searched, setSearched] = useState(false);
  const [selectedGuia, setSelectedGuia] = useState<Guia | null>(null);

  const handleSearch = () => {
    if (!searchTerm?.trim()) return;
    
    const found = guias?.find(
      guia => guia?.numeroGuia?.toLowerCase() === searchTerm.toLowerCase().trim()
    );
    
    setSearchResult(found || null);
    setSearched(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getEstadoColor = (estado: string) => {
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
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-[#004080]">
            <SearchIcon className="h-5 w-5" />
            <span>Buscar Guía</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Ingrese el número de guía (ej: GE001)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch}
              className="bg-[#004080] hover:bg-blue-700"
              disabled={!searchTerm?.trim()}
            >
              <SearchIcon className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>

          {searched && (
            <div className="mt-6">
              {searchResult ? (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-[#004080]">
                          #{searchResult.numeroGuia}
                        </h3>
                        <Badge className={getEstadoColor(searchResult.estado)}>
                          {searchResult.estado}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Origen:</span>
                          <p className="text-gray-900">{searchResult.origen}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Destino:</span>
                          <p className="text-gray-900">{searchResult.destino}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Destinatario:</span>
                          <p className="text-gray-900">{searchResult.destinatario}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Fecha de creación:</span>
                          <p className="text-gray-900">{formatFecha(searchResult.fechaCreacion)}</p>
                        </div>
                      </div>

                      <Button
                        onClick={() => setSelectedGuia(searchResult)}
                        variant="outline"
                        className="w-full text-[#004080] border-[#004080] hover:bg-blue-50"
                      >
                        <History className="h-4 w-4 mr-2" />
                        Ver Historial Completo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                      Guía no encontrada
                    </h3>
                    <p className="text-red-600">
                      No se encontró ninguna guía con el número &quot;{searchTerm}&quot;
                    </p>
                    <p className="text-sm text-red-500 mt-2">
                      Verifique que el número de guía sea correcto
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
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
