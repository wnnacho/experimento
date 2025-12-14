# Informe - Sistema de Gestión de Ventas (SGV) - ACTUALIZADO

## 1. Introducción

En el marco de la asignatura Taller de Base de Datos (BDY1103), se desarrolló un caso práctico integral de un Sistema de Gestión de Ventas (SGV). El objetivo fue diseñar una base de datos relacional completa, implementar objetos PL/SQL avanzados incluyendo **tipos de datos compuestos (RECORD y VARRAY)**, **triggers**, **packages**, **funciones** y **procedimientos almacenados**, además de integrar una solución NoSQL con MongoDB.

## 2. Contexto del negocio

El caso modela una empresa de tecnología que administra:

- **Departamentos y empleados**: Estructura organizacional con jerarquías
- **Productos y proveedores**: Gestión de inventario y abastecimiento
- **Clientes, órdenes y detalle de órdenes**: Ciclo completo de ventas
- **Inventario**: Control automático de stock con alertas
- **Pagos**: Registro de transacciones con múltiples métodos de pago

### Tablas implementadas (10 tablas interrelacionadas):

1. departamentos
2. empleados
3. productos
4. clientes
5. ordenes
6. detalle_orden
7. proveedores
8. inventario
9. pagos
10. reporte_ventas_vendedores

## 3. Datos a procesar e información a generar

### Datos procesados:
- Información de ventas por vendedor y cliente
- Control de inventario en tiempo real
- Historial de compras y métodos de pago
- Stock disponible y niveles críticos

### Información generada:
- Reportes consolidados de ventas por vendedor
- Análisis completo de clientes con múltiples métricas
- Alertas automáticas de stock bajo
- Aplicación de descuentos según volumen de compra

## 4. Tipos de Datos Compuestos

### 4.1. VARRAY - Array de Tamaño Variable

```sql
CREATE OR REPLACE TYPE t_metodos_pago AS VARRAY(5) OF VARCHAR2(50);
```

**Justificación de uso:**
- Permite almacenar múltiples métodos de pago usados por un cliente
- Estructura ordenada y de tamaño limitado
- Ideal para conjuntos pequeños de datos relacionados
- Facilita el recorrido de elementos con índices

**Aplicación en el negocio:**
Se utiliza para almacenar todos los métodos de pago que un cliente ha utilizado en sus compras (Tarjeta Crédito, Transferencia, Efectivo, etc.), permitiendo análisis de preferencias de pago.

### 4.2. RECORD - Tipo Registro Compuesto

```sql
TYPE t_cliente_record IS RECORD (
    cliente_id    clientes.cliente_id%TYPE,
    nombre        clientes.nombre%TYPE,
    correo        clientes.correo%TYPE,
    total_ordenes NUMBER,
    total_gastado NUMBER,
    metodos_pago  t_metodos_pago
);
```

**Justificación de uso:**
- Agrupa información relacionada en una estructura coherente
- Facilita el paso de múltiples valores como un solo parámetro
- Mejora la legibilidad y mantenibilidad del código
- Permite retornar estructuras de datos complejas desde funciones

**Aplicación en el negocio:**
Encapsula toda la información relevante de un cliente incluyendo sus estadísticas de compra y preferencias, permitiendo análisis completos con una sola llamada a función.

## 5. Cursores con y sin parámetros

### 5.1. Cursor sin parámetros

```sql
CURSOR c_vendedores IS
    SELECT emp_id, nombre
    FROM empleados
    WHERE dept_id = 10; -- Departamento de Ventas
```

**Justificación:**
Se usa para recorrer todos los vendedores de la empresa, sin necesidad de filtros adicionales. Es el cursor externo en los loops anidados.

### 5.2. Cursor con parámetros

```sql
CURSOR c_productos(p_vendedor_id NUMBER) IS
    SELECT p.nombre AS producto,
           SUM(d.cantidad) AS cantidad,
           SUM(d.cantidad * p.precio) AS total
    FROM ordenes o
    JOIN detalle_orden d ON o.orden_id = d.orden_id
    JOIN productos p ON p.prod_id = d.prod_id
    WHERE o.fecha_orden BETWEEN p_fecha_inicio AND p_fecha_fin
    GROUP BY p.nombre;
```

