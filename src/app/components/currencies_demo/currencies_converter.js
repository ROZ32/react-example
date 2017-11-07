import React from 'react';
import image from '../../images/cloud-upload-download-data-transfer.svg';

import '../../styles/basic_demos.scss';
import '../../styles/currencies_demo.scss';
import data from './data';

import CurrencySelector from './currency_selector';

export class CurrenciesConverter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currencies: data.currencies,
			currencyLeftSelected: data.currencies[0],
			currencyRightSelected: data.currencies[1],
			currencyLeftValue: 0,
			currencyRightValue: 0
		};

		this.onSelectCurrency = this.onSelectCurrency.bind(this);
	}

	onSelectCurrency(code) {
		const {currencies, currencyLeftValue} = this.state;
		const newCurrencieSelected = currencies.filter(cur => cur.code === code)[0];
		this.setState({
			currencyRightSelected: newCurrencieSelected,
			currencyRightValue: currencyLeftValue * newCurrencieSelected.sellRate
		});
	}

	calculateCurrencyChange(event, side) {
		const {currencyRightSelected} = this.state;
		const newVal = event.target.value;
		if (side == 'left') {
			this.setState({
				currencyLeftValue: newVal,
				currencyRightValue: newVal * currencyRightSelected.sellRate
			});
		} else if (side == 'right') {
			this.setState({
				currencyLeftValue: newVal / currencyRightSelected.sellRate,
				currencyRightValue: newVal
			});
		}
	}

	render() {
		const {currencies, currencyLeftSelected, currencyRightSelected, currencyLeftValue ,currencyRightValue} = this.state;
		return (
			<div>
				<header>
					<img src={image} />
					<h1>Currency Converter</h1>
				</header>
				<div className="content container">
					<div className="row">
						<div className="col align-self-center">
							<div className="row row-select-currency">
								<div className="col-md-6 col-md-offset-3">
									<h2>Select Currency</h2>
									<p>
										<CurrencySelector currencies={currencies} onSelectCurrency={this.onSelectCurrency}/>
									</p>
								</div>
							</div>
							
							<div className="row">
								<div className="col-sm-6 currency-from-input">
									<h3 className={`currency-flag + ${currencyLeftSelected.code}`}>{currencyLeftSelected.name}</h3>
									<div className="input-group">
										<span className="input-group-addon">{currencyLeftSelected.sign}</span>
										<input type="number" value={currencyLeftValue} onChange={(e) => {this.calculateCurrencyChange(e, 'left')}} className="form-control" aria-describedby="basic-addon2" step="1" pattern="\d\.\d{2}"  />
										<span className="input-group-addon" id="basic-addon2">{currencyLeftSelected.code}</span>
									</div>
								</div>
								<div className="col-sm-6 currency-to-input">
									<h3 className={`currency-flag + ${currencyRightSelected.code}`}>{currencyRightSelected.name}</h3>
									<div className="input-group">
										<span className="input-group-addon">{currencyRightSelected.sign}</span>
										<input type="number" value={currencyRightValue} onChange={(e) => {this.calculateCurrencyChange(e, 'right')}} className="form-control" aria-describedby="basic-addon3" step="1" pattern="\d\.\d{2}"  />
										<span className="input-group-addon" id="basic-addon3">{currencyRightSelected.code}</span>
									</div>

								</div>
							</div>
							<div className="row">
								<div className="col-sm-12">
									<p>{`Exchange Rate $ 1 AUD = ${currencyRightSelected.sign} ${currencyRightSelected.sellRate} ${currencyRightSelected.code}`}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
