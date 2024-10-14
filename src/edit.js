import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import { useSelect } from '@wordpress/data';

export default function Edit() {

  const {title, taxonomies} = useSelect( ( select ) => {
    const title = select('core/editor').getEditedPostAttribute('title');
    const thisPostIngredientsIDs = select('core/editor').getEditedPostAttribute('main_ingredient');
    const allMainIngredients = select( 'core' ).getEntityRecords( 'taxonomy', 'main_ingredient', { 
      per_page: -1, 
      orderby: 'name', 
      order: 'asc', 
      _fields: 'id,name,slug' 
    } )

    const taxonomies = thisPostIngredientsIDs.map( id => {

      if (!allMainIngredients) {
        return '...loading...';
      }
      const ingredient = allMainIngredients.find( ingredient => ingredient.id === id);
      
      if (!ingredient) {
        return '...loading...';
      } 
      else {
        return ingredient.name;
      }
    });

    return { title, taxonomies };
  });

	return (
		<div { ...useBlockProps() }>
        <h1 className='formo-recipe-header'>
         {title} with {taxonomies.join(' & ')}
        </h1>
    </div>
	);
}
