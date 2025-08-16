
export type EstadoGuia = 'Pendiente' | 'En tránsito' | 'Entregado';

export interface HistorialEntry {
  estado: EstadoGuia;
  fecha: string;
  comentario?: string;
}

export interface Guia {
  id: string;
  numeroGuia: string;
  origen: string;
  destino: string;
  destinatario: string;
  fechaCreacion: string;
  estado: EstadoGuia;
  historial: HistorialEntry[];
}

export interface Contadores {
  pendientes: number;
  enTransito: number;
  entregadas: number;
  total: number;
}
