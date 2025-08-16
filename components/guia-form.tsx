
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { Guia } from '@/lib/types';

interface GuiaFormProps {
  guias: Guia[];
  onAddGuia: (guia: Omit<Guia, 'id'>) => void;
}

export default function GuiaForm({ guias, onAddGuia }: GuiaFormProps) {
  const [formData, setFormData] = useState({
    numeroGuia: '',
    origen: '',
    destino: '',
    destinatario: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.numeroGuia?.trim()) {
      newErrors.numeroGuia = 'El número de guía es obligatorio';
    } else if (guias?.some(guia => guia?.numeroGuia === formData.numeroGuia)) {
      newErrors.numeroGuia = 'Este número de guía ya existe';
    }

    if (!formData.origen?.trim()) {
      newErrors.origen = 'El origen es obligatorio';
    }

    if (!formData.destino?.trim()) {
      newErrors.destino = 'El destino es obligatorio';
    }

    if (!formData.destinatario?.trim()) {
      newErrors.destinatario = 'El destinatario es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const now = new Date().toISOString();
      const nuevaGuia = {
        numeroGuia: formData.numeroGuia,
        origen: formData.origen,
        destino: formData.destino,
        destinatario: formData.destinatario,
        fechaCreacion: now,
        estado: 'Pendiente' as const,
        historial: [
          {
            estado: 'Pendiente' as const,
            fecha: now,
            comentario: 'Guía creada'
          }
        ]
      };

      onAddGuia(nuevaGuia);
      setFormData({
        numeroGuia: '',
        origen: '',
        destino: '',
        destinatario: '',
      });
      setErrors({});
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-[#004080]">
          <PlusCircle className="h-5 w-5" />
          <span>Registrar Nueva Guía</span>
        </CardTitle>
        <CardDescription>
          Complete todos los campos obligatorios para registrar una nueva guía de envío.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numeroGuia">Número de Guía *</Label>
              <Input
                id="numeroGuia"
                value={formData.numeroGuia}
                onChange={(e) => handleInputChange('numeroGuia', e.target.value)}
                placeholder="Ej: GE001"
                className={errors.numeroGuia ? 'border-red-500' : ''}
              />
              {errors.numeroGuia && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.numeroGuia}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="destinatario">Destinatario *</Label>
              <Input
                id="destinatario"
                value={formData.destinatario}
                onChange={(e) => handleInputChange('destinatario', e.target.value)}
                placeholder="Nombre del destinatario"
                className={errors.destinatario ? 'border-red-500' : ''}
              />
              {errors.destinatario && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.destinatario}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="origen">Origen *</Label>
              <Input
                id="origen"
                value={formData.origen}
                onChange={(e) => handleInputChange('origen', e.target.value)}
                placeholder="Ciudad de origen"
                className={errors.origen ? 'border-red-500' : ''}
              />
              {errors.origen && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.origen}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="destino">Destino *</Label>
              <Input
                id="destino"
                value={formData.destino}
                onChange={(e) => handleInputChange('destino', e.target.value)}
                placeholder="Ciudad de destino"
                className={errors.destino ? 'border-red-500' : ''}
              />
              {errors.destino && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.destino}</span>
                </p>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#004080] hover:bg-blue-700"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Registrar Guía
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
