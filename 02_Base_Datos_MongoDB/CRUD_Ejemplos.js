// ========================================
// EJEMPLOS DE OPERACIONES CRUD EN MONGODB
// Sistema de Gestión de Ventas (SGV)
// ========================================

// Conectar a la base de datos
use sgv_db

// ========================================
// CREATE - Insertar documentos
// ========================================

print("\n=== CREATE (Insertar) ===\n");

// Insertar un solo producto
db.productos.insertOne({
  "prod_id": 108,
  "nombre": "Tablet Android",
  "precio": 400,
  "stock": 20
});
print("✓ Producto insertado: Tablet Android");

// Insertar múltiples clientes
db.clientes.insertMany([
  { "cliente_id": 207, "nombre": "Pedro González", "correo": "pedro@gmail.com" },
  { "cliente_id": 208, "nombre": "Ana Martín", "correo": "ana@gmail.com" }
]);
print("✓ Múltiples clientes insertados");

// ========================================
// READ - Consultar documentos
// ========================================

print("\n=== READ (Consultar) ===\n");

// Consultar todos los productos
print("Todos los productos:");
db.productos.find().pretty();

// Consultar un producto específico por ID
print("\nProducto con ID 101:");
db.productos.findOne({ "prod_id": 101 });

// Consultar productos con precio mayor a $200
print("\nProductos caros (precio > $200):");
db.productos.find({ "precio": { $gt: 200 } }).pretty();

// Consultar empleados del departamento de Ventas
print("\nEmpleados de Ventas (dept_id: 10):");
db.empleados.find({ "dept_id": 10 }).pretty();

// Consultar inventario con stock bajo (stock_actual < stock_minimo)
print("\nInventario con stock bajo:");
db.inventario.find({
  $expr: { $lt: ["$stock_actual", "$stock_minimo"] }
}).pretty();

// Consultar pagos con método Tarjeta Crédito
print("\nPagos con Tarjeta Crédito:");
db.pagos.find({ "metodo": "Tarjeta Crédito" }).pretty();

// Consultar productos ordenados por precio descendente
print("\nProductos ordenados por precio (mayor a menor):");
db.productos.find().sort({ "precio": -1 }).pretty();

// Limitar resultados a 3 productos más caros
print("\nTop 3 productos más caros:");
db.productos.find().sort({ "precio": -1 }).limit(3).pretty();

// Proyección: mostrar solo nombre y precio
print("\nProductos (solo nombre y precio):");
db.productos.find({}, { "nombre": 1, "precio": 1, "_id": 0 }).pretty();

// ========================================
// UPDATE - Actualizar documentos
// ========================================

print("\n=== UPDATE (Actualizar) ===\n");

// Actualizar el precio de un producto
db.productos.updateOne(
  { "prod_id": 101 },
  { $set: { "precio": 750 } }
);
print("✓ Precio del producto 101 actualizado a $750");

// Incrementar el stock de un producto
db.productos.updateOne(
  { "prod_id": 102 },
  { $inc: { "stock": 10 } }
);
print("✓ Stock del producto 102 incrementado en 10 unidades");

// Decrementar el stock (simulando una venta)
db.productos.updateOne(
  { "prod_id": 103 },
  { $inc: { "stock": -5 } }
);
print("✓ Stock del producto 103 decrementado en 5 unidades");

// Actualizar salario de un empleado
db.empleados.updateOne(
  { "emp_id": 1 },
  { $set: { "salario": 1300 } }
);
print("✓ Salario del empleado 1 actualizado");

// Actualizar múltiples documentos
db.productos.updateMany(
  { "precio": { $lt: 100 } },
  { $mul: { "precio": 1.1 } }  // Aumentar 10%
);
print("✓ Precios de productos baratos aumentados 10%");

// Agregar un campo nuevo a un documento
db.clientes.updateOne(
  { "cliente_id": 201 },
  { $set: { "telefono": "912345678", "vip": true } }
);
print("✓ Campos adicionales agregados al cliente 201");

