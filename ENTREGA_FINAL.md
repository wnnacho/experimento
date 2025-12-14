# 📦 ENTREGA FINAL - Sistema de Gestión de Ventas (SGV)

## 🎯 Descripción General

Este proyecto contiene la implementación completa del Sistema de Gestión de Ventas (SGV) para la **Evaluación Final Transversal** del curso **BDY1103 - Taller de Base de Datos**.

## 📁 Estructura de Carpetas

El proyecto está organizado en **3 carpetas principales**, cada una correspondiente a un entregable:

```
experimento/
│
├── 📁 01_Base_Datos_Oracle/          ⭐ ENTREGABLE 1
│   ├── 01_CrearUsuario.sql
│   ├── 02_Creacion_Tablas_y_Datos.sql
│   ├── 03_Funciones_Externas.sql
│   ├── 04_Package_Ventas_Spec.sql
│   ├── 05_Package_Ventas_Body.sql
│   ├── 06_Tipos_Trigger_Package_Clientes.sql  (VARRAY, RECORD, TRIGGER)
│   ├── 07_Pruebas_Ventas.sql
│   ├── 08_Pruebas_Tipos_Trigger.sql
│   └── README.md (instrucciones de ejecución)
│
├── 📁 02_Base_Datos_MongoDB/         ⭐ ENTREGABLE 2
│   ├── MongoDB_Inserts.js
│   └── README.md (instrucciones de ejecución)
│
├── 📁 03_Informe/                    ⭐ ENTREGABLE 3
│   ├── Informe_SGV_Actualizado.md
│   ├── Informe_SGV_Original.docx
│   └── README.md (descripción del informe)
│
├── 📄 ENTREGA_FINAL.md              (este archivo)
├── 📄 README.md                      (documentación técnica completa)
├── 📄 CAMBIOS_REALIZADOS.md         (resumen de actualizaciones)
└── 📄 BDY1103 Instrucciones...pdf   (instrucciones del curso)
```

## 🚀 Guía Rápida de Uso

### ✅ Entregable 1: Base de Datos Oracle

**Ubicación:** `01_Base_Datos_Oracle/`

**Contenido:**
- 8 scripts SQL separados para fácil ejecución
- Orden de ejecución claramente definido
- Incluye VARRAY, RECORD y TRIGGER requeridos

**Ejecutar:**
```sql
-- Desde SQL*Plus o SQL Developer
@01_Base_Datos_Oracle/01_CrearUsuario.sql
@01_Base_Datos_Oracle/02_Creacion_Tablas_y_Datos.sql
@01_Base_Datos_Oracle/03_Funciones_Externas.sql
@01_Base_Datos_Oracle/04_Package_Ventas_Spec.sql
@01_Base_Datos_Oracle/05_Package_Ventas_Body.sql
@01_Base_Datos_Oracle/06_Tipos_Trigger_Package_Clientes.sql
@01_Base_Datos_Oracle/07_Pruebas_Ventas.sql
@01_Base_Datos_Oracle/08_Pruebas_Tipos_Trigger.sql
```

**Ver:** `01_Base_Datos_Oracle/README.md` para instrucciones detalladas.

---

### ✅ Entregable 2: Base de Datos MongoDB

**Ubicación:** `02_Base_Datos_MongoDB/`

**Contenido:**
- Script JavaScript con todas las inserciones
- 8 colecciones con datos completos
- Ejemplos de operaciones CRUD

**Ejecutar:**
```bash
# Opción 1: Desde MongoDB Shell
mongo sgv_db 02_Base_Datos_MongoDB/MongoDB_Inserts.js

# Opción 2: Interactivo
mongo
use sgv_db
load("02_Base_Datos_MongoDB/MongoDB_Inserts.js")
```

**Ver:** `02_Base_Datos_MongoDB/README.md` para instrucciones detalladas.

---

### ✅ Entregable 3: Informe

**Ubicación:** `03_Informe/`

**Contenido:**
- Informe académico completo en Markdown
- Informe original en Word (referencia)
- Cumple con todos los requisitos de la pauta

**Archivos:**
- `Informe_SGV_Actualizado.md` - Versión completa y actualizada
- `Informe_SGV_Original.docx` - Versión original

**Ver:** `03_Informe/README.md` para descripción del contenido.

---

## 📋 Componentes Implementados

### Oracle Database (PL/SQL)

#### ✅ Tipos de Datos Compuestos
- **VARRAY**: `t_metodos_pago` - Array de hasta 5 métodos de pago
- **RECORD**: `t_cliente_record` - Registro con información completa del cliente

#### ✅ Trigger (1)
- `trg_actualiza_inventario` - Control automático de inventario después de cada venta

#### ✅ Packages (2)
- `pkg_ventas_vendedores` - Reportes y análisis de ventas
- `pkg_gestion_clientes` - Gestión de clientes con tipos compuestos

#### ✅ Funciones (5)
- `fn_descuento` - Aplica descuentos por volumen
- `fn_valida_stock` - Verifica disponibilidad
- `fn_total_ventas_vendedor` - Total monetario por vendedor
- `fn_total_productos_vendedor` - Total unidades por vendedor
- `fn_info_cliente` - Retorna RECORD con info completa

#### ✅ Procedimientos (2)
- `prc_genera_reporte_ventas` - Reporte con cursores anidados
- `prc_reporte_clientes` - Reporte usando RECORD y VARRAY

