import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTHORIZATION
import { AuthProvider } from "../context/AuthProvider";
import Login from "../components/Authorization/Login";
import Register from "../components/Authorization/Register";
import RequireAuth from "../components/Authorization/RequireAuth";

// LOGIN PERSISTENCE
import PersistLogin from "../components/Authorization/PersistLogin";

// PAGES
import Home from "../pages/Home";
import Main from "../layout/main";
import Proveedores from "../pages/Proveedores";
import Clientes from "../pages/Clientes";

//SERVICES
import AddForm from "../pages/Clientes/addform";
import Provincias from "../pages/Mantenimiento/Provincias";
import FormasPago from "../pages/Mantenimiento/FormasPago";
import Venta from "../pages/Ventas/Venta";
import Compra from "../pages/Compras/Compra";
import Categorias from "../pages/Mantenimiento/Categorías";
import Articulos from "../pages/Productos/Articulos";
import Embalajes from "../pages/Mantenimiento/Embalajes";
import Entidades from "../pages/Mantenimiento/Entidades";
import Impuestos from "../pages/Mantenimiento/Impuestos";
import Almacenes from "../pages/Mantenimiento/Almacenes";
import Productos from "../pages/Productos/Productos";
import CategoriasProductos from "../pages/Mantenimiento/CategoríasProductos";
import Areas from "../pages/Mantenimiento/Áreas";
import Produccion from "../pages/Produccion/Produccion";
import Factura from "../pages/Compras/Facturas";
import Remisiones from "../pages/Compras/Remisiones";
import FacturaVentas from "../pages/Ventas/Facturas";
import RemisionesVentas from "../pages/Ventas/Remisiones";
import Requerimientos from "../pages/Requerimientos/Requerimientos";
import Inventario from "../pages/Inventario/Articulos";
import Servicios from "../pages/Servicios/Servicios";
import CajaDiaria from "../pages/Tesorería/CajaDiaria";
import Bien from "../pages/Servicios/Bien";
import Trabajadores from "../pages/Trabajadores";
import Historial from "../pages/Tesorería/Historial";
import Kardex from "../pages/Kardex/kardex";
import KardexProducto from "../pages/Kardex/kardexproducto";

// LAYOUTS

const Router = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
        <Route element={<Main />}>
          
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Private routes */}
          <Route element={<PersistLogin/>}>
            <Route element={<RequireAuth/>}>
              <Route path="/" element={<Home />} />
              
              {/* Clientes */}
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/clientes/add" element={<AddForm />} />
              
              {/* Proveedores */}
              <Route path="/proveedores" element={<Proveedores />} />

              {/* Trabajadores */}
              <Route path="/trabajadores" element={<Trabajadores />} />

              {/* Articulos y Productos */}
              <Route path="/productos/articulos" element={<Articulos />} />
              <Route path="/productos/productos" element={<Productos />} />

              {/* Produccion */}
              <Route path="/produccion/produccion" element={<Produccion />} />

              {/* Tesoreria */}
              <Route path="/tesoreria/cajadiaria" element={<CajaDiaria />} />
              <Route path="/tesoreria/historial" element={<Historial />} />

              {/* Otros */}
              <Route path="/mantenimientos/provincias" element={<Provincias />} />
              <Route path="/mantenimientos/categorias" element={<Categorias />} />
              <Route path="/mantenimientos/embalajes" element={<Embalajes />} />
              <Route path="/mantenimientos/formaspago" element={<FormasPago />} />
              <Route path="/mantenimientos/entidades" element={<Entidades />} />
              <Route path="/mantenimientos/impuestos" element={<Impuestos />} />
              <Route path="/mantenimientos/almacenes" element={<Almacenes />} />
              <Route path="/mantenimientos/categoriasproductos" element={<CategoriasProductos />} />
              <Route path="/mantenimientos/areas" element={<Areas />} />

              {/* Venta */}
              <Route path="/ventas/venta" element={<Venta />} />
              <Route path="/ventas/facturas" element={<FacturaVentas />} />
              <Route path="/ventas/remisiones" element={<RemisionesVentas />} />

              {/* Compras */}
              <Route path="/compras/compra" element={<Compra />} />
              <Route path="/compras/facturas" element={<Factura />} />
              <Route path="/compras/remisiones" element={<Remisiones />} />

              {/* Servicios */}
              <Route path="/servicios/servicios" element={<Servicios />} />
              <Route path="/servicios/bien" element={<Bien/>} />

              {/* Requerimientos */}
              <Route path="/requerimientos/requerimientos" element={<Requerimientos />} />

              // Agrega la ruta para el componente Kardex
              <Route path="/kardex" element={<Kardex />} />

                            {/* Inventario */}
                            <Route path="/Inventario/Articulos" element={<Inventario />} />
                            <Route path="/productos/productos/kardex/:productId" element={<KardexProducto />} />
            </Route>
          </Route>

        </Route>

    </Routes>
    </AuthProvider>     
    </BrowserRouter>
  );
};

export default Router;
