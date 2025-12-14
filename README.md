# Sistema de Gestión de Ventas (SGV) - Base de Datos

## Descripción del Proyecto

Este proyecto implementa un sistema integral de gestión de ventas que combina bases de datos relacionales (Oracle PL/SQL) y no relacionales (MongoDB), cumpliendo con los requisitos de la evaluación final transversal del curso BDY1103 - Taller de Base de Datos.

## Estructura del Proyecto

### Archivos Oracle Database (PL/SQL)

1. **1. script creacion tablas y llenado.txt**
   - Crea todas las tablas del sistema (departamentos, empleados, productos, clientes, órdenes, etc.)
   - Inserta datos de prueba en todas las tablas
   - Define la estructura base del sistema

2. **2. package.txt**
   - Define el package `pkg_ventas_vendedores`
   - Incluye declaraciones de funciones y procedimientos para reportes de ventas
   - Variables globales para control de reportes

3. **3. package body.txt**
   - Implementa el cuerpo del package `pkg_ventas_vendedores`
   - Funciones: `fn_total_ventas_vendedor`, `fn_total_productos_vendedor`
   - Procedimiento: `prc_genera_reporte_ventas` (usa cursores anidados)
   - Manejo de excepciones predefinidas y personalizadas

4. **4. funciones externas.txt**
   - `fn_descuento`: Aplica descuentos según el monto total
   - `fn_valida_stock`: Verifica disponibilidad de productos

5. **5 exec.txt**
   - Scripts de ejecución para probar packages y funciones
   - Ejemplos de uso de todos los objetos creados

6. **6. tipos_compuestos_y_trigger.txt** (NUEVO)
   - **VARRAY**: `t_metodos_pago` - Array para almacenar métodos de pago
   - **RECORD**: `t_cliente_record` - Registro estructurado para información de clientes
   - **TRIGGER**: `trg_actualiza_inventario` - Control automático de inventario
   - **PACKAGE**: `pkg_gestion_clientes` - Uso de tipos compuestos en operaciones

7. **7. exec_tipos_y_trigger.txt** (NUEVO)
   - Pruebas del trigger de inventario
   - Pruebas de VARRAY y RECORD
   - Validaciones de stock bajo

8. **CrearUsuario.sql**
   - Script para crear usuario de base de datos con permisos necesarios

### Archivo MongoDB (NoSQL)

9. **creación de tablas e insercion.txt**
   - Scripts de inserción para MongoDB
   - Colecciones: departamentos, empleados, productos, clientes, órdenes, inventario, pagos
   - Formato JSON para base de datos no relacional

## Componentes Implementados

### 1. Tipos de Datos Compuestos

#### VARRAY (Variable-Size Array)
```sql
TYPE t_metodos_pago AS VARRAY(5) OF VARCHAR2(50);
```
- Permite almacenar hasta 5 métodos de pago diferentes
- Se usa en el package `pkg_gestion_clientes`
- Ejemplo de uso: almacenar todos los métodos de pago usados por un cliente

#### RECORD
```sql
TYPE t_cliente_record IS RECORD (
    cliente_id    NUMBER,
    nombre        VARCHAR2(100),
    correo        VARCHAR2(100),
    total_ordenes NUMBER,
    total_gastado NUMBER,
    metodos_pago  t_metodos_pago
);
```
- Estructura de datos compuesta para información completa del cliente
- Integra el VARRAY dentro del RECORD
- Se usa en funciones que retornan información compleja

### 2. Trigger

#### trg_actualiza_inventario
```sql
TRIGGER trg_actualiza_inventario AFTER INSERT ON detalle_orden FOR EACH ROW
```
**Funcionalidad:**
- Se activa automáticamente al insertar un nuevo detalle de orden
- Actualiza el stock en la tabla `inventario`
- Genera alertas cuando el stock cae bajo el mínimo
- Maneja excepciones para productos no encontrados

**Justificación:**
- Mantiene la integridad del inventario en tiempo real
- Previene ventas de productos sin stock
- Alerta automática para reabastecimiento

### 3. Packages

#### pkg_ventas_vendedores
- **Funciones:**
  - `fn_total_ventas_vendedor`: Calcula ventas totales por vendedor
  - `fn_total_productos_vendedor`: Cuenta productos vendidos
- **Procedimiento:**
  - `prc_genera_reporte_ventas`: Genera reporte usando cursores anidados
- **Características:**
  - Usa cursores con parámetros
  - Loops anidados (FOR dentro de FOR)
  - Excepciones personalizadas

#### pkg_gestion_clientes (NUEVO)
- **Funciones:**
  - `fn_info_cliente`: Retorna RECORD con información completa
- **Procedimiento:**
  - `prc_reporte_clientes`: Genera reporte usando RECORD y VARRAY