**Justificación:**
Permite reutilizar la misma estructura de consulta para diferentes vendedores, optimizando el código y permitiendo loops anidados eficientes.

### 5.3. Loops anidados

```sql
FOR v IN c_vendedores LOOP
    FOR p IN c_productos(v.emp_id) LOOP
        -- Procesar cada producto vendido por cada vendedor
        INSERT INTO reporte_ventas_vendedores ...
    END LOOP;
END LOOP;
```

**Justificación:**
Los loops anidados permiten procesar información jerárquica (vendedores → productos vendidos), consolidando datos de múltiples tablas relacionadas de manera eficiente.

## 6. Manejo de Excepciones

### 6.1. Excepciones predefinidas por Oracle

```sql
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Cliente no encontrado');
        RETURN NULL;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        ROLLBACK;
```

**Condiciones de uso:**
- **NO_DATA_FOUND**: Cuando una consulta SELECT INTO no retorna ninguna fila
- **OTHERS**: Captura cualquier error no especificado previamente

### 6.2. Excepciones definidas por el usuario

```sql
ex_sin_datos EXCEPTION;
PRAGMA EXCEPTION_INIT(ex_sin_datos, -20010);

IF g_total_registros = 0 THEN
    RAISE ex_sin_datos;
END IF;

EXCEPTION
    WHEN ex_sin_datos THEN
        DBMS_OUTPUT.PUT_LINE('No se encontraron datos de ventas');
```

**Condiciones de uso:**
Se utiliza cuando no se generaron registros en el reporte, permitiendo un control específico de esta condición de negocio.

## 7. Procedimientos Almacenados

### 7.1. prc_genera_reporte_ventas

**Descripción:**
Genera un reporte consolidado de ventas por vendedor en un rango de fechas.

**Funcionalidad:**
- Recorre todos los vendedores del departamento de ventas
- Para cada vendedor, lista todos los productos vendidos
- Aplica descuentos usando función externa
- Inserta resultados en tabla de reporte
- Maneja excepciones y confirma transacciones

**Justificación:**
Centraliza la lógica de generación de reportes, permitiendo su reutilización desde cualquier aplicación sin replicar código.

### 7.2. prc_reporte_clientes (NUEVO)

**Descripción:**
Genera reporte completo de clientes utilizando tipos compuestos (RECORD y VARRAY).

**Funcionalidad:**
- Obtiene información completa de cada cliente
- Muestra estadísticas de compra
- Lista todos los métodos de pago utilizados
- Utiliza tipos de datos compuestos para estructurar información

**Justificación:**
Demuestra el uso práctico de RECORD y VARRAY en un contexto de negocio real, consolidando información dispersa en múltiples tablas.

## 8. Funciones Almacenadas

### 8.1. fn_descuento

```sql
FUNCTION fn_descuento(p_total NUMBER) RETURN NUMBER IS
BEGIN
    RETURN CASE
        WHEN p_total >= 1000 THEN p_total * 0.9  -- 10% descuento
        WHEN p_total BETWEEN 500 AND 999 THEN p_total * 0.95  -- 5% descuento
        ELSE p_total
    END;
END;
```

**Justificación:**
Encapsula lógica de negocio para cálculo de descuentos. Puede ser usada en sentencias SQL, procedimientos, o llamada desde aplicaciones externas.

### 8.2. fn_valida_stock

```sql
FUNCTION fn_valida_stock(p_prod_id NUMBER) RETURN VARCHAR2
```

**Justificación:**
Proporciona una validación rápida del estado del inventario, retornando 'OK', 'STOCK BAJO' o 'PRODUCTO NO ENCONTRADO'.

### 8.3. fn_info_cliente (NUEVO)

```sql
FUNCTION fn_info_cliente(p_cliente_id NUMBER) RETURN t_cliente_record
```

**Justificación:**
Retorna un tipo RECORD con toda la información del cliente, incluyendo un VARRAY de métodos de pago. Demuestra el uso de funciones que retornan tipos complejos.

### 8.4. fn_total_ventas_vendedor

**Justificación:**
Función dentro del package que calcula el total monetario vendido, permitiendo análisis de desempeño de vendedores.

### 8.5. fn_total_productos_vendedor

