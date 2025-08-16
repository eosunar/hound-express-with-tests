
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Guia, EstadoGuia, Contadores } from '@/lib/types';
import Header from '@/components/header';
import GuiaForm from '@/components/guia-form';
import EstadoGeneral from '@/components/estado-general';
import ListaGuias from '@/components/lista-guias';
import BuscarGuias from '@/components/buscar-guias';
import { Card, CardContent } from '@/components/ui/card';
import { Package, TruckIcon, Target, Star } from 'lucide-react';

export default function HomePage() {
  const [guias, setGuias] = useLocalStorage<Guia[]>('hound-express-guias', []);
  const [activeSection, setActiveSection] = useState('inicio');

  const contadores: Contadores = useMemo(() => {
    const pendientes = guias?.filter(guia => guia?.estado === 'Pendiente')?.length ?? 0;
    const enTransito = guias?.filter(guia => guia?.estado === 'En tránsito')?.length ?? 0;
    const entregadas = guias?.filter(guia => guia?.estado === 'Entregado')?.length ?? 0;
    const total = guias?.length ?? 0;

    return { pendientes, enTransito, entregadas, total };
  }, [guias]);

  const handleAddGuia = (nuevaGuia: Omit<Guia, 'id'>) => {
    const guiaCompleta: Guia = {
      ...nuevaGuia,
      id: Date.now().toString(),
    };
    
    setGuias(prevGuias => [...(prevGuias ?? []), guiaCompleta]);
    setActiveSection('lista');
  };

  const handleUpdateEstado = (guiaId: string, nuevoEstado: EstadoGuia) => {
    setGuias(prevGuias => 
      (prevGuias ?? []).map(guia => {
        if (guia?.id === guiaId) {
          const comentarios: Record<EstadoGuia, string> = {
            'Pendiente': 'Guía registrada y pendiente de envío',
            'En tránsito': 'Paquete en tránsito hacia destino',
            'Entregado': 'Paquete entregado exitosamente'
          };

          return {
            ...guia,
            estado: nuevoEstado,
            historial: [
              ...(guia?.historial ?? []),
              {
                estado: nuevoEstado,
                fecha: new Date().toISOString(),
                comentario: comentarios[nuevoEstado] || `Estado actualizado a ${nuevoEstado}`
              }
            ]
          };
        }
        return guia;
      })
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'registro':
        return <GuiaForm guias={guias} onAddGuia={handleAddGuia} />;
      case 'lista':
        return <ListaGuias guias={guias} onUpdateEstado={handleUpdateEstado} />;
      case 'buscar':
        return <BuscarGuias guias={guias} />;
      default:
        return (
          <div className="space-y-8">
            <EstadoGeneral contadores={contadores} />
            
            <Card className="bg-gradient-to-r from-[#004080] to-blue-600 text-white">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <Package className="h-16 w-16 mx-auto text-blue-200" />
                  <h2 className="text-3xl font-bold">¡Bienvenido a Hound Express!</h2>
                  <p className="text-xl text-blue-100">
                    Sistema integral de gestión y seguimiento de guías de envío
                  </p>
                  <p className="text-blue-100 max-w-2xl mx-auto">
                    Registre, rastree y gestione sus envíos de manera eficiente con nuestro 
                    sistema completo de seguimiento en tiempo real.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="bg-blue-50 p-3 rounded-full w-fit mx-auto">
                    <Package className="h-8 w-8 text-[#004080]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#004080]">Registro Fácil</h3>
                  <p className="text-gray-600">
                    Registre nuevas guías de envío con información completa del destinatario y trayecto
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="bg-orange-50 p-3 rounded-full w-fit mx-auto">
                    <TruckIcon className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#004080]">Seguimiento en Tiempo Real</h3>
                  <p className="text-gray-600">
                    Monitoree el estado de sus envíos desde pendiente hasta entrega
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="bg-green-50 p-3 rounded-full w-fit mx-auto">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#004080]">Gestión Completa</h3>
                  <p className="text-gray-600">
                    Historial detallado y búsqueda rápida de todas sus guías
                  </p>
                </CardContent>
              </Card>
            </div>

            {guias?.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#004080] mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Actividad Reciente
                  </h3>
                  <div className="space-y-3">
                    {guias
                      .slice(-3)
                      .reverse()
                      .map((guia) => (
                        <div key={guia?.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Guía #{guia?.numeroGuia}</p>
                            <p className="text-sm text-gray-600">
                              {guia?.origen} → {guia?.destino}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              guia?.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                              guia?.estado === 'En tránsito' ? 'bg-orange-100 text-orange-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {guia?.estado}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderContent()}
      </main>
      
      <footer className="bg-[#004080] text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Package className="h-6 w-6" />
            <span className="text-xl font-bold">Hound Express</span>
          </div>
          <p className="text-blue-200">
            Sistema de gestión y seguimiento de guías de envío
          </p>
          <p className="text-blue-300 text-sm mt-2">
            © 2024 Hound Express. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