- **Características:**
  - Demuestra uso de tipos compuestos
  - Integración de VARRAY en RECORD
  - Procesamiento complejo de datos

### 4. Funciones Externas

- `fn_descuento`: Aplica descuentos escalonados
- `fn_valida_stock`: Verifica disponibilidad en inventario

### 5. Cursores

#### Cursores sin parámetros:
```sql
CURSOR c_vendedores IS
    SELECT emp_id, nombre FROM empleados WHERE dept_id = 10;
```

#### Cursores con parámetros:
```sql
CURSOR c_productos(p_vendedor_id NUMBER) IS
    SELECT ... WHERE vendedor_id = p_vendedor_id;
```

### 6. Manejo de Excepciones

#### Excepciones Predefinidas:
- `NO_DATA_FOUND`: Cuando no se encuentra información
- `OTHERS`: Captura de errores generales

#### Excepciones Definidas por el Usuario:
```sql
ex_sin_datos EXCEPTION;
PRAGMA EXCEPTION_INIT(ex_sin_datos, -20010);
```

## Base de Datos NoSQL (MongoDB)

### Justificación del Modelo No Relacional

Se implementó MongoDB para:
- **Flexibilidad**: Permite agregar campos sin modificar esquema
- **Escalabilidad**: Mejor rendimiento con grandes volúmenes
- **Denormalización**: Reduce JOINs complejos
- **Documentos anidados**: Estructura más natural para algunos datos

### Colecciones Implementadas

- `departamentos`
- `empleados`
- `productos`
- `clientes`
- `detalle_orden`
- `proveedores`
- `inventario`
- `pagos`

### Operaciones CRUD en MongoDB

```javascript
// CREATE
db.productos.insertOne({...})

// READ
db.productos.find({prod_id: 101})

// UPDATE
db.productos.updateOne({prod_id: 101}, {$set: {precio: 750}})

// DELETE
db.productos.deleteOne({prod_id: 101})
```

## Orden de Ejecución

### Para Oracle Database:

1. Ejecutar `CrearUsuario.sql` (crear usuario)
2. Ejecutar `1. script creacion tablas y llenado.txt` (crear tablas y datos)
3. Ejecutar `4. funciones externas.txt` (crear funciones)
4. Ejecutar `2. package.txt` (crear package spec)
5. Ejecutar `3. package body.txt` (crear package body)
6. Ejecutar `6. tipos_compuestos_y_trigger.txt` (crear tipos, trigger y package de clientes)
7. Ejecutar `5 exec.txt` (probar packages de ventas)
8. Ejecutar `7. exec_tipos_y_trigger.txt` (probar tipos compuestos y trigger)

### Para MongoDB:

1. Crear base de datos: `use sgv_db`
2. Ejecutar los comandos de `creación de tablas e insercion.txt`

## Contexto de Negocio

**Sistema de Gestión de Ventas** para una empresa de tecnología que:
- Gestiona empleados organizados por departamentos
- Mantiene catálogo de productos
- Registra clientes y sus órdenes
- Controla inventario y proveedores
- Procesa pagos con diferentes métodos
- Genera reportes de ventas por vendedor
- Monitorea stock y genera alertas

## Información Relevante Generada

1. **Reportes de Ventas por Vendedor**
   - Total vendido por cada vendedor
   - Productos más vendidos
   - Aplicación automática de descuentos

2. **Control de Inventario**
   - Actualización automática de stock
   - Alertas de stock bajo
   - Validación de disponibilidad

3. **Análisis de Clientes**
   - Historial de compras
   - Métodos de pago preferidos
   - Total gastado por cliente

## Ventajas de la Solución Integral

### Oracle (Relacional):
- ✓ Integridad referencial garantizada
- ✓ Transacciones ACID
- ✓ Validaciones complejas con triggers
- ✓ Procedimientos reutilizables

### MongoDB (No Relacional):
- ✓ Flexibilidad de esquema
- ✓ Mejor performance en consultas simples
- ✓ Escalabilidad horizontal
- ✓ Estructura de datos natural

## Reutilización en Otras Aplicaciones

Todos los objetos PL/SQL pueden ser invocados desde:
- Aplicaciones Java (JDBC)
- Aplicaciones .NET
- Scripts SQL*Plus
- Oracle APEX
- APIs REST mediante ORDS

## Autor

Proyecto desarrollado para la Evaluación Final Transversal del curso BDY1103 - Taller de Base de Datos

## Notas Técnicas

- Los tipos compuestos (VARRAY y RECORD) demuestran el uso avanzado de PL/SQL
- El trigger implementa lógica de negocio a nivel de base de datos
- Los packages encapsulan funcionalidad relacionada
- Los cursores anidados permiten procesamiento eficiente de datos relacionados
- El manejo de excepciones garantiza robustez del sistema
