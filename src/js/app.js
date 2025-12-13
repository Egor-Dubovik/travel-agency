// Підключення функціоналу "Чортоги Фрілансера"
import { addTouchAttr, addLoadedAttr, isMobile, FLS } from '@js/common/functions.js';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

addTouchAttr();

const handleUseTelInput = () => {
	const telInputs = document.querySelectorAll('#phone');

	const itiInstances = [];

	telInputs.forEach(input => {
		const iti = intlTelInput(input, {
			initialCountry: 'us',
			useFullscreenPopup: false,
			separateDialCode: true,
			utilsScript: new URL('intl-tel-input/build/js/utils.js', import.meta.url).href,
		});

		itiInstances.push({ input, iti });
	});

	// function getAllPhones() {
	// 	return itiInstances
	// 		.filter(({ iti }) => iti.isValidNumber())
	// 		.map(({ input, iti }) => ({
	// 			name: input.name,
	// 			value: iti.getNumber(), // +371...
	// 		}));
	// }
};

handleUseTelInput();
