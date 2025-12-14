# Informe - Sistema de Gestión de Ventas (SGV)

## Descripción
Este directorio contiene la documentación completa del proyecto SGV desarrollado para la evaluación final transversal del curso BDY1103.

## Archivos

### 📄 **Informe_SGV_Actualizado.md**
Informe académico completo en formato Markdown que incluye:

#### Contenido:
1. **Introducción** - Contexto del proyecto y objetivos
2. **Contexto del negocio** - Descripción de la empresa y procesos
3. **Datos a procesar e información a generar** - Análisis de requerimientos
4. **Tipos de Datos Compuestos** - VARRAY y RECORD
   - Definiciones
   - Justificación de uso
   - Aplicaciones en el negocio
5. **Cursores con y sin parámetros** - Implementación y loops anidados
6. **Manejo de Excepciones** - Predefinidas y definidas por usuario
7. **Procedimientos Almacenados** - Descripción y justificación
8. **Funciones Almacenadas** - Implementación y reutilización
9. **Packages** - Constructores públicos y privados
10. **Triggers** - Control automático de inventario
11. **Validación y Funcionamiento** - Pruebas realizadas
12. **Base de Datos NoSQL (MongoDB)** - Justificación y diseño
13. **Integración de la Solución** - Oracle + MongoDB
14. **Conclusiones** - Logros y aplicabilidad
15. **Recomendaciones de mejora** - Futuras implementaciones

#### Cumple con todos los requisitos de la pauta:
- ✅ Descripción del contexto de negocio
- ✅ Identificación de datos e información relevante
- ✅ Demostración de tipos compuestos (RECORD y VARRAY)
- ✅ Justificación de cursores con/sin parámetros
- ✅ Uso de excepciones predefinidas y personalizadas
- ✅ Evaluación de Procedimientos, Funciones, Packages y Triggers
- ✅ Descripción y justificación de implementaciones
- ✅ Validación de funcionamiento correcto
- ✅ Diseño de modelo NoSQL
- ✅ Justificación de MongoDB
- ✅ Implementación de operaciones CRUD
- ✅ Conclusiones y recomendaciones

### 📄 **Informe_SGV_Original.docx**
Informe original en formato Word (para referencia).

## Formato del Informe

### Informe Actualizado (Markdown)
- **Ventajas:**
  - Fácil de versionar en Git
  - Se puede convertir a PDF, HTML, Word
  - Formato de código con resaltado de sintaxis
  - Fácil de leer en GitHub
  - Se puede editar con cualquier editor de texto

- **Conversión a otros formatos:**
  ```bash
  # Convertir a PDF (requiere pandoc)
  pandoc Informe_SGV_Actualizado.md -o Informe_SGV.pdf
  
  # Convertir a Word
  pandoc Informe_SGV_Actualizado.md -o Informe_SGV.docx
  
  # Convertir a HTML
  pandoc Informe_SGV_Actualizado.md -o Informe_SGV.html
  ```

## Estructura del Informe

### Secciones Principales:

#### 1. **Introducción y Contexto** (Secciones 1-3)
Define el alcance del proyecto y el modelo de negocio.

#### 2. **Implementación Técnica** (Secciones 4-10)
Detalla todos los objetos PL/SQL implementados:
- Tipos compuestos con ejemplos de código
- Justificación técnica de cada decisión
- Casos de uso en el negocio

#### 3. **Base de Datos NoSQL** (Secciones 12)
Explica el modelo MongoDB y su integración.

#### 4. **Análisis y Conclusiones** (Secciones 13-15)
Evalúa la solución completa y propone mejoras.

## Uso Académico

Este informe está diseñado para:
- Presentación en evaluación final transversal
- Defensa técnica ante docente
- Documentación del proyecto completo
- Referencia para implementación

## Criterios de Evaluación Cubiertos

### Situación Evaluativa 1: Entrega por Encargo (40%)
- ✅ IE1.1.1: Procedimientos y Funciones con cursores (4%)
- ✅ IE1.2.1: Procedimientos y Funciones almacenados (4%)
- ✅ IE2.1.1: Funciones almacenadas (4%)
- ✅ IE2.2.1: Packages con constructores públicos/privados (6%)
- ✅ IE2.3.1: Triggers a nivel de sentencia y fila (4%)
- ✅ IE3.2.1: Modelo de datos no relacional (4%)
- ✅ IE3.3.1: Operaciones CRUD en NoSQL (6%)
- **Plus:** Tipos compuestos (VARRAY y RECORD) implementados

### Situación Evaluativa 2: Presentación (60%)
El informe proporciona toda la información necesaria para:
- ✅ IE1.4.1: Argumentar implementación de objetos PL/SQL (20%)
- ✅ IE2.4.1: Explicar desarrollo e implementación (25%)
- ✅ IE3.1.1: Reconocer diferencias SQL vs NoSQL (15%)

## Recomendaciones para Presentación

### Antes de presentar:
1. Leer completamente el informe actualizado
2. Ejecutar los scripts de Oracle en orden
3. Ejecutar los scripts de MongoDB
4. Verificar que todos los objetos funcionan
5. Preparar ejemplos de ejecución
6. Revisar justificaciones técnicas

### Durante la presentación:
1. Explicar contexto de negocio
2. Demostrar objetos clave (trigger, types, packages)
3. Mostrar resultados de pruebas
4. Justificar decisiones técnicas
5. Responder preguntas con ejemplos del código

### Puntos clave a destacar:
- Integración Oracle + MongoDB
- Uso práctico de tipos compuestos
- Automatización con triggers
- Reutilización de código con packages
- Operaciones CRUD completas en MongoDB

## Archivos Relacionados

Para consultar código específico:
- **Scripts Oracle**: Ver carpeta `01_Base_Datos_Oracle/`
- **Scripts MongoDB**: Ver carpeta `02_Base_Datos_MongoDB/`
- **Documentación técnica**: Ver `README.md` en la raíz del proyecto

## Notas Finales

El informe cumple con todos los requisitos especificados en:
- BDY1103 Instrucciones y Pauta EFT_EE_EP_Pres_Estudiante (1).pdf
- Rúbrica de evaluación
- Indicadores de evaluación IE1.x, IE2.x, IE3.x

**Estado:** ✅ Completo y listo para entrega/presentación
