import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class AddOption extends React.Component {
	state = {
		error: undefined,
		selectedOption: ''
	};
	handleSelectChange = selectedOption => {
		this.setState({ selectedOption });
		// console.log(`Selected: ${selectedOption.label}`);
	};
	handleAddOption = e => {
		e.preventDefault();
		const option = e.target.elements.option.value.trim();
		let color;
		if (!this.state.selectedOption) {
			color = '';
		} else {
			color = this.state.selectedOption.value.toString();
		}
		const price = e.target.elements.price.value.trim();

		const error = this.props.handleAddOption(option, color, price);

		this.setState(() => ({ error }));

		if (!error) {
			e.target.elements.option.value = '';
			this.setState({ selectedOptions: null });
			e.target.elements.price.value = '';
		} else {
			alert(error);
		}
	};

	render() {
		let { domains, ranges } = this.props;
		if (!domains || !ranges) return null;
		let selectOptions = domains.map((domain, index) => {
			let rangeIndex = ranges.indexOf(ranges[index]);
			return { label: domain, value: rangeIndex };
		});
		// console.log(selectOptions);
		return (
			<div>
				{this.state.error && (
					<p className="add-option-error">{this.state.error}</p>
				)}
				<form className="add-option" onSubmit={this.handleAddOption}>
					<input
						className="add-option__input"
						type="text"
						name="option"
						placeholder="Product"
					/>
					<Select
						name="color"
						className="add-color__input"
						value={this.state.selectedOption}
						onChange={this.handleSelectChange}
						options={selectOptions}
					/>
					<input
						className="add-price__input"
						type="text"
						name="price"
						placeholder="Price"
					/>
					<button className="button">Add Dataset</button>
				</form>
			</div>
		);
	}
}

export default AddOption;
