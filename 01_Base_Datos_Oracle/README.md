# Base de Datos Oracle - Scripts SQL

## Descripción
Este directorio contiene todos los scripts SQL para implementar la base de datos Oracle del Sistema de Gestión de Ventas (SGV).

## Orden de Ejecución

Ejecutar los scripts en el siguiente orden para crear correctamente la base de datos:

### 1️⃣ **01_CrearUsuario.sql**
Crea el usuario de base de datos con los permisos necesarios.
```sql
@01_CrearUsuario.sql
```

### 2️⃣ **02_Creacion_Tablas_y_Datos.sql**
Crea todas las tablas del sistema e inserta los datos de prueba.
- Tablas: departamentos, empleados, productos, clientes, órdenes, detalle_orden, proveedores, inventario, pagos, reportes
```sql
@02_Creacion_Tablas_y_Datos.sql
```

### 3️⃣ **03_Funciones_Externas.sql**
Crea funciones almacenadas independientes.
- `fn_descuento`: Aplica descuentos según monto
- `fn_valida_stock`: Verifica disponibilidad de inventario
```sql
@03_Funciones_Externas.sql
```

### 4️⃣ **04_Package_Ventas_Spec.sql**
Crea la especificación del package de ventas.
- Package: `pkg_ventas_vendedores`
```sql
@04_Package_Ventas_Spec.sql
```

### 5️⃣ **05_Package_Ventas_Body.sql**
Crea el cuerpo del package de ventas.
- Implementación de funciones y procedimientos del package
```sql
@05_Package_Ventas_Body.sql
```

### 6️⃣ **06_Tipos_Trigger_Package_Clientes.sql** ⭐ NUEVO
Crea los tipos compuestos, trigger y package de clientes.
- **VARRAY**: `t_metodos_pago`
- **RECORD**: `t_cliente_record`
- **TRIGGER**: `trg_actualiza_inventario`
- **PACKAGE**: `pkg_gestion_clientes`
```sql
@06_Tipos_Trigger_Package_Clientes.sql
```

### 7️⃣ **07_Pruebas_Ventas.sql**
Script de pruebas para el package de ventas.
```sql
@07_Pruebas_Ventas.sql
```

### 8️⃣ **08_Pruebas_Tipos_Trigger.sql** ⭐ NUEVO
Script de pruebas para tipos compuestos y trigger.
```sql
@08_Pruebas_Tipos_Trigger.sql
```

## Ejecución Rápida

Para ejecutar todos los scripts en orden desde SQL*Plus o SQL Developer:

```sql
-- Conectarse como usuario con privilegios para crear usuarios
@01_CrearUsuario.sql

-- Conectarse como el usuario test123 creado
@02_Creacion_Tablas_y_Datos.sql
@03_Funciones_Externas.sql
@04_Package_Ventas_Spec.sql
@05_Package_Ventas_Body.sql
@06_Tipos_Trigger_Package_Clientes.sql
@07_Pruebas_Ventas.sql
@08_Pruebas_Tipos_Trigger.sql
```

## Componentes Implementados

### ✅ Tablas (10)
- departamentos, empleados, productos, clientes, órdenes
- detalle_orden, proveedores, inventario, pagos
- reporte_ventas_vendedores

### ✅ Tipos Compuestos
- **VARRAY**: `t_metodos_pago` - Array de métodos de pago
- **RECORD**: `t_cliente_record` - Registro con información completa del cliente

### ✅ Trigger (1)
- `trg_actualiza_inventario` - Control automático de inventario

### ✅ Packages (2)
- `pkg_ventas_vendedores` - Reportes de ventas
- `pkg_gestion_clientes` - Gestión y análisis de clientes

### ✅ Funciones (5)
- `fn_descuento`
- `fn_valida_stock`
- `fn_total_ventas_vendedor`
- `fn_total_productos_vendedor`
- `fn_info_cliente`

### ✅ Procedimientos (2)
- `prc_genera_reporte_ventas`
- `prc_reporte_clientes`

## Notas Importantes

- Asegurarse de tener privilegios suficientes antes de ejecutar los scripts
- Revisar la contraseña en `01_CrearUsuario.sql` (solo para desarrollo)
- Activar `SET SERVEROUTPUT ON` para ver mensajes de DBMS_OUTPUT
- Los scripts de prueba (07 y 08) generan salida en consola

## Requisitos

- Oracle Database 11g o superior
- SQL*Plus, SQL Developer, o herramienta compatible
- Privilegios para crear usuarios, tablas y objetos PL/SQL
