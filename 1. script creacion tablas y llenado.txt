-- Tabla de departamentos
CREATE TABLE departamentos (
    dept_id NUMBER PRIMARY KEY,
    nombre  VARCHAR2(100) NOT NULL
);

-- Tabla de empleados (con referencia corregida para jefe_id)
CREATE TABLE empleados (
    emp_id    NUMBER PRIMARY KEY,
    nombre    VARCHAR2(100) NOT NULL,
    cargo     VARCHAR2(50),
    salario   NUMBER(10,2),
    dept_id   NUMBER REFERENCES departamentos(dept_id),
    jefe_id   NUMBER REFERENCES empleados(emp_id)
);

-- Tabla de productos
CREATE TABLE productos (
    prod_id   NUMBER PRIMARY KEY,
    nombre    VARCHAR2(100) NOT NULL,
    precio    NUMBER(10,2) NOT NULL,
    stock     NUMBER DEFAULT 0
);

-- Tabla de clientes
CREATE TABLE clientes (
    cliente_id NUMBER PRIMARY KEY,
    nombre     VARCHAR2(100) NOT NULL,
    correo     VARCHAR2(100)
);

-- Tabla de órdenes (cabecera)
CREATE TABLE ordenes (
    orden_id    NUMBER PRIMARY KEY,
    cliente_id  NUMBER REFERENCES clientes(cliente_id),
    fecha_orden DATE DEFAULT SYSDATE
);

-- Tabla de detalle de orden
CREATE TABLE detalle_orden (
    detalle_id NUMBER PRIMARY KEY,
    orden_id   NUMBER REFERENCES ordenes(orden_id),
    prod_id    NUMBER REFERENCES productos(prod_id),
    cantidad   NUMBER NOT NULL
);

-- Tabla vacía (para llenar con cursores anidados)
CREATE TABLE reporte_ventas (
    reporte_id  NUMBER PRIMARY KEY,
    cliente_id  NUMBER,
    cliente     VARCHAR2(100),
    producto    VARCHAR2(100),
    cantidad    NUMBER,
    total       NUMBER(10,2)
);

CREATE TABLE proveedores (
    proveedor_id NUMBER PRIMARY KEY,
    nombre       VARCHAR2(100) NOT NULL,
    contacto     VARCHAR2(100),
    telefono     VARCHAR2(20)
);

CREATE TABLE inventario (
    inventario_id NUMBER PRIMARY KEY,
    prod_id       NUMBER REFERENCES productos(prod_id),
    proveedor_id  NUMBER REFERENCES proveedores(proveedor_id),
    stock_actual  NUMBER DEFAULT 0,
    stock_minimo  NUMBER DEFAULT 5
);

CREATE TABLE pagos (
    pago_id    NUMBER PRIMARY KEY,
    orden_id   NUMBER REFERENCES ordenes(orden_id),
    monto      NUMBER(10,2) NOT NULL,
    metodo     VARCHAR2(50), -- Tarjeta, Transferencia, Efectivo
    fecha_pago DATE DEFAULT SYSDATE
);

CREATE TABLE reporte_ventas_vendedores (
    reporte_id    NUMBER PRIMARY KEY,
    vendedor_id   NUMBER,
    vendedor      VARCHAR2(100),
    producto      VARCHAR2(100),
    cantidad      NUMBER,
    total         NUMBER(10,2),
    fecha_reporte DATE DEFAULT SYSDATE
);

-- Departamentos
INSERT INTO departamentos VALUES (10, 'Ventas');
INSERT INTO departamentos VALUES (20, 'TI');
INSERT INTO departamentos VALUES (30, 'Logística');
INSERT INTO departamentos VALUES (40, 'Finanzas');
INSERT INTO departamentos VALUES (50, 'Recursos Humanos');

-- Empleados
INSERT INTO empleados VALUES (1, 'Ana Torres', 'Vendedor', 1200, 10, NULL);
INSERT INTO empleados VALUES (2, 'Carlos Pérez', 'Vendedor', 1100, 10, 1);
INSERT INTO empleados VALUES (3, 'María Gómez', 'Soporte TI', 1500, 20, NULL);
INSERT INTO empleados VALUES (4, 'Pedro Rojas', 'Despachador', 1000, 30, NULL);
INSERT INTO empleados VALUES (5, 'Laura Silva', 'Analista', 1800, 40, NULL);
INSERT INTO empleados VALUES (6, 'Andrés Molina', 'Contador', 1600, 40, 5);
INSERT INTO empleados VALUES (7, 'Paula Díaz', 'RRHH', 1400, 50, NULL);
INSERT INTO empleados VALUES (8, 'Jorge Herrera', 'Vendedor', 1150, 10, 1);

-- Productos
INSERT INTO productos VALUES (101, 'Laptop Lenovo', 700, 15);
INSERT INTO productos VALUES (102, 'Mouse Logitech', 25, 50);
INSERT INTO productos VALUES (103, 'Monitor Dell', 200, 20);
INSERT INTO productos VALUES (104, 'Teclado Mecánico', 80, 30);
INSERT INTO productos VALUES (105, 'Tablet Samsung', 350, 25);
INSERT INTO productos VALUES (106, 'Impresora HP', 150, 10);
INSERT INTO productos VALUES (107, 'Disco Duro 1TB', 90, 40);

