<?php
/**
 * Página de ajustes del plugin FPVSI Accessibility Widget
 * Usa Settings API de WordPress
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Registrar menú en Ajustes
 */
add_action( 'admin_menu', function () {
    add_options_page(
        'Accesibilidad Widget',
        'Accesibilidad Widget',
        'manage_options',
        'fpvsi-a11y-settings',
        'fpvsi_a11y_settings_page'
    );
});

/**
 * Registrar settings
 */
add_action( 'admin_init', function () {
    register_setting( 'fpvsi_a11y_group', 'fpvsi_a11y_config', [
        'type'              => 'array',
        'sanitize_callback' => 'fpvsi_a11y_sanitize_config',
    ]);

    // Sección: Apariencia
    add_settings_section( 'fpvsi_a11y_appearance', 'Apariencia', function () {
        echo '<p>Configura los colores, posición y estilo del widget.</p>';
    }, 'fpvsi-a11y-settings' );

    add_settings_field( 'fpvsi_primary_color', 'Color primario', 'fpvsi_a11y_field_primary_color', 'fpvsi-a11y-settings', 'fpvsi_a11y_appearance' );
    add_settings_field( 'fpvsi_accent_color', 'Color acento', 'fpvsi_a11y_field_accent_color', 'fpvsi-a11y-settings', 'fpvsi_a11y_appearance' );
    add_settings_field( 'fpvsi_hover_bg_color', 'Fondo filas activas', 'fpvsi_a11y_field_hover_bg_color', 'fpvsi-a11y-settings', 'fpvsi_a11y_appearance' );
    add_settings_field( 'fpvsi_text_color', 'Texto filas activas', 'fpvsi_a11y_field_text_color', 'fpvsi-a11y-settings', 'fpvsi_a11y_appearance' );
    add_settings_field( 'fpvsi_position', 'Posición', 'fpvsi_a11y_field_position', 'fpvsi-a11y-settings', 'fpvsi_a11y_appearance' );
    add_settings_field( 'fpvsi_offset', 'Desplazamiento (px)', 'fpvsi_a11y_field_offset', 'fpvsi-a11y-settings', 'fpvsi_a11y_appearance' );
    add_settings_field( 'fpvsi_zindex', 'z-index', 'fpvsi_a11y_field_zindex', 'fpvsi-a11y-settings', 'fpvsi_a11y_appearance' );
    add_settings_field( 'fpvsi_trigger_icon', 'Icono del botón', 'fpvsi_a11y_field_trigger_icon', 'fpvsi-a11y-settings', 'fpvsi_a11y_appearance' );

    // Sección: Funcionalidades
    add_settings_section( 'fpvsi_a11y_features', 'Funcionalidades', function () {
        echo '<p>Selecciona las funcionalidades que quieres mostrar en el widget.</p>';
    }, 'fpvsi-a11y-settings' );

    add_settings_field( 'fpvsi_features', 'Features activas', 'fpvsi_a11y_field_features', 'fpvsi-a11y-settings', 'fpvsi_a11y_features' );
    add_settings_field( 'fpvsi_tts_lang', 'Idioma TTS', 'fpvsi_a11y_field_tts_lang', 'fpvsi-a11y-settings', 'fpvsi_a11y_features' );

    // Sección: Etiquetas
    add_settings_section( 'fpvsi_a11y_labels', 'Etiquetas / Textos', function () {
        echo '<p>Personaliza los textos del widget. Deja vacío para usar el valor por defecto.</p>';
    }, 'fpvsi-a11y-settings' );

    add_settings_field( 'fpvsi_labels', 'Etiquetas', 'fpvsi_a11y_field_labels', 'fpvsi-a11y-settings', 'fpvsi_a11y_labels' );

    // Sección: Idiomas
    add_settings_section( 'fpvsi_a11y_languages', 'Selector de idiomas', function () {
        echo '<p>Configura los idiomas del selector (requiere GTranslate). Deja vacío o desactiva la feature "Selector de idiomas" para ocultar esta sección en el widget.</p>';
    }, 'fpvsi-a11y-settings' );

    add_settings_field( 'fpvsi_languages', 'Idiomas', 'fpvsi_a11y_field_languages', 'fpvsi-a11y-settings', 'fpvsi_a11y_languages' );
});

/**
 * Sanitize config
 */
