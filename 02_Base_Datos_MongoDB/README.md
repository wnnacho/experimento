# Base de Datos MongoDB - Scripts NoSQL

## Descripción
Este directorio contiene los scripts para implementar la base de datos MongoDB del Sistema de Gestión de Ventas (SGV).

## Archivo

### **MongoDB_Inserts.js**
Script con todas las inserciones de datos para MongoDB usando formato JSON.

## Ejecución

### Opción 1: Desde MongoDB Shell
```bash
# Conectarse a MongoDB
mongo

# Crear y usar la base de datos
use sgv_db

# Cargar el script
load("MongoDB_Inserts.js")
```

### Opción 2: Ejecutar directamente
```bash
# Ejecutar el script directamente
mongo sgv_db MongoDB_Inserts.js
```

### Opción 3: Copiar y pegar comandos
Abrir el archivo `MongoDB_Inserts.js` y copiar los comandos directamente en MongoDB Shell.

## Colecciones Creadas

El script crea e inserta datos en las siguientes colecciones:

1. **departamentos** (5 documentos)
   - Ventas, TI, Logística, Finanzas, RRHH

2. **empleados** (8 documentos)
   - Empleados con información de departamento y jerarquía

3. **productos** (7 documentos)
   - Catálogo de productos tecnológicos con precios y stock

4. **clientes** (6 documentos)
   - Información de clientes con correos

5. **detalle_orden** (14 documentos)
   - Detalles de cada orden con productos y cantidades

6. **proveedores** (4 documentos)
   - Información de proveedores con contactos

7. **inventario** (7 documentos)
   - Control de stock por producto con niveles mínimos

8. **pagos** (8 documentos)
   - Registro de pagos con métodos y fechas

## Operaciones CRUD Básicas

### CREATE (Insertar)
```javascript
// Insertar un nuevo producto
db.productos.insertOne({
  "prod_id": 108,
  "nombre": "Tablet Android",
  "precio": 400,
  "stock": 20
});
```

### READ (Consultar)
```javascript
// Consultar todos los productos
db.productos.find()

// Consultar producto específico
db.productos.find({ "prod_id": 101 })

// Consultar con filtro
db.productos.find({ "precio": { $gte: 500 } })
```

### UPDATE (Actualizar)
```javascript
// Actualizar precio de un producto
db.productos.updateOne(
  { "prod_id": 101 },
  { $set: { "precio": 750 } }
);

// Actualizar stock
db.productos.updateOne(
  { "prod_id": 102 },
  { $inc: { "stock": -5 } }  // Decrementar stock
);
```

### DELETE (Eliminar)
```javascript
// Eliminar un producto
db.productos.deleteOne({ "prod_id": 108 });

// Eliminar múltiples documentos
db.productos.deleteMany({ "stock": 0 });
```

## Consultas Útiles

### Consultar empleados de un departamento
```javascript
db.empleados.find({ "dept_id": 10 })
```

### Productos con precio mayor a $200
```javascript
db.productos.find({ "precio": { $gt: 200 } })
```

### Inventario con stock bajo
```javascript
db.inventario.find({
  $expr: { $lt: ["$stock_actual", "$stock_minimo"] }
})
```

### Pagos con método específico
```javascript
db.pagos.find({ "metodo": "Tarjeta Crédito" })
```

### Clientes ordenados por nombre
```javascript
db.clientes.find().sort({ "nombre": 1 })
```

## Ventajas del Modelo NoSQL

### Para este caso de negocio:
- ✅ **Flexibilidad**: Agregar campos sin modificar esquema
- ✅ **Escalabilidad**: Mejor rendimiento con grandes volúmenes
- ✅ **Denormalización**: Reduce JOINs complejos
- ✅ **Documentos anidados**: Estructura natural para datos relacionados
- ✅ **Consultas rápidas**: Optimizado para lecturas

### Comparación con Relacional:
| Aspecto | Oracle (Relacional) | MongoDB (NoSQL) |
|---------|---------------------|-----------------|
| Esquema | Fijo, estructurado | Flexible, dinámico |
| Relaciones | JOINs, FK | Documentos anidados |
| Transacciones | ACID completo | ACID con limitaciones |
| Escalabilidad | Vertical | Horizontal |
| Consultas complejas | SQL potente | Agregaciones JSON |

## Verificación

Para verificar que los datos se insertaron correctamente:

```javascript
// Contar documentos en cada colección
db.departamentos.count()    // Debería retornar 5
db.empleados.count()        // Debería retornar 8
db.productos.count()        // Debería retornar 7
db.clientes.count()         // Debería retornar 6
db.detalle_orden.count()    // Debería retornar 14
db.proveedores.count()      // Debería retornar 4
db.inventario.count()       // Debería retornar 7
db.pagos.count()            // Debería retornar 8
```

## Requisitos

- MongoDB 4.0 o superior
- MongoDB Shell (mongosh) o MongoDB Compass
- Acceso a servidor MongoDB local o remoto

## Notas

- Los datos son de prueba para demostración
- Las fechas usan formato ISODate
- Los IDs son numéricos para facilitar relaciones con Oracle
- Se puede migrar fácilmente entre Oracle y MongoDB
