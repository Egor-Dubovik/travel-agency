import datepicker from 'js-datepicker';
import langs from './_lang.json';
import './datepicker.scss';

if (document.querySelector('[data-fls-datepicker]')) {
	const LANG = 'en'; // ua
	const datepickers = document.querySelectorAll('[data-fls-datepicker]');

	datepickers.forEach(el => {
		const datePicker = datepicker(el, {
			customDays: langs[LANG].week,
			customMonths: langs[LANG].month,
			overlayButton: langs[LANG].button,
			overlayPlaceholder: langs[LANG].year,
			startDay: 0,
			formatter: (input, date, instance) => {
				const value = date.toLocaleDateString();
				input.value = value;
			},
			onSelect: function (input, instance, date) {},
		});

		window.flsDatepicker = window.flsDatepicker || [];
		window.flsDatepicker.push(datePicker);
	});
}
