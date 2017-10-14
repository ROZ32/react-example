import React from 'react';
import image from '../../images/cloud-upload-download-data-transfer.svg';

import '../../styles/currencies_demo.scss';
import data from './data';

export class CurrenciesConverter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currencies: data.currencies
		};
	}

	calculateCurrency(value) {
		console.log(value.value);
		this.rightValue = value.value;
	}

	render() {
		const {currencies} = this.state;
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
										<select>
										{
											currencies.map((value, index) => {
												let {code, name} = value;
												if (index !== 0) {
													return (
														<option key={index} value={code}>{name}</option>
													);
												}
											})
										}
										</select>
									</p>
								</div>
							</div>
							
							<div className="row">
								<div className="col-sm-6 currency-from-input">
									<h3 className="currency-flag AUD">Australian Dollars</h3>
									{
											//Currency A input
									}
									<div className="input-group">
										<span className="input-group-addon">$</span>
										<input type="number" defaultValue={0} className="form-control" ref={value => this.calculateCurrency(value)} aria-describedby="basic-addon2" step="1" pattern="\d\.\d{2}"  />
										<span className="input-group-addon" id="basic-addon2">AUD</span>
									</div>

								</div>
								<div className="col-sm-6 currency-to-input">
									<h3 className="currency-flag USD">United States Dollars</h3>
									{
											//Currency B input
									}
									<div className="input-group">
										<span className="input-group-addon">$</span>
										<input type="number" defaultValue={0} className="form-control" ref={this.rightValue} aria-describedby="basic-addon3" step="1" pattern="\d\.\d{2}"  />
										<span className="input-group-addon" id="basic-addon3">USD</span>
									</div>

								</div>
							</div>
							<div className="row">
								<div className="col-sm-12">
									{
											//Update to currently selected currency
									}
									<p>
										Exchange Rate $ 1 AUD = $ 0.7041 USD
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
