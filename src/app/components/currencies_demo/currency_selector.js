import React from 'react';
import { PropTypes } from 'prop-types';

const CurrencySelector = ({currencies, onSelectCurrency}) => {
    return (
		<select onChange={e => onSelectCurrency(e.target.value)}>
			{
				currencies.map(({code, name}, index) => {
					if (index !== 0) {
						return (
							<option key={index} value={code}>{name}</option>
						);
					}
				})
			}
		</select>
    );
};

CurrencySelector.propTypes = {
    currencies: PropTypes.array.isRequired,
    onSelectCurrency: PropTypes.func.isRequired,
};

export default CurrencySelector;
