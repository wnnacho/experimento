db.departamentos.insertMany([
  { "dept_id": 10, "nombre": "Ventas" },
  { "dept_id": 20, "nombre": "TI" },
  { "dept_id": 30, "nombre": "Logística" },
  { "dept_id": 40, "nombre": "Finanzas" },
  { "dept_id": 50, "nombre": "Recursos Humanos" }
]);

db.empleados.insertMany([
  { "emp_id": 1, "nombre": "Ana Torres", "cargo": "Vendedor", "salario": 1200, "dept_id": 10, "jefe_id": null },
  { "emp_id": 2, "nombre": "Carlos Pérez", "cargo": "Vendedor", "salario": 1100, "dept_id": 10, "jefe_id": 1 },
  { "emp_id": 3, "nombre": "María Gómez", "cargo": "Soporte TI", "salario": 1500, "dept_id": 20, "jefe_id": null },
  { "emp_id": 4, "nombre": "Pedro Rojas", "cargo": "Despachador", "salario": 1000, "dept_id": 30, "jefe_id": null },
  { "emp_id": 5, "nombre": "Laura Silva", "cargo": "Analista", "salario": 1800, "dept_id": 40, "jefe_id": null },
  { "emp_id": 6, "nombre": "Andrés Molina", "cargo": "Contador", "salario": 1600, "dept_id": 40, "jefe_id": 5 },
  { "emp_id": 7, "nombre": "Paula Díaz", "cargo": "RRHH", "salario": 1400, "dept_id": 50, "jefe_id": null },
  { "emp_id": 8, "nombre": "Jorge Herrera", "cargo": "Vendedor", "salario": 1150, "dept_id": 10, "jefe_id": 1 }
]);

db.productos.insertMany([
  { "prod_id": 101, "nombre": "Laptop Lenovo", "precio": 700, "stock": 15 },
  { "prod_id": 102, "nombre": "Mouse Logitech", "precio": 25, "stock": 50 },
  { "prod_id": 103, "nombre": "Monitor Dell", "precio": 200, "stock": 20 },
  { "prod_id": 104, "nombre": "Teclado Mecánico", "precio": 80, "stock": 30 },
  { "prod_id": 105, "nombre": "Tablet Samsung", "precio": 350, "stock": 25 },
  { "prod_id": 106, "nombre": "Impresora HP", "precio": 150, "stock": 10 },
  { "prod_id": 107, "nombre": "Disco Duro 1TB", "precio": 90, "stock": 40 }
]);

db.clientes.insertMany([
  { "cliente_id": 201, "nombre": "Juan Martínez", "correo": "juan@gmail.com" },
  { "cliente_id": 202, "nombre": "Lucía Hernández", "correo": "lucia@gmail.com" },
  { "cliente_id": 203, "nombre": "Ricardo Soto", "correo": "ricardo@gmail.com" },
  { "cliente_id": 204, "nombre": "Sofía Reyes", "correo": "sofia@gmail.com" },
  { "cliente_id": 205, "nombre": "Matías Fernández", "correo": "matias@gmail.com" },
  { "cliente_id": 206, "nombre": "Camila Vargas", "correo": "camila@gmail.com" }
]);

