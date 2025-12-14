EXEC pkg_ventas_vendedores.prc_genera_reporte_ventas(TO_DATE('2024-06-10','YYYY-MM-DD'), TO_DATE('2024-06-16','YYYY-MM-DD'));

SELECT fn_descuento(1200) FROM DUAL;  -- Debería retornar 1080 (10% descuento)
SELECT fn_descuento(600) FROM DUAL;   -- Debería retornar 570 (5% descuento)
SELECT fn_descuento(300) FROM DUAL;   -- Debería retornar 300 (sin descuento)

SELECT fn_valida_stock(101) FROM DUAL;  -- 'OK' o 'STOCK BAJO'
SELECT fn_valida_stock(999) FROM DUAL;  -- 'PRODUCTO NO ENCONTRADO'

SELECT pkg_ventas_vendedores.fn_total_ventas_vendedor(1) FROM DUAL;
-- Retorna el total vendido por el vendedor 1

SELECT pkg_ventas_vendedores.fn_total_productos_vendedor(1) FROM DUAL;
-- Retorna la cantidad de productos vendidos por el vendedor 1