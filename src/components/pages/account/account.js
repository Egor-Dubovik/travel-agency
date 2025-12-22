document.addEventListener('DOMContentLoaded', function () {
	const ticketsContainer = document.querySelector('.tickets__container');
	const ticketsTable = document.querySelector('.tickets__table');
	const emptyTickets = document.querySelector('.tickets__empty');

	function renderTickets() {
		const ticketsData = localStorage.getItem('tikets');

		if (ticketsData) {
			try {
				const tickets = JSON.parse(ticketsData);

				if (Array.isArray(tickets) && tickets.length > 0) {
					ticketsTable.classList.add('.--active');
					const ticketsBody = ticketsTable.querySelector('.tickets__body');
					ticketsBody.innerHTML = '';

					// Render each ticket
					tickets.forEach(ticket => {
						const ticketRow = createTicketRow(ticket);
						ticketsBody.appendChild(ticketRow);
					});
				} else {
					emptyTickets.classList.add('.--active');
				}
			} catch (error) {
				console.error('Error parsing tickets from localStorage:', error);
				emptyTickets.classList.add('.--active');
			}
		} else {
			emptyTickets.classList.add('.--active');
		}
	}

	function createTicketRow(ticket) {
		const row = document.createElement('div');
		row.className = 'ticket__row';

		const title = ticket.title || 'Unknown Tour';
		const paymentMethod = ticket.paymentMethod || 'Unknown';
		const price = ticket.price ? `$${ticket.price}` : '$0';
		const status = ticket.status || 'Upcoming';
		const date = ticket.date || 'N/A';
		const time = ticket.time || 'N/A';
		const imgSrc = ticket.img || '@img/tour-card/WineTastingTuscany.jpg';
		const paymentIcon = getPaymentIcon(paymentMethod);

		row.innerHTML = `
		    <div class="ticket__info">
		        <img src="${imgSrc}" alt="${title}" class="ticket__img">
		        <div class="ticket__details">
		            <h3 data-fls-title class="ticket__name title__third">${title}</h3>
		            <div class="ticket__date-time">
		                <span class="--icon-calender">${date}</span>
		                <span class="--icon-time">${time}</span>
		            </div>
		        </div>
		    </div>
		    <div class="ticket__payment">
		        <img src="${paymentIcon}" alt="${paymentMethod}" class="ticket__payment-icon">
		        <p>${paymentMethod}</p>
		    </div>
		    <div class="ticket__price">${price}</div>
		    <div class="ticket__status">
		        <span class="${getStatusClass(status)}">${status}</span>
		    </div>
		`;

		return row;
	}

	function getPaymentIcon(paymentMethod) {
		const lowerMethod = paymentMethod.toLowerCase();
		if (lowerMethod.includes('paypal')) {
			return '@img/icons/paypal.svg';
		} else if (lowerMethod.includes('visa')) {
			return '@img/icons/visa.svg';
		} else if (lowerMethod.includes('mastercard') || lowerMethod.includes('master card')) {
			return '@img/icons/mastercard.svg';
		} else if (lowerMethod.includes('discover')) {
			return '@img/icons/discover.svg';
		} else if (lowerMethod.includes('maestro')) {
			return '@img/icons/maestro.svg';
		} else {
			return '@img/icons/paypal.svg';
		}
	}

	function getStatusClass(status) {
		const lowerStatus = status.toLowerCase();
		if (
			lowerStatus.includes('ended') ||
			lowerStatus.includes('past') ||
			lowerStatus.includes('completed')
		) {
			return '--icon-ended';
		} else {
			return '--icon-upcoming';
		}
	}

	renderTickets();

	// Optional: Re-render when localStorage changes (for cross-tab support)
	window.addEventListener('storage', function (e) {
		if (e.key === 'tikets') renderTickets();
	});
});
