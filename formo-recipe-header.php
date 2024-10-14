<?php
/**
 * Plugin Name:       Formo Recipe Header
 * Description:       Displays the recipes title and ingredients
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       formo-recipe-header
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}



if ( !function_exists('recipe_header') ) {

  function recipe_header() {

    $post_id = get_the_ID();
    $post_title = get_the_title($post_id);
    $language = substr(get_locale(), 0, 2);
    
    if (function_exists('pll__')) {
      $with = pll__('with');
    } else {
      $with = 'with';
    }

    // get the texonomies
    $main_ingredients = get_the_terms($post_id, 'main_ingredient');
    if ( empty($main_ingredients) ) {
      return '<h1>'.$post_title.'</h1>';
    }
    else {
      
      //get main_ingredients array length
      $main_ingredients_length = count($main_ingredients);
      
      if ($main_ingredients_length > 1) {
        // create a string with all the main ingredients separated by a &
        $main_ingredients = implode(' & ', wp_list_pluck($main_ingredients, 'name'));
      } else {
        $main_ingredients = $main_ingredients[0]->name;
      }


      return '<h1 class="formo-recipe-header">'.$post_title.' '.$with.' '.$main_ingredients.'</h1>';
    }
    }
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_formo_recipe_header_block_init() {
	register_block_type( __DIR__ . '/build', array(
    'render_callback' => 'recipe_header',
    'uses_context' => [ 'postId' ],
  ) );
}
add_action( 'init', 'create_block_formo_recipe_header_block_init' );
