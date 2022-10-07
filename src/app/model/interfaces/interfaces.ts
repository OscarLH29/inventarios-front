export interface Producto {
  id: number;
  estado?: string;
  nombre?: string;
}

export interface MovimientosCatalog {
  id: number;
  nombre?: string;
}

export interface AlmacenPersona {
  id?: number;
  almacenId?: number;
  nombreAlmacen?: string;
  nombrePersona?: string;
  personaId?: number;
  rol?: string;
}

export interface AlmacenProducto {
  id?: number;
  almacenId?: number;
  cantidad?: number;
  nombreAlmacen?: string;
  nombreProducto?: string;
  productoId?: number;
  status?: number;
  tipo?: number | string;
}

export interface Almacen {
  id?: number;
  estado?: number;
  nombre?: string;
}

export interface Cliente {
  id?: number;
  nombre?: string;
  almacenId?: number;
}

export interface MovimientosRep {
  id?: number;
  productoId?: number;
  almacenId?: number;
  tipoMovimiento?: number;
  almacenProducto?: number | string;
  cantidad?: number;
  fechaMovimiento?: string;
  guia?: string;
  nombreAlmacen?: string;
  nombreMovimiento?: string;
  nombreProducto?: string;
  estatus?: string;
}

export interface User {
  id: string;
  age: number;
  dsLastName: string;
  dsName: string;
  dsEmail: string;
  almacenId: number;
  almacen: string;
}

export interface PostMovimientos {
  almacenId: number;
  almacenIdRef: number;
  cantidad: number;
  fechaMovimiento: string;
  guia: string;
  productoId: number;
  tipoMovimiento: number;
}
