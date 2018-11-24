import React from 'react';
import Dictionary from './Dictionary';

const Dictionaries = props => (
	<div>
		<div className="widget-header">
			<h3 className="widget-header__title">Your Dictionary</h3>
			<button
				className="button button--link"
				onClick={props.handleShowDictionary}
			>
				Show Dictionaries
			</button>
			<button
				className="button button--link"
				onClick={props.handleDeleteDictionaries}
			>
				Remove All
			</button>
		</div>
		{props.domains.length === 0 && (
			<p className="widget__message">Please add Dictionary to get started!</p>
		)}

		{props.domains.map((domain, index) => {
			return (
				<div key={domain}>
					<Dictionary
						domainText={domain}
						rangeText={props.ranges[index]}
						count={index + 1}
						handleDeleteDictionary={props.handleDeleteDictionary}
					/>
				</div>
			);
		})}
	</div>
);

export default Dictionaries;
