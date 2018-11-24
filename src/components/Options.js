import React from 'react';
import Option from './Option';

const Options = props => {
	// console.log(props);

	return (
		<div>
			<div className="widget-header">
				<h3 className="widget-header__title">Your Dataset</h3>
				<button className="button button--link" onClick={props.handleGetData}>
					Show Data
				</button>
				<button
					className="button button--link"
					onClick={props.handleDeleteOptions}
				>
					Remove All
				</button>
			</div>
			{props.options.length === 0 && (
				<p className="widget__message">Please add a Product to get started!</p>
			)}
			{props.options.map((option, index) => {
				let colorText = props.colors[index]; // colorText is domain
				let domainIndex = props.domains.indexOf(colorText);
				let rangeText = props.ranges[domainIndex];
				return (
					<div key={option}>
						<Option
							optionText={option}
							colorText={colorText}
							rangeText={rangeText}
							priceText={props.prices[index]}
							count={index + 1}
							handleDeleteOption={props.handleDeleteOption}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Options;