// ========================================
// DELETE - Eliminar documentos
// ========================================

print("\n=== DELETE (Eliminar) ===\n");

// Eliminar un producto específico
db.productos.deleteOne({ "prod_id": 108 });
print("✓ Producto 108 eliminado");

// Eliminar múltiples documentos con condición
db.clientes.deleteMany({ "cliente_id": { $gt: 206 } });
print("✓ Clientes con ID > 206 eliminados");

// CUIDADO: Eliminar todos los documentos de una colección
// db.test.deleteMany({});  // Descomentar solo si es necesario

// ========================================
// CONSULTAS AVANZADAS
// ========================================

print("\n=== CONSULTAS AVANZADAS ===\n");

// Agregación: Total de ventas por producto
print("Total de ventas por producto:");
db.detalle_orden.aggregate([
  {
    $group: {
      _id: "$prod_id",
      total_vendido: { $sum: "$cantidad" }
    }
  },
  { $sort: { total_vendido: -1 } }
]).pretty();

// Agregación: Gasto total por cliente
print("\nGasto total por cliente:");
db.pagos.aggregate([
  {
    $group: {
      _id: "$orden_id",
      total: { $sum: "$monto" }
    }
  }
]).pretty();

// Consulta con lookup (similar a JOIN)
print("\nEmpleados con nombre de departamento:");
db.empleados.aggregate([
  {
    $lookup: {
      from: "departamentos",
      localField: "dept_id",
      foreignField: "dept_id",
      as: "departamento_info"
    }
  },
  { $limit: 3 }
]).pretty();

// Búsqueda con expresión regular
print("\nClientes cuyo nombre contiene 'Martínez':");
db.clientes.find({ "nombre": /Martínez/i }).pretty();

// Consulta con operador IN
print("\nProductos con IDs específicos:");
db.productos.find({ "prod_id": { $in: [101, 102, 103] } }).pretty();

// Consulta con operador AND
print("\nProductos caros y con stock:");
db.productos.find({
  $and: [
    { "precio": { $gt: 200 } },
    { "stock": { $gt: 10 } }
  ]
}).pretty();

// Contar documentos
print("\nTotal de productos:");
print(db.productos.count());

print("\nTotal de clientes:");
print(db.clientes.count());

// ========================================
// ÍNDICES (Mejora de Performance)
// ========================================

print("\n=== ÍNDICES ===\n");

// Crear índice en campo prod_id de productos
db.productos.createIndex({ "prod_id": 1 });
print("✓ Índice creado en productos.prod_id");

// Crear índice en campo cliente_id
db.clientes.createIndex({ "cliente_id": 1 });
print("✓ Índice creado en clientes.cliente_id");

// Crear índice compuesto
db.pagos.createIndex({ "orden_id": 1, "metodo": 1 });
print("✓ Índice compuesto creado en pagos");

// Ver índices de una colección
print("\nÍndices de la colección productos:");
db.productos.getIndexes();

// ========================================
// VALIDACIÓN DE DATOS
// ========================================

print("\n=== VERIFICACIÓN FINAL ===\n");

// Contar documentos en todas las colecciones
print("Conteo de documentos:");
print("  Departamentos: " + db.departamentos.count());
print("  Empleados: " + db.empleados.count());
print("  Productos: " + db.productos.count());
print("  Clientes: " + db.clientes.count());
print("  Detalle orden: " + db.detalle_orden.count());
print("  Proveedores: " + db.proveedores.count());
print("  Inventario: " + db.inventario.count());
print("  Pagos: " + db.pagos.count());

print("\n✓ ¡Operaciones CRUD completadas exitosamente!");
print("\n========================================");
print("Para más información sobre MongoDB:");
print("https://docs.mongodb.com/manual/crud/");
print("========================================\n");