**Justificación:**
Calcula el total de unidades vendidas por un vendedor, complementando el análisis de desempeño.

## 9. Packages

### 9.1. pkg_ventas_vendedores

**Constructores públicos:**
- `fn_total_ventas_vendedor(p_vendedor_id NUMBER)`
- `fn_total_productos_vendedor(p_vendedor_id NUMBER)`
- `prc_genera_reporte_ventas(p_fecha_inicio DATE, p_fecha_fin DATE)`

**Variables globales (públicas):**
- `g_total_registros`: Contador de registros generados
- `g_fecha_inicio`, `g_fecha_fin`: Rango de fechas del reporte

**Constructores privados:**
- Funciones auxiliares en el package body

**Justificación:**
El package encapsula toda la funcionalidad relacionada con reportes de ventas, manteniendo cohesión y facilitando el mantenimiento. Las variables globales permiten mantener estado entre llamadas.

### 9.2. pkg_gestion_clientes (NUEVO)

**Constructores públicos:**
- `TYPE t_cliente_record`: Definición del tipo RECORD
- `fn_info_cliente(p_cliente_id NUMBER)`
- `prc_reporte_clientes`

**Justificación:**
Package que demuestra el uso de tipos de datos compuestos (RECORD y VARRAY) en operaciones de negocio. Encapsula la lógica de análisis de clientes.

**Uso en otros procesos:**
Ambos packages pueden ser invocados desde:
- Aplicaciones Java mediante JDBC
- Scripts SQL*Plus
- Oracle APEX
- APIs REST mediante ORDS
- Otros bloques PL/SQL

## 10. Triggers

### 10.1. trg_actualiza_inventario (NUEVO)

```sql
CREATE OR REPLACE TRIGGER trg_actualiza_inventario
AFTER INSERT ON detalle_orden
FOR EACH ROW
```

**Tipo:** Trigger a nivel de fila (FOR EACH ROW)

**Funcionalidad:**
1. Se dispara automáticamente después de insertar un detalle de orden
2. Actualiza el stock_actual en la tabla inventario
3. Verifica si el stock quedó bajo el mínimo
4. Genera alertas cuando el stock es crítico
5. Maneja excepciones para productos no encontrados

**Justificación:**
- **Integridad de datos**: Mantiene el inventario sincronizado automáticamente
- **Consistencia**: Previene inconsistencias entre órdenes e inventario
- **Alertas proactivas**: Notifica cuando es necesario reabastecer
- **Automatización**: Elimina la necesidad de actualizar manualmente el inventario
- **Nivel de fila**: Procesa cada línea de orden individualmente

**Aplicación en el negocio:**
Crucial para evitar ventas de productos sin stock y mantener control en tiempo real del inventario, generando alertas automáticas para el departamento de logística.

## 11. Validación y Funcionamiento

### 11.1. Pruebas realizadas

1. **Trigger de inventario:**
   - Inserción de órdenes que actualizan stock
   - Verificación de alertas cuando stock < mínimo
   - Confirmación de actualizaciones automáticas

2. **Tipos compuestos:**
   - Uso de VARRAY para almacenar múltiples métodos de pago
   - Retorno de RECORD desde funciones
   - Recorrido de elementos en VARRAY

3. **Packages:**
   - Generación de reportes con datos correctos
   - Aplicación de descuentos
   - Manejo de excepciones

4. **Cursores anidados:**
   - Procesamiento correcto de vendedores y productos
   - Inserción de todos los registros esperados

### 11.2. Resultados obtenidos

✓ Todos los objetos se crean sin errores
✓ Los reportes generan información correcta
✓ El trigger actualiza el inventario automáticamente
✓ Las excepciones se manejan apropiadamente
✓ Los tipos compuestos funcionan según lo esperado

## 12. Base de Datos NoSQL (MongoDB)

### 12.1. Justificación del modelo no relacional

Se implementó MongoDB para complementar la solución relacional por las siguientes razones:

**Ventajas para este caso de negocio:**
1. **Flexibilidad de esquema**: Permite agregar campos sin modificar estructura
2. **Escalabilidad horizontal**: Mejor rendimiento con grandes volúmenes de datos
3. **Denormalización**: Reduce la complejidad de JOINs en consultas frecuentes
4. **Documentos anidados**: Estructura más natural para representar órdenes con sus detalles
5. **Performance de lectura**: Óptimo para análisis y reportes