function fpvsi_a11y_sanitize_config( $input ) {
    $output = [];

    if ( ! empty( $input['primary_color'] ) ) {
        $output['primary_color'] = sanitize_hex_color( $input['primary_color'] );
    }
    if ( ! empty( $input['accent_color'] ) ) {
        $output['accent_color'] = sanitize_hex_color( $input['accent_color'] );
    }
    if ( ! empty( $input['hover_bg_color'] ) ) {
        $output['hover_bg_color'] = sanitize_hex_color( $input['hover_bg_color'] );
    }
    if ( ! empty( $input['text_color'] ) ) {
        $output['text_color'] = sanitize_hex_color( $input['text_color'] );
    }
    if ( ! empty( $input['position'] ) ) {
        $valid_pos = [ 'bottom-left', 'bottom-right', 'top-left', 'top-right' ];
        $output['position'] = in_array( $input['position'], $valid_pos, true )
            ? $input['position']
            : 'bottom-left';
    }

    // Offsets
    $output['offset_x'] = isset( $input['offset_x'] ) ? absint( $input['offset_x'] ) : 20;
    $output['offset_y'] = isset( $input['offset_y'] ) ? absint( $input['offset_y'] ) : 20;

    if ( isset( $input['z_index'] ) ) {
        $output['z_index'] = absint( $input['z_index'] );
    }

    // Trigger icon
    if ( ! empty( $input['trigger_icon'] ) ) {
        $output['trigger_icon'] = sanitize_text_field( $input['trigger_icon'] );
    }

    if ( ! empty( $input['tts_lang'] ) ) {
        $output['tts_lang'] = sanitize_text_field( $input['tts_lang'] );
    }

    // Features
    $all_features = [ 'fontSize', 'contrast', 'bigCursor', 'textSpacing', 'dyslexiaFont', 'highlightLinks', 'tts', 'languages' ];
    if ( isset( $input['features'] ) && is_array( $input['features'] ) ) {
        $output['features'] = array_values( array_intersect( $input['features'], $all_features ) );
    } else {
        $output['features'] = $all_features;
    }

    // Labels
    if ( ! empty( $input['labels'] ) && is_array( $input['labels'] ) ) {
        $labels = [];
        $valid_labels = [ 'title', 'reset', 'close', 'fontSize', 'contrast', 'bigCursor', 'textSpacing', 'dyslexiaFont', 'highlightLinks', 'ttsSection', 'ttsActive', 'ttsReading', 'ttsOff', 'ttsHint', 'ttsHintOff', 'ttsStop', 'ttsSpeed', 'langSection', 'footer', 'trigger' ];
        foreach ( $valid_labels as $k ) {
            if ( ! empty( $input['labels'][ $k ] ) ) {
                $labels[ $k ] = sanitize_text_field( $input['labels'][ $k ] );
            }
        }
        $output['labels'] = $labels;
    }

    // Languages
    if ( ! empty( $input['languages'] ) && is_array( $input['languages'] ) ) {
        $langs = [];
        foreach ( $input['languages'] as $l ) {
            if ( ! empty( $l['code'] ) && ! empty( $l['label'] ) && ! empty( $l['flag'] ) ) {
                $langs[] = [
                    'code'  => sanitize_text_field( $l['code'] ),
                    'label' => sanitize_text_field( $l['label'] ),
                    'flag'  => sanitize_text_field( $l['flag'] ),
                ];
            }
        }
        if ( ! empty( $langs ) ) {
            $output['languages'] = $langs;
        }
    }

    return $output;
}

/* ══════════════════════════════════════════════
   Field renderers
   ══════════════════════════════════════════════ */

function fpvsi_a11y_get_config() {
    return get_option( 'fpvsi_a11y_config', [] );
}

function fpvsi_a11y_field_primary_color() {
    $config = fpvsi_a11y_get_config();
    $val = ! empty( $config['primary_color'] ) ? $config['primary_color'] : '#A10D5E';
    echo '<div style="display:flex;align-items:center;gap:8px;">';
    echo '<input type="color" id="fpvsi_primary_picker" value="' . esc_attr( $val ) . '" onchange="document.getElementById(\'fpvsi_primary_hex\').value=this.value" />';
    echo '<input type="text" id="fpvsi_primary_hex" name="fpvsi_a11y_config[primary_color]" value="' . esc_attr( $val ) . '" pattern="#[0-9a-fA-F]{6}" style="width:90px;font-family:monospace" onchange="document.getElementById(\'fpvsi_primary_picker\').value=this.value" />';
    echo '</div>';
    echo '<p class="description">Color principal del widget (default: #A10D5E)</p>';
}

