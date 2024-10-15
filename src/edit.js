import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import { useSelect } from '@wordpress/data';

export default function Edit() {

  const {title, taxonomies, language} = useSelect( ( select ) => {
    const title = select('core/editor').getEditedPostAttribute('title');
    const thisPostIngredientsIDs = select('core/editor').getEditedPostAttribute('main_ingredient');
    const allMainIngredients = select( 'core' ).getEntityRecords( 'taxonomy', 'main_ingredient', { 
      per_page: -1, 
      orderby: 'name', 
      order: 'asc', 
      _fields: 'id,name,slug' 
    } )
    const getlanguage = select('core/editor').getEditedPostAttribute('lang');

    const language = getlanguage ? getlanguage : 'en';

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

    return { title, taxonomies, language };
  });

	return (
		<div { ...useBlockProps() }>
        <h1 className='formo-recipe-header'>
        {title === '' 
          ? <span className="formo-recipe-header-placeholder">
              {language === 'de' ? 'Rezeptname (oben einfüllen)' : 'Recipe title (top field)'}
            </span> 
          : title
        } {language === 'de' ? 'mit' : 'with'} { taxonomies.length > 0 
          ? taxonomies.join(' & ') 
          : <span className="formo-recipe-header-placeholder">
              {language === 'de' ? 'Zutaten (in sidebar)' : 'Add Ingredients (in sidebar)'}
            </span>
        }
        </h1>
    </div>
	);
}