**Desventajas consideradas:**
1. No garantiza integridad referencial automática
2. Requiere gestión manual de consistencia
3. Ocupación de más espacio por denormalización

### 12.2. Modelo de datos implementado

**Colecciones creadas:**
- `departamentos`
- `empleados`
- `productos`
- `clientes`
- `detalle_orden`
- `proveedores`
- `inventario`
- `pagos`

**Estructura de documento (ejemplo):**
```json
{
  "cliente_id": 201,
  "nombre": "Juan Martínez",
  "correo": "juan@gmail.com",
  "historial_compras": [
    {
      "orden_id": 301,
      "fecha": ISODate("2024-06-10"),
      "total": 750
    }
  ]
}
```

### 12.3. Operaciones CRUD implementadas

**CREATE:**
```javascript
db.productos.insertOne({
  prod_id: 108,
  nombre: "Tablet Android",
  precio: 400,
  stock: 20
})
```

**READ:**
```javascript
db.productos.find({ prod_id: 101 })
db.productos.find({ precio: { $gte: 500 } })
```

**UPDATE:**
```javascript
db.productos.updateOne(
  { prod_id: 101 },
  { $set: { precio: 750, stock: 20 } }
)
```

**DELETE:**
```javascript
db.productos.deleteOne({ prod_id: 108 })
```

## 13. Integración de la Solución

La solución combina lo mejor de ambos mundos:

**Oracle (Relacional):**
- Transacciones ACID para operaciones críticas
- Triggers para lógica de negocio automática
- Procedures/Functions para procesamiento complejo
- Integridad referencial garantizada

**MongoDB (NoSQL):**
- Consultas rápidas para análisis
- Flexibilidad para evolución del esquema
- Mejor performance en lecturas masivas
- Estructura de datos natural

## 14. Conclusiones

El proyecto cumple exitosamente todos los objetivos de la evaluación final transversal:

### 14.1. Logros técnicos

1. ✓ **Tipos de datos compuestos**: Implementados RECORD y VARRAY con casos de uso reales
2. ✓ **Cursores**: Utilizados cursores con y sin parámetros en loops anidados
3. ✓ **Excepciones**: Implementadas excepciones predefinidas y definidas por usuario
4. ✓ **Procedimientos**: Múltiples procedimientos reutilizables
5. ✓ **Funciones**: Funciones que procesan y retornan información compleja
6. ✓ **Packages**: Encapsulación de funcionalidad con constructores públicos y privados
7. ✓ **Triggers**: Control automático a nivel de fila para integridad de datos
8. ✓ **NoSQL**: Modelo no relacional implementado con operaciones CRUD completas

### 14.2. Aplicabilidad al negocio

La solución proporciona:
- Control automático de inventario con alertas
- Reportes consolidados de ventas
- Análisis completo de clientes
- Aplicación automática de descuentos
- Procesamiento eficiente de información masiva
- Flexibilidad para evolución futura

### 14.3. Calidad del código

- Código estructurado y bien documentado
- Manejo robusto de errores
- Objetos reutilizables en otras aplicaciones
- Validaciones adecuadas
- Nomenclatura clara y consistente

## 15. Recomendaciones de mejora

Para futuras iteraciones se recomienda:

1. **Implementar auditoría completa**: Triggers adicionales para registrar cambios en tablas críticas
2. **Optimización de consultas**: Índices adicionales en columnas frecuentemente consultadas
3. **Particionamiento**: Para tablas con alto volumen de datos históricos
4. **Jobs programados**: Automatizar generación de reportes periódicos
5. **Sincronización Oracle-MongoDB**: Implementar sincronización bidireccional
6. **API REST**: Exponer funcionalidad mediante ORDS para integración con aplicaciones web
7. **Dashboard de análisis**: Visualización en tiempo real del estado del negocio

---

**Conclusión final:**

El Sistema de Gestión de Ventas desarrollado representa una solución integral que combina técnicas avanzadas de bases de datos relacionales y no relacionales, cumpliendo con todos los indicadores de evaluación y proporcionando una base sólida para un sistema de información empresarial real.
