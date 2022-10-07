import {TransferProductComponent} from '../components/modals/transfer-product/transfer-product.component';
import {ExitProductComponent} from '../components/modals/exit-product/exit-product.component';
import {RestoreProductComponent} from '../components/modals/restore-product/restore-product.component';

export const AppConfig = {
  httpTimeout: 30000,
  generalMessageTimeout: 3000,
  timeOutDefault: 4000,
  timeOutDatasourceSet: 250
};

export const RoutesMenu = [
  {
    name: 'Inventario',
    icon: 'store',
    route: '/inventario'
  },
  {
    name: 'Operaciones',
    icon: 'arrow_forward',
    route: '/operacion'
  },
  {
    name: 'Movimientos',
    icon: 'calendar_today',
    route: '/reporte'
  }
];

export const DialogComponents = [
  {
    id: 1,
    component: TransferProductComponent,
    name: 'Transferir',
    value: 'transfer'
  },
  {
    id: 2,
    component: TransferProductComponent,
    name: 'Devolver',
    value: 'devol'
  },
  {
    id: 3,
    component: TransferProductComponent,
    name: 'Aplicar (salida)',
    value: 'salida'
  }
];
