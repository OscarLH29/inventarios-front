import { environment } from './environment';

export const Endpoints = {
  security: {
    host: 'https://serviciosaws.axity.com/api/staffing',
    login: '/security/login'
  },
  inventories: {
    host: environment.baseUrl + '/icontrolc',
    productAlmacen: '/productosalmacen',
    reportesMov: '/movimientosalmacen',
    reportesMovByWord: '/movimientosproducto',
    postMovimiento: '/movimiento',
    acceptCancel: '/estatus'
  },
  catalogos: {
    host: environment.baseUrl + '/icontrolc',
    products: '/productos',
    typeMovs: '/tipomovimientocat',
    almacenByUser: '/almacencliente',
    clientes: '/clientesnombre'
  },
  demo: {
    colors: `${environment.baseUrl}/unknown`
  }
};

export const TokenExcludedEndpoints = [
  'login'
];