function fpvsi_a11y_field_accent_color() {
    $config = fpvsi_a11y_get_config();
    $val = ! empty( $config['accent_color'] ) ? $config['accent_color'] : '#F29429';
    echo '<div style="display:flex;align-items:center;gap:8px;">';
    echo '<input type="color" id="fpvsi_accent_picker" value="' . esc_attr( $val ) . '" onchange="document.getElementById(\'fpvsi_accent_hex\').value=this.value" />';
    echo '<input type="text" id="fpvsi_accent_hex" name="fpvsi_a11y_config[accent_color]" value="' . esc_attr( $val ) . '" pattern="#[0-9a-fA-F]{6}" style="width:90px;font-family:monospace" onchange="document.getElementById(\'fpvsi_accent_picker\').value=this.value" />';
    echo '</div>';
    echo '<p class="description">Color de acento del widget (default: #F29429)</p>';
}

function fpvsi_a11y_field_hover_bg_color() {
    $config = fpvsi_a11y_get_config();
    $val = ! empty( $config['hover_bg_color'] ) ? $config['hover_bg_color'] : '';
    $picker_val = ! empty( $val ) ? $val : '#dbeafe';
    echo '<div style="display:flex;align-items:center;gap:8px;">';
    echo '<input type="color" id="fpvsi_hoverbg_picker" value="' . esc_attr( $picker_val ) . '" onchange="document.getElementById(\'fpvsi_hoverbg_hex\').value=this.value" />';
    echo '<input type="text" id="fpvsi_hoverbg_hex" name="fpvsi_a11y_config[hover_bg_color]" value="' . esc_attr( $val ) . '" pattern="#[0-9a-fA-F]{6}" style="width:90px;font-family:monospace" onchange="if(this.value){document.getElementById(\'fpvsi_hoverbg_picker\').value=this.value;}" placeholder="" />';
    echo '</div>';
    echo '<p class="description">Color sólido del fondo cuando una opción está activada. Vacío = tinte suave del primario.</p>';
}

function fpvsi_a11y_field_text_color() {
    $config = fpvsi_a11y_get_config();
    $val = ! empty( $config['text_color'] ) ? $config['text_color'] : '';
    $picker_val = ! empty( $val ) ? $val : '#1e3a5f';
    echo '<div style="display:flex;align-items:center;gap:8px;">';
    echo '<input type="color" id="fpvsi_text_picker" value="' . esc_attr( $picker_val ) . '" onchange="document.getElementById(\'fpvsi_text_hex\').value=this.value" />';
    echo '<input type="text" id="fpvsi_text_hex" name="fpvsi_a11y_config[text_color]" value="' . esc_attr( $val ) . '" pattern="#[0-9a-fA-F]{6}" style="width:90px;font-family:monospace" onchange="if(this.value){document.getElementById(\'fpvsi_text_picker\').value=this.value;}" placeholder="" />';
    echo '</div>';
    echo '<p class="description">Color del texto cuando una opción está activada. Vacío = color primario.</p>';
}

function fpvsi_a11y_field_position() {
    $config = fpvsi_a11y_get_config();
    $val = ! empty( $config['position'] ) ? $config['position'] : 'bottom-left';
    echo '<select name="fpvsi_a11y_config[position]">';
    echo '<option value="bottom-left"'  . selected( $val, 'bottom-left', false )  . '>Abajo izquierda</option>';
    echo '<option value="bottom-right"' . selected( $val, 'bottom-right', false ) . '>Abajo derecha</option>';
    echo '<option value="top-left"'     . selected( $val, 'top-left', false )     . '>Arriba izquierda</option>';
    echo '<option value="top-right"'    . selected( $val, 'top-right', false )    . '>Arriba derecha</option>';
    echo '</select>';
}

