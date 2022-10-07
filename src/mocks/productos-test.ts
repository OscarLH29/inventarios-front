import {AlmacenProducto, MovimientosCatalog, MovimientosRep} from '../app/model/interfaces/interfaces';

export const testProducts: Array<AlmacenProducto> = [
  {
    almacenId: 5,
    cantidad: 5,
    id: 1,
    nombreAlmacen: 'central',
    nombreProducto: 'laptop',
    productoId: 4,
    status: 1,
    tipo: 'nuevo',
  },
  {
    almacenId: 5,
    cantidad: 5,
    id: 2,
    nombreAlmacen: 'central',
    nombreProducto: 'celular',
    productoId: 5,
    status: 1,
    tipo: 'usado'
  },
  {
    almacenId: 5,
    cantidad: 5,
    id: 3,
    nombreAlmacen: 'central',
    nombreProducto: 'laptop',
    productoId: 2,
    status: 2,
    tipo: 'usado'
  },
  {
    almacenId: 5,
    cantidad: 4,
    id: 4,
    nombreAlmacen: 'central',
    nombreProducto: 'laptop',
    productoId: 2,
    status: 2,
    tipo: 'nuevo'
  }
];

export const testsMovimients: Array<MovimientosRep> = [
  {
    almacenId: 1,
    almacenProducto: 1,
    cantidad: 1,
    fechaMovimiento: '26/09/2022',
    guia: 'abc',
    id: 1,
    nombreAlmacen: 'central',
    nombreMovimiento: 'Nuevo',
    nombreProducto: 'laptop',
    productoId: 1,
    tipoMovimiento: 1,
    estatus: '1'
  },
  {
    almacenId: 1,
    almacenProducto: 1,
    cantidad: 1,
    fechaMovimiento: '27/09/2022',
    guia: 'abc',
    id: 2,
    nombreAlmacen: 'central',
    nombreMovimiento: 'Alta',
    nombreProducto: 'laptop',
    productoId: 2,
    tipoMovimiento: 1,
    estatus: '2'
  }
];

export const catalogoTipoMovimiento: Array<MovimientosCatalog> = [
  {
    id: 1,
    nombre: 'transferir'
  },
  {
    id: 2,
    nombre: 'devolucion'
  },
  {
    id: 3,
    nombre: 'salida'
  },
  {
    id: 4,
    nombre: 'alta'
  },
];