db.detalle_orden.insertMany([
  { "detalle_id": 401, "orden_id": 301, "prod_id": 101, "cantidad": 1 },
  { "detalle_id": 402, "orden_id": 301, "prod_id": 102, "cantidad": 2 },
  { "detalle_id": 403, "orden_id": 302, "prod_id": 103, "cantidad": 1 },
  { "detalle_id": 404, "orden_id": 303, "prod_id": 104, "cantidad": 3 },
  { "detalle_id": 405, "orden_id": 304, "prod_id": 101, "cantidad": 2 },
  { "detalle_id": 406, "orden_id": 304, "prod_id": 102, "cantidad": 1 },
  { "detalle_id": 407, "orden_id": 305, "prod_id": 105, "cantidad": 1 },
  { "detalle_id": 408, "orden_id": 305, "prod_id": 107, "cantidad": 2 },
  { "detalle_id": 409, "orden_id": 306, "prod_id": 106, "cantidad": 1 },
  { "detalle_id": 410, "orden_id": 306, "prod_id": 102, "cantidad": 2 },
  { "detalle_id": 411, "orden_id": 307, "prod_id": 103, "cantidad": 1 },
  { "detalle_id": 412, "orden_id": 307, "prod_id": 104, "cantidad": 1 },
  { "detalle_id": 413, "orden_id": 308, "prod_id": 101, "cantidad": 1 },
  { "detalle_id": 414, "orden_id": 308, "prod_id": 105, "cantidad": 2 }
]);

db.proveedores.insertMany([
  { "proveedor_id": 501, "nombre": "TechWorld SA", "contacto": "Carlos Díaz", "telefono": "987654321" },
  { "proveedor_id": 502, "nombre": "CompuParts Ltda", "contacto": "María López", "telefono": "912345678" },
  { "proveedor_id": 503, "nombre": "ElectroStore", "contacto": "Javier Morales", "telefono": "934567890" },
  { "proveedor_id": 504, "nombre": "PCParts", "contacto": "Ana Contreras", "telefono": "923456789" }
]);

db.inventario.insertMany([
  { "inventario_id": 601, "prod_id": 101, "proveedor_id": 501, "stock_actual": 15, "stock_minimo": 5 },
  { "inventario_id": 602, "prod_id": 102, "proveedor_id": 502, "stock_actual": 50, "stock_minimo": 10 },
  { "inventario_id": 603, "prod_id": 103, "proveedor_id": 501, "stock_actual": 20, "stock_minimo": 5 },
  { "inventario_id": 604, "prod_id": 104, "proveedor_id": 502, "stock_actual": 30, "stock_minimo": 8 },
  { "inventario_id": 605, "prod_id": 105, "proveedor_id": 503, "stock_actual": 25, "stock_minimo": 5 },
  { "inventario_id": 606, "prod_id": 106, "proveedor_id": 504, "stock_actual": 10, "stock_minimo": 3 },
  { "inventario_id": 607, "prod_id": 107, "proveedor_id": 503, "stock_actual": 40, "stock_minimo": 8 }
]);

db.pagos.insertMany([
  { "pago_id": 701, "orden_id": 301, "monto": 750,  "metodo": "Tarjeta Crédito", "fecha_pago": ISODate("2024-06-10T00:00:00Z") },
  { "pago_id": 702, "orden_id": 302, "monto": 200,  "metodo": "Transferencia",    "fecha_pago": ISODate("2024-06-11T00:00:00Z") },
  { "pago_id": 703, "orden_id": 303, "monto": 240,  "metodo": "Efectivo",         "fecha_pago": ISODate("2024-06-12T00:00:00Z") },
  { "pago_id": 704, "orden_id": 304, "monto": 1425, "metodo": "Tarjeta Débito",   "fecha_pago": ISODate("2024-06-13T00:00:00Z") },
  { "pago_id": 705, "orden_id": 305, "monto": 530,  "metodo": "Tarjeta Crédito",  "fecha_pago": ISODate("2024-06-14T00:00:00Z") },
  { "pago_id": 706, "orden_id": 306, "monto": 200,  "metodo": "Efectivo",         "fecha_pago": ISODate("2024-06-14T00:00:00Z") },
  { "pago_id": 707, "orden_id": 307, "monto": 280,  "metodo": "Transferencia",    "fecha_pago": ISODate("2024-06-15T00:00:00Z") },
  { "pago_id": 708, "orden_id": 308, "monto": 1400, "metodo": "Tarjeta Débito",   "fecha_pago": ISODate("2024-06-16T00:00:00Z") }
]);

