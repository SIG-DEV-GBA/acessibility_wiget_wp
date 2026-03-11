<?php
/**
 * Plugin Name: FPVSI Accessibility Widget
 * Plugin URI:  https://github.com/SIG-DEV-GBA/accesibility_widged
 * Description: Widget de accesibilidad con lector de voz (TTS), ajustes visuales y selector de idiomas.
 * Version:     1.2.0
 * Author:      SIG-DEV-GBA
 * Author URI:  https://github.com/SIG-DEV-GBA
 * License:     MIT
 * Text Domain: fpvsi-a11y-widget
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'FPVSI_A11Y_VERSION', '1.2.0' );
define( 'FPVSI_A11Y_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'FPVSI_A11Y_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Auto-update desde GitHub
require_once FPVSI_A11Y_PLUGIN_DIR . 'vendor/plugin-update-checker/plugin-update-checker.php';
use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

$fpvsi_a11y_update_checker = PucFactory::buildUpdateChecker(
    'https://github.com/SIG-DEV-GBA/acessibility_wiget_wp/',
    __FILE__,
    'fpvsi-a11y-widget'
);
$fpvsi_a11y_update_checker->setBranch( 'main' );
$fpvsi_a11y_update_checker->getVcsApi()->enableReleaseAssets();

// Incluir la página de ajustes
require_once FPVSI_A11Y_PLUGIN_DIR . 'includes/settings.php';

/**
 * Construir config JS a partir de opciones guardadas
 */
function fpvsi_a11y_build_config() {
    $saved = get_option( 'fpvsi_a11y_config', [] );

    $config = [
        'colors'     => [
            'primary' => ! empty( $saved['primary_color'] ) ? $saved['primary_color'] : '#A10D5E',
            'accent'  => ! empty( $saved['accent_color'] )  ? $saved['accent_color']  : '#F29429',
        ],
        'position'   => ! empty( $saved['position'] ) ? $saved['position'] : 'bottom-left',
        'features'   => isset( $saved['features'] ) && is_array( $saved['features'] ) ? array_values( $saved['features'] ) : [ 'fontSize', 'contrast', 'bigCursor', 'textSpacing', 'dyslexiaFont', 'highlightLinks', 'tts', 'languages' ],
        'ttsLang'    => ! empty( $saved['tts_lang'] ) ? $saved['tts_lang'] : 'es-ES',
        'storageKey'  => 'a11y-prefs',
        'zIndex'     => ! empty( $saved['z_index'] ) ? (int) $saved['z_index'] : 9998,
        'offsetX'    => isset( $saved['offset_x'] ) ? (int) $saved['offset_x'] : 20,
        'offsetY'    => isset( $saved['offset_y'] ) ? (int) $saved['offset_y'] : 20,
        'flagsUrl'   => FPVSI_A11Y_PLUGIN_URL . 'assets/flags/',
    ];

    // Trigger icon
    if ( ! empty( $saved['trigger_icon'] ) ) {
        $config['triggerIcon'] = $saved['trigger_icon'];
    }

    // Languages
    if ( ! empty( $saved['languages'] ) && is_array( $saved['languages'] ) ) {
        $config['languages'] = array_values( $saved['languages'] );
    }

    // Labels personalizados
    if ( ! empty( $saved['labels'] ) && is_array( $saved['labels'] ) ) {
        $labels = [];
        foreach ( $saved['labels'] as $k => $v ) {
            if ( ! empty( $v ) ) {
                $labels[ $k ] = $v;
            }
        }
        if ( ! empty( $labels ) ) {
            $config['labels'] = $labels;
        }
    }

    return $config;
}

/**
 * Obtener modo de activación
 */
function fpvsi_a11y_get_mode() {
    $saved = get_option( 'fpvsi_a11y_config', [] );
    return ! empty( $saved['activation_mode'] ) ? $saved['activation_mode'] : 'global';
}

/**
 * Enqueue assets en el frontend
 * CSS y JS se cargan siempre (Elementor widget los necesita también)
 */
add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'fpvsi-a11y',
        FPVSI_A11Y_PLUGIN_URL . 'assets/css/widget.css',
        [],
        FPVSI_A11Y_VERSION
    );

    wp_enqueue_script(
        'fpvsi-a11y',
        FPVSI_A11Y_PLUGIN_URL . 'assets/js/widget.js',
        [],
        FPVSI_A11Y_VERSION,
        true
    );

    // Solo inyectar config global en modo "global"
    if ( fpvsi_a11y_get_mode() === 'global' ) {
        $config = fpvsi_a11y_build_config();
        $json = wp_json_encode( $config, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
        wp_add_inline_script( 'fpvsi-a11y', 'var fpvsiA11yConfig = ' . $json . ';', 'before' );
    }
});

/**
 * Auto-init en footer
 * - Modo "global": usa config de Ajustes (inline fpvsiA11yConfig)
 * - Modo "elementor": usa config guardada por el widget de Elementor (wp_options)
 */
add_action( 'wp_footer', function () {
    $mode = fpvsi_a11y_get_mode();

    if ( $mode === 'global' ) {
        global $fpvsi_a11y_elementor_active;
        if ( ! empty( $fpvsi_a11y_elementor_active ) ) {
            return;
        }
        echo '<script>document.addEventListener("DOMContentLoaded",function(){if(typeof FpvsiA11yWidget!=="undefined"&&typeof fpvsiA11yConfig!=="undefined"){FpvsiA11yWidget.init(fpvsiA11yConfig);}});</script>';
        return;
    }

    // Modo "elementor": leer config guardada por el widget de Elementor
    $config = get_option( 'fpvsi_a11y_elementor_config', null );
    if ( empty( $config ) ) {
        return; // No se ha configurado aún desde Elementor
    }
    // Asegurar flagsUrl correcto
    $config['flagsUrl'] = FPVSI_A11Y_PLUGIN_URL . 'assets/flags/';
    $json = wp_json_encode( $config, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
    echo '<script>document.addEventListener("DOMContentLoaded",function(){if(typeof FpvsiA11yWidget!=="undefined"){FpvsiA11yWidget.init(' . $json . ');}});</script>';
});

/**
 * Integración con Elementor
 */
add_action( 'plugins_loaded', function () {
    if ( ! did_action( 'elementor/loaded' ) ) {
        return;
    }
    // Registrar widget de Elementor
    add_action( 'elementor/widgets/register', function ( $widgets_manager ) {
        require_once FPVSI_A11Y_PLUGIN_DIR . 'includes/elementor-widget.php';
        $widgets_manager->register( new \Fpvsi_A11y_Elementor_Widget() );
    });
});

/**
 * Al activar el plugin, crear opciones por defecto
 */
register_activation_hook( __FILE__, function () {
    if ( ! get_option( 'fpvsi_a11y_config' ) ) {
        add_option( 'fpvsi_a11y_config', [] );
    }
});
