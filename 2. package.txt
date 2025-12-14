CREATE OR REPLACE PACKAGE pkg_ventas_vendedores AS
    -- Variables globales
    g_total_registros NUMBER := 0;
    g_fecha_inicio    DATE;
    g_fecha_fin       DATE;

    -- Funciones dentro del package
    FUNCTION fn_total_ventas_vendedor(p_vendedor_id NUMBER) RETURN NUMBER;
    FUNCTION fn_total_productos_vendedor(p_vendedor_id NUMBER) RETURN NUMBER;

    -- Procedimiento principal
    PROCEDURE prc_genera_reporte_ventas(p_fecha_inicio DATE, p_fecha_fin DATE);
END pkg_ventas_vendedores;
/