function fpvsi_a11y_field_offset() {
    $config = fpvsi_a11y_get_config();
    $x = isset( $config['offset_x'] ) ? $config['offset_x'] : 20;
    $y = isset( $config['offset_y'] ) ? $config['offset_y'] : 20;
    echo '<div style="display:flex;align-items:center;gap:12px;">';
    echo '<label>Horizontal: <input type="number" name="fpvsi_a11y_config[offset_x]" value="' . esc_attr( $x ) . '" min="0" max="500" style="width:70px" /> px</label>';
    echo '<label>Vertical: <input type="number" name="fpvsi_a11y_config[offset_y]" value="' . esc_attr( $y ) . '" min="0" max="500" style="width:70px" /> px</label>';
    echo '</div>';
    echo '<p class="description">Distancia desde el borde de la ventana (default: 20px)</p>';
}

function fpvsi_a11y_field_zindex() {
    $config = fpvsi_a11y_get_config();
    $val = ! empty( $config['z_index'] ) ? $config['z_index'] : 9998;
    echo '<input type="number" name="fpvsi_a11y_config[z_index]" value="' . esc_attr( $val ) . '" min="1" max="99999" style="width:90px" />';
    echo '<p class="description">z-index del widget (default: 9998)</p>';
}

function fpvsi_a11y_field_trigger_icon() {
    $config = fpvsi_a11y_get_config();
    $val = ! empty( $config['trigger_icon'] ) ? $config['trigger_icon'] : 'accessibility';
    echo '<input type="text" name="fpvsi_a11y_config[trigger_icon]" value="' . esc_attr( $val ) . '" placeholder="accessibility" style="width:200px" />';
    echo '<p class="description">Nombre exacto del icono Lucide (ej: <code>accessibility</code>, <code>person-standing</code>, <code>heart</code>). <a href="https://lucide.dev/icons" target="_blank" rel="noopener">Buscar iconos en lucide.dev</a><br>Si el nombre no existe, se usará <code>accessibility</code> por defecto.</p>';
}

function fpvsi_a11y_field_features() {
    $config = fpvsi_a11y_get_config();
    $all = [
        'fontSize'       => 'Tamaño de texto',
        'contrast'       => 'Alto contraste',
        'bigCursor'      => 'Cursor grande',
        'textSpacing'    => 'Espaciado de texto',
        'dyslexiaFont'   => 'Fuente legible',
        'highlightLinks' => 'Resaltar enlaces',
        'tts'            => 'Lector de voz (TTS)',
        'languages'      => 'Selector de idiomas',
    ];

    $active = isset( $config['features'] ) ? $config['features'] : array_keys( $all );

    foreach ( $all as $key => $label ) {
        $checked = in_array( $key, $active, true ) ? 'checked' : '';
        echo '<label style="display:block;margin-bottom:4px;">';
        echo '<input type="checkbox" name="fpvsi_a11y_config[features][]" value="' . esc_attr( $key ) . '" ' . $checked . ' /> ';
        echo esc_html( $label );
        echo '</label>';
    }
}

function fpvsi_a11y_field_tts_lang() {
    $config = fpvsi_a11y_get_config();
    $val = ! empty( $config['tts_lang'] ) ? $config['tts_lang'] : 'es-ES';
    echo '<input type="text" name="fpvsi_a11y_config[tts_lang]" value="' . esc_attr( $val ) . '" placeholder="es-ES" />';
    echo '<p class="description">Código BCP 47 del idioma para TTS (ej: es-ES, en-US, gl, ca, eu)</p>';
}

function fpvsi_a11y_field_labels() {
    $config = fpvsi_a11y_get_config();
    $labels = ! empty( $config['labels'] ) ? $config['labels'] : [];

    $fields = [
        'title'          => [ 'Título del widget',      'Accesibilidad' ],
        'fontSize'       => [ 'Etiqueta tamaño texto',  'Texto' ],
        'contrast'       => [ 'Etiqueta contraste',     'Alto contraste' ],
        'bigCursor'      => [ 'Etiqueta cursor',        'Cursor grande' ],
        'textSpacing'    => [ 'Etiqueta espaciado',     'Espaciado' ],
        'dyslexiaFont'   => [ 'Etiqueta fuente',        'Fuente legible' ],
        'highlightLinks' => [ 'Etiqueta enlaces',       'Resaltar enlaces' ],
        'ttsSection'     => [ 'Título sección TTS',     'Lector de voz' ],
        'langSection'    => [ 'Título sección idiomas',  'Idioma' ],
        'footer'         => [ 'Texto del pie',           'Preferencias guardadas en tu navegador' ],
        'trigger'        => [ 'Aria-label del botón',    'Opciones de accesibilidad' ],
    ];

    echo '<table class="form-table" style="margin:0"><tbody>';
    foreach ( $fields as $key => $info ) {
        $val = ! empty( $labels[ $key ] ) ? $labels[ $key ] : '';
        echo '<tr>';
        echo '<td style="padding:4px 8px 4px 0;width:180px"><label>' . esc_html( $info[0] ) . '</label></td>';
        echo '<td style="padding:4px 0"><input type="text" name="fpvsi_a11y_config[labels][' . esc_attr( $key ) . ']" value="' . esc_attr( $val ) . '" placeholder="' . esc_attr( $info[1] ) . '" style="width:300px" /></td>';
        echo '</tr>';
    }
    echo '</tbody></table>';
}

