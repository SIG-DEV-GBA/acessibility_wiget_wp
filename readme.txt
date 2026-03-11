=== FPVSI Accessibility Widget ===
Contributors: sigdevgba
Tags: accessibility, a11y, tts, text-to-speech, widget, wcag
Requires at least: 5.6
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.4.0
License: MIT
License URI: https://opensource.org/licenses/MIT

Widget de accesibilidad con lector de voz (TTS), ajustes visuales, selector de idiomas y UX mobile nativa.

== Description ==

FPVSI Accessibility Widget añade un widget de accesibilidad configurable a tu sitio WordPress.

= Funcionalidades =

* **Tamaño de texto**: aumentar o reducir el tamaño de la fuente
* **Alto contraste**: mejora el contraste visual
* **Cursor grande**: cursor más visible
* **Espaciado de texto**: mayor espacio entre letras, palabras y líneas
* **Fuente legible**: cambia a una fuente más fácil de leer (Verdana)
* **Resaltar enlaces**: destaca todos los enlaces de la página
* **Lector de voz (TTS)**: lee en voz alta cualquier texto al hacer click
* **Selector de idiomas**: integración con GTranslate para cambio de idioma

= Mobile UX =

En pantallas móviles (<768px) el widget cambia automáticamente:

* **Trigger**: mini-tab lateral (36x36px) pegada al borde de la pantalla
* **Panel**: bottom sheet full-width que sube desde abajo
* **Backdrop**: fondo oscuro semitransparente con cierre al tap
* **Handle**: barra indicadora gris en la parte superior del sheet
* **Tab dirty**: cuando hay opciones activas, la tab se pone en color primario

En desktop (>=768px) se mantiene el FAB circular + panel flotante habitual.

= Características =

* Sin dependencias: vanilla JS puro, sin React ni jQuery
* CSS puro con BEM y CSS custom properties
* Totalmente configurable desde Ajustes > Accesibilidad Widget
* 4 posiciones: abajo izquierda/derecha, arriba izquierda/derecha
* Offset X/Y configurable para ajustar la posición exacta
* Colores personalizables: primario, acento, fondo de filas activas, texto de filas activas
* Icono del botón configurable (cualquier icono Lucide)
* Features, idiomas y etiquetas personalizables
* Preferencias del usuario guardadas en localStorage
* Responsive con detección automática mobile/desktop
* Ligero: ~20KB JS + ~12KB CSS (sin minificar)
* Auto-update desde GitHub

== Installation ==

1. Sube la carpeta `fpvsi-a11y-widget` al directorio `/wp-content/plugins/`
2. Activa el plugin desde el menú "Plugins" de WordPress
3. Configura el widget en Ajustes > Accesibilidad Widget

También puedes instalar subiendo el archivo ZIP desde Plugins > Añadir nuevo > Subir plugin.

== Frequently Asked Questions ==

= ¿Necesita alguna dependencia? =

No. El widget funciona con vanilla JavaScript puro sin dependencias externas.

= ¿Funciona con cualquier tema? =

Sí. El widget se inyecta como un elemento fijo en el DOM y funciona con cualquier tema WordPress.

= ¿El selector de idiomas necesita GTranslate? =

Sí, el selector de idiomas funciona estableciendo la cookie `googtrans` que usa GTranslate. Si no usas GTranslate, puedes desactivar esta feature desde los ajustes.

= ¿Puedo cambiar los colores? =

Sí. Desde Ajustes > Accesibilidad Widget puedes cambiar el color primario, acento, fondo de filas activas y texto de filas activas.

= ¿Puedo cambiar el icono del botón? =

Sí. Desde los ajustes puedes escribir el nombre de cualquier icono de Lucide (ej: `accessibility`, `person-standing`, `heart`).

= ¿Las preferencias del usuario se guardan? =

Sí. Se guardan en `localStorage` del navegador del usuario y persisten entre sesiones.

= ¿Cómo funciona en móvil? =

En pantallas menores a 768px, el FAB circular se reemplaza automáticamente por una mini-tab lateral discreta. Al pulsarla, el panel de opciones sube como un bottom sheet full-width, con backdrop oscuro y handle visual.

== Screenshots ==

1. Widget cerrado (FAB) en desktop
2. Widget abierto con todas las opciones
3. Mini-tab lateral en móvil
4. Bottom sheet abierto en móvil
5. Página de ajustes en wp-admin

== Changelog ==

= 1.4.0 =
* Mobile UX: mini-tab lateral + bottom sheet full-width en pantallas <768px
* Detección automática mobile/desktop con matchMedia + CSS media queries
* Backdrop oscuro con fade-in y cierre al tap
* Handle visual (barra gris) en la parte superior del sheet
* Tab dirty: fondo primario cuando hay opciones activas
* Soporte para posiciones top-left y top-right
* Panel abre hacia abajo en posiciones top
* Fix: custom colors (fondo/texto filas activas) ahora se aplican correctamente
* CSS vars --a11y-text y --a11y-active-bg con fallback al primario

= 1.3.0 =
* Offset X/Y configurable desde ajustes
* Color de fondo y texto de filas activas personalizables
* Icono del botón configurable (nombre Lucide)
* 4 posiciones: bottom-left, bottom-right, top-left, top-right
* Etiquetas personalizables desde ajustes
* Auto-update desde GitHub

= 1.0.0 =
* Versión inicial
* Tamaño de texto, alto contraste, cursor grande, espaciado, fuente legible, resaltar enlaces
* Lector de voz (TTS) con velocidad configurable
* Selector de idiomas con banderas SVG
* Página de ajustes en wp-admin
* Persistencia en localStorage

== Upgrade Notice ==

= 1.4.0 =
Mobile UX mejorado con mini-tab lateral y bottom sheet. Fix de colores personalizados.

= 1.0.0 =
Versión inicial del plugin.
