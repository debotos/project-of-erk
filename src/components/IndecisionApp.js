import React from 'react';

import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';
import AddDictionary from './AddDictionary';
import Dictionaries from './Dictionaries';

export default class IndecisionApp extends React.Component {
	state = {
		options: ['Apple iPhone 6s', 'Samsung Galaxy S8', 'Huawei P9'],
		colors: [0, 1, 2], // it refers to the index of the ranges array
		prices: ['CHF 769', 'CHF 569', 'CHF 272'],
		domains: ['Stonegrey', 'Midnight Black', 'Mystic Silver'],
		ranges: ['Dark Grey', 'Black', 'Silver'],
		selectedOption: undefined
	};
	handleDeleteOptions = () => {
		this.setState(() => ({ options: [] }));
		this.setState(() => ({ colors: [] }));
		this.setState(() => ({ prices: [] }));
	};

	handleGetData = () => {
		this.setState(() => ({
			options: ['Apple iPhone 6s', 'Samsung Galaxy S8', 'Huawei P9']
		}));
		this.setState(() => ({ colors: [0, 1, 2] }));
		this.setState(() => ({ prices: ['CHF 769', 'CHF 569', 'CHF 272'] }));
	};

	handleShowDictionary = () => {
		this.setState(() => ({
			domains: ['Stonegrey', 'Midnight Black', 'Mystic Silver']
		}));
		this.setState(() => ({ ranges: ['Dark Grey', 'Black', 'Silver'] }));
	};

	handleClearSelectedOption = () => {
		this.setState(() => ({ selectedOption: undefined }));
	};

	handleDeleteOption = (optionToRemove, colorToRemove, priceToRemove) => {
		this.setState(
			prevState => ({
				options: prevState.options.filter(option => optionToRemove !== option),
				colors: prevState.colors.filter(color => colorToRemove !== color),
				prices: prevState.prices.filter(price => priceToRemove !== price)
			}),
			() => {
				console.log({ optionToRemove, colorToRemove, priceToRemove });
			}
		);
	};

	handleDeleteDictionary = (domainToRemove, rangeToRemove) => {
		this.setState(prevState => ({
			domains: prevState.domains.filter(domain => domainToRemove !== domain),
			ranges: prevState.ranges.filter(range => rangeToRemove !== range)
		}));
	};

	handleDeleteDictionaries = () => {
		this.setState(() => ({ domains: [] }));
		this.setState(() => ({ ranges: [] }));
		this.setState(() => ({ colors: [] }));
	};

	handlePick = () => {
		const randomNum = Math.floor(Math.random() * this.state.options.length);
		const option = this.state.options[randomNum];
		this.setState(() => ({
			selectedOption: option
		}));
	};

	handleAddOption = (option, color, price) => {
		// console.log({ option, color, price });

		if (!option) {
			return 'Enter a valid value to add item';
		} else if (this.state.options.indexOf(option) > -1) {
			return 'This option already exists';
		}

		if (!color) {
			return 'Enter a valid value to add item';
		} // here in the else block you can implemet 'already exists logic'
		// also in the dropdown component you can do it

		if (!price) {
			return 'Enter a valid value to add item';
		} else if (this.state.prices.indexOf(option) > -1) {
			return 'This price already exists';
		}

		this.setState(prevState => ({
			options: prevState.options.concat(option),
			colors: prevState.colors.concat(parseInt(color, 10)),
			prices: prevState.prices.concat(price)
		}));
	};

	handleAddDictionary = (domain, range) => {
		if (!domain) {
			return 'Enter a valid domain to add a dictionary';
		} else if (this.state.domains.indexOf(domain) > -1) {
			return 'This domain already exists';
		} else if (
			this.state.ranges.indexOf(domain) > -1 &&
			this.state.domains.indexOf(range) > -1
		) {
			return 'This is a cycle please try another';
		} else if (this.state.ranges.indexOf(domain) > -1) {
			return 'This is a chain please try another';
		}

		if (!range) {
			return 'Enter a valid range to add a dictionary';
		} else if (this.state.ranges.indexOf(range) > -1) {
			return 'This range already exists';
		} else if (
			this.state.domains.indexOf(range) > -1 &&
			this.state.ranges.indexOf(domain) > -1
		) {
			return 'This is a cycle please try another';
		} else if (this.state.ranges.indexOf(domain) > -1) {
			return 'This is a chain please try another';
		}

		this.setState(
			prevState => ({
				domains: prevState.domains.concat(domain),
				ranges: prevState.ranges.concat(range)
			}),
			() => {
				const json4 = JSON.stringify(this.state.domains);
				const json5 = JSON.stringify(this.state.ranges);
				// console.log({ json4, json5 });
				localStorage.setItem('domains', json4);
				localStorage.setItem('ranges', json5);
			}
		);
	};

	componentDidMount() {
		try {
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);
			if (options) {
				this.setState({ options });
			} else {
				this.setState({ options: [] });
			}

			const json1 = localStorage.getItem('colors');
			const colors = JSON.parse(json1);
			if (colors) {
				this.setState({ colors });
			} else {
				this.setState({ colors: [] });
			}

			const json2 = localStorage.getItem('prices');
			const prices = JSON.parse(json2);
			if (prices) {
				this.setState({ prices });
			} else {
				this.setState({ prices: [] });
			}

			const json4 = localStorage.getItem('domains');
			const domains = JSON.parse(json4);
			if (domains) {
				this.setState({ domains });
			} else {
				this.setState({ domains: [] });
			}

			const json5 = localStorage.getItem('ranges');
			const ranges = JSON.parse(json5);
			if (ranges) {
				this.setState({ ranges });
			} else {
				this.setState({ ranges: [] });
			}
		} catch (e) {
			console.log(e);
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			const json1 = JSON.stringify(this.state.colors);
			const json2 = JSON.stringify(this.state.prices);
			const json4 = JSON.stringify(this.state.domains);
			const json5 = JSON.stringify(this.state.ranges);

			localStorage.setItem('options', json);
			localStorage.setItem('colors', json1);
			localStorage.setItem('prices', json2);
			localStorage.setItem('domains', json4);
			localStorage.setItem('ranges', json5);
		}
	}
	componentWillUnmount() {
		console.log('componentWillUnmount');
	}
	render() {
		const subtitle = 'Welcome';

		return (
			<div>
				<Header subtitle={subtitle} />
				<div className="container">
					<Action
						hasOptions={this.state.options.length > 0}
						handlePick={this.handlePick}
					/>
					<div className="widget">
						<Options
							options={this.state.options}
							colors={this.state.colors}
							prices={this.state.prices}
							ranges={this.state.ranges}
							domains={this.state.domains}
							handleDeleteOptions={this.handleDeleteOptions}
							handleGetData={this.handleGetData}
							handleDeleteOption={this.handleDeleteOption}
						/>

						<AddOption
							ranges={this.state.ranges}
							domains={this.state.domains}
							handleAddOption={this.handleAddOption}
						/>

						<Dictionaries
							domains={this.state.domains}
							ranges={this.state.ranges}
							handleDeleteDictionaries={this.handleDeleteDictionaries}
							handleShowDictionary={this.handleShowDictionary}
							handleDeleteDictionary={this.handleDeleteDictionary}
						/>

						<AddDictionary handleAddDictionary={this.handleAddDictionary} />
					</div>
				</div>
				<OptionModal
					selectedOption={this.state.selectedOption}
					handleClearSelectedOption={this.handleClearSelectedOption}
				/>
				<footer className="footer">@2018 All Rights Reserved</footer>
			</div>
		);
	}
}