function fpvsi_a11y_field_languages() {
    $config = fpvsi_a11y_get_config();
    $languages = ! empty( $config['languages'] ) ? $config['languages'] : [
        [ 'code' => 'es', 'label' => 'Español',  'flag' => 'es.svg' ],
        [ 'code' => 'en', 'label' => 'English',  'flag' => 'gb.svg' ],
        [ 'code' => 'gl', 'label' => 'Galego',   'flag' => 'es-ga.svg' ],
        [ 'code' => 'ca', 'label' => 'Català',   'flag' => 'es-ct.svg' ],
        [ 'code' => 'eu', 'label' => 'Euskara',  'flag' => 'es-pv.svg' ],
    ];

    echo '<div id="fpvsi-langs-repeater">';
    echo '<table class="widefat" style="max-width:600px;"><thead><tr><th>Código</th><th>Etiqueta</th><th>Archivo bandera</th><th></th></tr></thead><tbody>';

    foreach ( $languages as $i => $l ) {
        echo '<tr class="fpvsi-lang-row">';
        echo '<td><input type="text" name="fpvsi_a11y_config[languages][' . $i . '][code]" value="' . esc_attr( $l['code'] ) . '" style="width:60px" /></td>';
        echo '<td><input type="text" name="fpvsi_a11y_config[languages][' . $i . '][label]" value="' . esc_attr( $l['label'] ) . '" style="width:120px" /></td>';
        echo '<td><input type="text" name="fpvsi_a11y_config[languages][' . $i . '][flag]" value="' . esc_attr( $l['flag'] ) . '" style="width:120px" /></td>';
        echo '<td><button type="button" class="button fpvsi-remove-lang" onclick="this.closest(\'tr\').remove()">✕</button></td>';
        echo '</tr>';
    }

    echo '</tbody></table>';
    echo '<p><button type="button" class="button" onclick="fpvsiAddLang()">+ Añadir idioma</button></p>';
    echo '</div>';

    echo '<script>
    var fpvsiLangIdx = ' . count( $languages ) . ';
    function fpvsiAddLang() {
        var tbody = document.querySelector("#fpvsi-langs-repeater tbody");
        var tr = document.createElement("tr");
        tr.className = "fpvsi-lang-row";
        tr.innerHTML = \'<td><input type="text" name="fpvsi_a11y_config[languages][\' + fpvsiLangIdx + \'][code]" value="" style="width:60px" /></td>\'
            + \'<td><input type="text" name="fpvsi_a11y_config[languages][\' + fpvsiLangIdx + \'][label]" value="" style="width:120px" /></td>\'
            + \'<td><input type="text" name="fpvsi_a11y_config[languages][\' + fpvsiLangIdx + \'][flag]" value="" style="width:120px" /></td>\'
            + \'<td><button type="button" class="button fpvsi-remove-lang" onclick="this.closest(\\\'tr\\\').remove()">✕</button></td>\';
        tbody.appendChild(tr);
        fpvsiLangIdx++;
    }
    </script>';
}

/**
 * Render settings page
 */
function fpvsi_a11y_settings_page() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }
    ?>
    <div class="wrap">
        <h1>FPVSI Accessibility Widget</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields( 'fpvsi_a11y_group' );
            do_settings_sections( 'fpvsi-a11y-settings' );
            submit_button( 'Guardar ajustes' );
            ?>
        </form>
    </div>
    <?php
}
