-- Función 1: Aplica descuento según monto total
CREATE OR REPLACE FUNCTION fn_descuento(p_total NUMBER) RETURN NUMBER IS
BEGIN
    RETURN CASE
        WHEN p_total >= 1000 THEN p_total * 0.9  -- 10% descuento
        WHEN p_total BETWEEN 500 AND 999 THEN p_total * 0.95
        ELSE p_total
    END;
END fn_descuento;
/

-- Función 2: Verifica si hay stock suficiente
CREATE OR REPLACE FUNCTION fn_valida_stock(p_prod_id NUMBER) RETURN VARCHAR2 IS
    v_stock inventario.stock_actual%TYPE;
    v_min inventario.stock_minimo%TYPE;
BEGIN
    SELECT stock_actual, stock_minimo
    INTO v_stock, v_min
    FROM inventario
    WHERE prod_id = p_prod_id;

    IF v_stock < v_min THEN
        RETURN 'STOCK BAJO';
    ELSE
        RETURN 'OK';
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 'PRODUCTO NO ENCONTRADO';
END fn_valida_stock;
/