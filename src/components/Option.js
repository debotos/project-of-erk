import React from 'react';

const Option = props => {
	// console.log(props);
	return (
		<div>
			<p className="add-option-color">
				{props.count}. Product: {props.optionText} , Color: {props.rangeText} ,
				Price: {props.priceText}
			</p>

			<button
				className="button button--link"
				onClick={e => {
					props.handleDeleteOption(
						props.optionText,
						props.colorText,
						props.priceText
					);
				}}
			>
				remove
			</button>
			<hr />
		</div>
	);
};
export default Option;
