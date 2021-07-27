# Minesweeper

## Introducción

> Buscaminas básico, sin cronometro. Tiempo dedicado: **5 horas**.

## ¿Cómo jugar?

- Click derecho: pones la banderita para no pifiarla
- Click izquierdo: revelas si hay una mina, una pista, o nada.

## Problemas

El código está comentado, y tiene problemas, pero también están identificados y comentados (algunos). También dejé ciertas opiniones de porqué utilicé cierta lógica en particular o cuál me hubiera gustado usar.

### Principales problemas:

- No hay validación de tipos, ni ningun proceso de testing.
- HTML semántico: las etiquetas utilizadas son básicas, debería haber un `<aside>` al menos para las opciones y un `<article>` con un `titulo` correspondiente para el tablero en sí.
- Estilos: hay estilos en línea innecesarios. No hay variables globales en la implementación de los colores, y el css se repite.

## Installation

- Clonar este repositorio
- Ejecutar el comando: `npm install` dentro de la carpeta del proyecto
- Si querés abrir el código en `vscode` este es un buen momento para escribir `code .`
- Ejecutar el comando de arranque: `npm start`