-- Clientes
INSERT INTO clientes VALUES (201, 'Juan Martínez', 'juan@gmail.com');
INSERT INTO clientes VALUES (202, 'Lucía Hernández', 'lucia@gmail.com');
INSERT INTO clientes VALUES (203, 'Ricardo Soto', 'ricardo@gmail.com');
INSERT INTO clientes VALUES (204, 'Sofía Reyes', 'sofia@gmail.com');
INSERT INTO clientes VALUES (205, 'Matías Fernández', 'matias@gmail.com');
INSERT INTO clientes VALUES (206, 'Camila Vargas', 'camila@gmail.com');

-- Órdenes
INSERT INTO ordenes VALUES (301, 201, TO_DATE('2024-06-10','YYYY-MM-DD'));
INSERT INTO ordenes VALUES (302, 202, TO_DATE('2024-06-11','YYYY-MM-DD'));
INSERT INTO ordenes VALUES (303, 201, TO_DATE('2024-06-12','YYYY-MM-DD'));
INSERT INTO ordenes VALUES (304, 203, TO_DATE('2024-06-13','YYYY-MM-DD'));
INSERT INTO ordenes VALUES (305, 204, TO_DATE('2024-06-14','YYYY-MM-DD'));
INSERT INTO ordenes VALUES (306, 205, TO_DATE('2024-06-14','YYYY-MM-DD'));
INSERT INTO ordenes VALUES (307, 206, TO_DATE('2024-06-15','YYYY-MM-DD'));
INSERT INTO ordenes VALUES (308, 202, TO_DATE('2024-06-16','YYYY-MM-DD'));

-- Detalle de órdenes
INSERT INTO detalle_orden VALUES (401, 301, 101, 1); -- Laptop
INSERT INTO detalle_orden VALUES (402, 301, 102, 2); -- Mouse
INSERT INTO detalle_orden VALUES (403, 302, 103, 1); -- Monitor
INSERT INTO detalle_orden VALUES (404, 303, 104, 3); -- Teclado
INSERT INTO detalle_orden VALUES (405, 304, 101, 2); -- Laptop
INSERT INTO detalle_orden VALUES (406, 304, 102, 1); -- Mouse
INSERT INTO detalle_orden VALUES (407, 305, 105, 1); -- Tablet
INSERT INTO detalle_orden VALUES (408, 305, 107, 2); -- Disco Duro
INSERT INTO detalle_orden VALUES (409, 306, 106, 1); -- Impresora
INSERT INTO detalle_orden VALUES (410, 306, 102, 2); -- Mouse
INSERT INTO detalle_orden VALUES (411, 307, 103, 1); -- Monitor
INSERT INTO detalle_orden VALUES (412, 307, 104, 1); -- Teclado
INSERT INTO detalle_orden VALUES (413, 308, 101, 1); -- Laptop
INSERT INTO detalle_orden VALUES (414, 308, 105, 2); -- Tablet

-- Proveedores
INSERT INTO proveedores VALUES (501, 'TechWorld SA', 'Carlos Díaz', '987654321');
INSERT INTO proveedores VALUES (502, 'CompuParts Ltda', 'María López', '912345678');
INSERT INTO proveedores VALUES (503, 'ElectroStore', 'Javier Morales', '934567890');
INSERT INTO proveedores VALUES (504, 'PCParts', 'Ana Contreras', '923456789');

-- Inventario
INSERT INTO inventario VALUES (601, 101, 501, 15, 5);  -- Laptop Lenovo
INSERT INTO inventario VALUES (602, 102, 502, 50, 10); -- Mouse Logitech
INSERT INTO inventario VALUES (603, 103, 501, 20, 5);  -- Monitor Dell
INSERT INTO inventario VALUES (604, 104, 502, 30, 8);  -- Teclado Mecánico
INSERT INTO inventario VALUES (605, 105, 503, 25, 5);  -- Tablet
INSERT INTO inventario VALUES (606, 106, 504, 10, 3);  -- Impresora
INSERT INTO inventario VALUES (607, 107, 503, 40, 8);  -- Disco Duro

-- Pagos
INSERT INTO pagos VALUES (701, 301, 750, 'Tarjeta Crédito', TO_DATE('2024-06-10','YYYY-MM-DD'));
INSERT INTO pagos VALUES (702, 302, 200, 'Transferencia', TO_DATE('2024-06-11','YYYY-MM-DD'));
INSERT INTO pagos VALUES (703, 303, 240, 'Efectivo', TO_DATE('2024-06-12','YYYY-MM-DD'));
INSERT INTO pagos VALUES (704, 304, 1425, 'Tarjeta Débito', TO_DATE('2024-06-13','YYYY-MM-DD'));
INSERT INTO pagos VALUES (705, 305, 530, 'Tarjeta Crédito', TO_DATE('2024-06-14','YYYY-MM-DD'));
INSERT INTO pagos VALUES (706, 306, 200, 'Efectivo', TO_DATE('2024-06-14','YYYY-MM-DD'));
INSERT INTO pagos VALUES (707, 307, 280, 'Transferencia', TO_DATE('2024-06-15','YYYY-MM-DD'));
INSERT INTO pagos VALUES (708, 308, 1400, 'Tarjeta Débito', TO_DATE('2024-06-16','YYYY-MM-DD'));

COMMIT;