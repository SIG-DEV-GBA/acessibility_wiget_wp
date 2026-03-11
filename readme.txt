=== FPVSI Accessibility Widget ===
Contributors: sigdevgba
Tags: accessibility, a11y, tts, text-to-speech, widget, wcag
Requires at least: 5.6
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.0.0
License: MIT
License URI: https://opensource.org/licenses/MIT

Widget de accesibilidad con lector de voz (TTS), ajustes visuales y selector de idiomas.

== Description ==

FPVSI Accessibility Widget añade un botón flotante (FAB) a tu sitio WordPress con las siguientes funcionalidades:

* **Tamaño de texto**: aumentar o reducir el tamaño de la fuente
* **Alto contraste**: mejora el contraste visual
* **Cursor grande**: cursor más visible
* **Espaciado de texto**: mayor espacio entre letras, palabras y líneas
* **Fuente legible**: cambia a una fuente más fácil de leer (Verdana)
* **Resaltar enlaces**: destaca todos los enlaces de la página
* **Lector de voz (TTS)**: lee en voz alta cualquier texto al hacer click
* **Selector de idiomas**: integración con GTranslate para cambio de idioma

= Características =

* Sin dependencias: vanilla JS puro, sin React ni jQuery
* CSS puro con BEM y CSS custom properties
* Totalmente configurable desde Ajustes > Accesibilidad Widget
* Colores, posición, features y idiomas personalizables
* Preferencias del usuario guardadas en localStorage
* Responsive y compatible con cualquier tema WordPress
* Ligero: ~20KB JS + ~10KB CSS (sin minificar)

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

Sí. Desde Ajustes > Accesibilidad Widget puedes cambiar el color primario y el color de acento.

= ¿Las preferencias del usuario se guardan? =

Sí. Se guardan en `localStorage` del navegador del usuario y persisten entre sesiones.

== Screenshots ==

1. Widget cerrado (FAB)
2. Widget abierto con todas las opciones
3. Página de ajustes en wp-admin

== Changelog ==

= 1.0.0 =
* Versión inicial
* Tamaño de texto, alto contraste, cursor grande, espaciado, fuente legible, resaltar enlaces
* Lector de voz (TTS) con velocidad configurable
* Selector de idiomas con banderas SVG
* Página de ajustes en wp-admin
* Persistencia en localStorage

== Upgrade Notice ==

= 1.0.0 =
Versión inicial del plugin.
