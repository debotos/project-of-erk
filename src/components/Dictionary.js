import React from 'react';

const Dictionary = (props) => (

  <div>
  <p className="add-dictionary-color">
 
  {props.count}. Domain: {props.domainText} , Range: {props.rangeText}
  
  </p>
 
<button  className="button button--link" onClick={(e) => {
 
  props.handleDeleteDictionary(props.domainText,props.rangeText);
}}
>
remove
</button>
<hr></hr>
  </div>
);

export default Dictionary;