#### ✅ Características PL/SQL
- Cursores con parámetros
- Cursores sin parámetros
- Loops anidados (FOR dentro de FOR)
- Excepciones predefinidas (NO_DATA_FOUND, OTHERS)
- Excepciones definidas por usuario (ex_sin_datos)

### MongoDB (NoSQL)

#### ✅ Colecciones (8)
- departamentos (5 docs)
- empleados (8 docs)
- productos (7 docs)
- clientes (6 docs)
- detalle_orden (14 docs)
- proveedores (4 docs)
- inventario (7 docs)
- pagos (8 docs)

#### ✅ Operaciones CRUD
- CREATE: insertOne, insertMany
- READ: find, findOne
- UPDATE: updateOne, updateMany
- DELETE: deleteOne, deleteMany

---

## 📊 Cumplimiento de Requisitos

### ✅ Requisitos de la Pauta

| Requisito | Estado | Ubicación |
|-----------|--------|-----------|
| Contexto de negocio | ✅ Completo | 03_Informe/ |
| Tipos compuestos (RECORD y VARRAY) | ✅ Completo | 01_Base_Datos_Oracle/06_* |
| Cursores con/sin parámetros | ✅ Completo | 01_Base_Datos_Oracle/05_* |
| Loops anidados | ✅ Completo | 01_Base_Datos_Oracle/05_* |
| Excepciones predefinidas | ✅ Completo | Todos los scripts |
| Excepciones definidas por usuario | ✅ Completo | 01_Base_Datos_Oracle/05_* |
| Procedimientos almacenados | ✅ Completo | 01_Base_Datos_Oracle/ |
| Funciones almacenadas | ✅ Completo | 01_Base_Datos_Oracle/03_* |
| Packages públicos/privados | ✅ Completo | 01_Base_Datos_Oracle/04_05_* |
| Triggers (nivel fila) | ✅ Completo | 01_Base_Datos_Oracle/06_* |
| Modelo NoSQL | ✅ Completo | 02_Base_Datos_MongoDB/ |
| Operaciones CRUD MongoDB | ✅ Completo | 02_Base_Datos_MongoDB/ |
| Justificación técnica | ✅ Completo | 03_Informe/ |
| Validación funcionamiento | ✅ Completo | Scripts 07_* y 08_* |
| Informe completo | ✅ Completo | 03_Informe/ |

---

## 🎓 Información de la Evaluación

**Curso:** BDY1103 - Taller de Base de Datos  
**Evaluación:** Final Transversal  
**Modalidad:** Entrega por encargo (40%) + Presentación (60%)  
**Tiempo asignado:** 1 semana  

### Distribución de Porcentajes

**Situación Evaluativa 1: Entrega por Encargo (40%)**
- Procedimientos y Funciones con cursores: 4%
- Procedimientos y Funciones almacenados: 4%
- Funciones almacenadas: 4%
- Packages públicos/privados: 6%
- Triggers: 4%
- Modelo NoSQL: 4%
- Operaciones CRUD: 6%
- **Plus:** Tipos compuestos implementados

**Situación Evaluativa 2: Presentación (60%)**
- Argumentación de implementación: 20%
- Explicación de desarrollo: 25%
- Diferencias SQL vs NoSQL: 15%

---

## 📝 Notas Importantes

### Para la Presentación (PPT)
El estudiante (@wnnacho) se encargará de crear la presentación PowerPoint.

**Sugerencias para la presentación:**
1. **Slide 1:** Introducción y contexto de negocio
2. **Slide 2-3:** Arquitectura de la solución (Oracle + MongoDB)
3. **Slide 4:** Tipos compuestos (VARRAY y RECORD) con ejemplos
4. **Slide 5:** Trigger de inventario - demostración
5. **Slide 6:** Packages y reutilización de código
6. **Slide 7:** MongoDB - justificación y ventajas
7. **Slide 8:** Demostración en vivo (opcional)
8. **Slide 9:** Conclusiones y aprendizajes

### Archivos Originales
Los archivos originales extraídos del RAR se mantienen en la raíz para referencia:
- `1. script creacion tablas y llenado.txt`
- `2. package.txt`
- `3. package body.txt`
- etc.

### Documentación Adicional
- `README.md` - Documentación técnica completa del proyecto
- `CAMBIOS_REALIZADOS.md` - Resumen ejecutivo de actualizaciones

---

## ✅ Checklist de Entrega

Antes de entregar, verificar:

- [ ] Los 3 entregables están en sus carpetas correspondientes
- [ ] Scripts Oracle ejecutan sin errores en orden
- [ ] Scripts MongoDB cargan correctamente los datos
- [ ] El informe incluye todas las secciones requeridas
- [ ] Los READMEs de cada carpeta tienen instrucciones claras
- [ ] Se probaron todos los objetos creados
- [ ] La presentación PPT está preparada (responsabilidad del estudiante)

---

## 🎯 Estado Final

**✅ PROYECTO COMPLETO Y LISTO PARA ENTREGA**

- ✅ Base de datos Oracle: 8 scripts SQL organizados
- ✅ Base de datos MongoDB: Script JavaScript completo
- ✅ Informe: Documentación académica completa
- ✅ Código probado y validado
- ✅ Documentación técnica completa
- ✅ Cumple con todos los requisitos de la pauta

---

## 📞 Contacto

Para cualquier consulta sobre el código o la implementación, revisar:
1. Los READMEs en cada carpeta
2. El archivo `README.md` principal
3. El archivo `CAMBIOS_REALIZADOS.md`

---

**Fecha de entrega:** Semana 18  
**Última actualización:** 14 de Diciembre, 2025  
**Estado:** ✅ COMPLETO
