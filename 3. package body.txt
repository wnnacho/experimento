CREATE OR REPLACE PACKAGE BODY pkg_ventas_vendedores AS

    -- Función: Total en dinero vendido por un vendedor
    FUNCTION fn_total_ventas_vendedor(p_vendedor_id NUMBER) RETURN NUMBER IS
        v_total NUMBER := 0;
    BEGIN
        SELECT NVL(SUM(d.cantidad * p.precio), 0)
        INTO v_total
        FROM detalle_orden d
        JOIN ordenes o ON o.orden_id = d.orden_id
        JOIN productos p ON p.prod_id = d.prod_id
        WHERE o.orden_id IN (
            SELECT orden_id FROM ordenes
        );
        RETURN v_total;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN 0;
    END fn_total_ventas_vendedor;

    -- Función: Total de productos vendidos por un vendedor
    FUNCTION fn_total_productos_vendedor(p_vendedor_id NUMBER) RETURN NUMBER IS
        v_cantidad NUMBER := 0;
    BEGIN
        SELECT NVL(SUM(d.cantidad), 0)
        INTO v_cantidad
        FROM detalle_orden d
        JOIN ordenes o ON o.orden_id = d.orden_id
        WHERE o.orden_id IN (
            SELECT orden_id FROM ordenes
        );
        RETURN v_cantidad;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN 0;
    END fn_total_productos_vendedor;

    --------------------------------------------------------
    -- PROCEDIMIENTO PRINCIPAL
    --------------------------------------------------------
    PROCEDURE prc_genera_reporte_ventas(p_fecha_inicio DATE, p_fecha_fin DATE) IS

        -- Cursor: Vendedores
        CURSOR c_vendedores IS
            SELECT emp_id, nombre
            FROM empleados
            WHERE dept_id = 10; -- solo los de Ventas

        -- Cursor: Productos vendidos por vendedor (CORREGIDO)
        CURSOR c_productos(p_vendedor_id NUMBER) IS
            SELECT p.nombre AS producto,
                   SUM(d.cantidad) AS cantidad,
                   SUM(d.cantidad * p.precio) AS total
            FROM ordenes o
            JOIN detalle_orden d ON o.orden_id = d.orden_id
            JOIN productos p ON p.prod_id = d.prod_id
            WHERE o.fecha_orden BETWEEN p_fecha_inicio AND p_fecha_fin
            AND o.orden_id IN (SELECT orden_id FROM ordenes)
            GROUP BY p.nombre;

        -- Variables
        v_reporte_id NUMBER := 1;
        v_total NUMBER;

        -- Excepciones personalizadas
        ex_sin_datos EXCEPTION;
        PRAGMA EXCEPTION_INIT(ex_sin_datos, -20010);

    BEGIN
        g_fecha_inicio := p_fecha_inicio;
        g_fecha_fin := p_fecha_fin;
        g_total_registros := 0;

        DBMS_OUTPUT.PUT_LINE('Generando reporte de ventas entre ' || TO_CHAR(p_fecha_inicio, 'DD-MM-YYYY')
                            || ' y ' || TO_CHAR(p_fecha_fin, 'DD-MM-YYYY'));

        -- Primer ciclo FOR: recorrer vendedores
        FOR v IN c_vendedores LOOP
            -- Segundo ciclo FOR: recorrer productos vendidos
            FOR p IN c_productos(v.emp_id) LOOP

                -- Aplicar descuento usando función externa
                v_total := fn_descuento(p.total);

                -- Insertar registro en reporte
                INSERT INTO reporte_ventas_vendedores (reporte_id, vendedor_id, vendedor, producto, cantidad, total)
                VALUES (v_reporte_id, v.emp_id, v.nombre, p.producto, p.cantidad, v_total);

                v_reporte_id := v_reporte_id + 1;
                g_total_registros := g_total_registros + 1;
            END LOOP;
        END LOOP;

        IF g_total_registros = 0 THEN
            RAISE ex_sin_datos;
        END IF;

        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Reporte generado correctamente con ' || g_total_registros || ' registros.');

    EXCEPTION
        WHEN ex_sin_datos THEN
            DBMS_OUTPUT.PUT_LINE('No se encontraron datos de ventas en el rango indicado.');
        WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
            ROLLBACK;
    END prc_genera_reporte_ventas;

END pkg_ventas_vendedores;
/