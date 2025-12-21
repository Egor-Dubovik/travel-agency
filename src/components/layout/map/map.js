// Підключення функціоналу "Чертоги Фрілансера"
import { FLS } from '@js/common/functions.js';
// Підключення доповнення
// Removed Loader import since we're using the new functional API
// Підключення налаштувань
import { MAP_STYLES, BREAKPOINTS, MAP_KEY } from './_settings.js';

import './map.scss';

function mapInit() {
	const SELECTORS = {
		section: '[data-fls-map]',
		marker: '[data-fls-map-marker]',
		map: '[data-fls-map-body]',
	};
	const $sections = document.querySelectorAll(SELECTORS.section);
	if (!$sections.length) return;
	// Function to load Google Maps API with the new functional API
	const loadMap = async onLoad => {
		// Check if Google Maps API is already loaded
		if (window.google && window.google.maps) {
			try {
				const { Map } = await google.maps.importLibrary('maps');
				// const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
				const { LatLng } = await google.maps.importLibrary('core');
				onLoad({ Map, Core: { LatLng } });
			} catch (e) {
				FLS('_FLS_MAP_ERROR');
				console.log(e);
			}
			return;
		}

		// If not loaded, create a Promise that resolves when the API loads
		return new Promise((resolve, reject) => {
			// Define a callback function to be called when the API loads
			window.initMap = async () => {
				try {
					const { Map } = await google.maps.importLibrary('maps');
					// const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
					const { LatLng } = await google.maps.importLibrary('core');
					onLoad({ Map, Core: { LatLng } });
					resolve();
				} catch (e) {
					FLS('_FLS_MAP_ERROR');
					console.log(e);
					reject(e);
				}
			};

			// Add the Google Maps script to the page with the API key
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&libraries=places&callback=initMap`;
			script.async = true;
			script.defer = true;
			script.onerror = () => {
				reject(new Error('Failed to load Google Maps API'));
				FLS('_FLS_MAP_ERROR');
			};
			document.head.appendChild(script);
		});
	};
	const initMap = async ({ api, lng, lat, markersData, zoom, maxZoom, $map }) => {
		const mapOptions = {
			maxZoom,
			zoom,
			mapTypeControl: false,
			styles: MAP_STYLES,
			center: {
				lat,
				lng,
			},
			disableDefaultUI: true,
			// mapId: 'DEMO_MAP_ID',
		};

		const map = new api.Map($map, mapOptions);

		const markerDesktopSize = { width: 40, height: 57 };
		const markerMobileSize = { width: 30, height: 42 };

		// Розмір маркерів
		const markerSize =
			window.innerWidth < BREAKPOINTS.tablet ? markerMobileSize : markerDesktopSize;
		const markers = await markersData.map(({ lat, lng, icon, title, markerZoom, markerPopup }) => {
			let image;
			if (icon) {
				image = document.createElement('img');
				image.src = icon;
			}

			const marker = new google.maps.Marker({
				position: { lat, lng },
				map,
				icon: {
					url: icon,
					scaledSize: new google.maps.Size(36, 48),
					anchor: new google.maps.Point(16, 48),
				},
			});

			marker.addListener('click', () => {
				if (markerZoom.enable) {
					map.setZoom(+markerZoom.value || 10);
				}

				if (markerPopup.enable && window.flsPopup) {
					window.flsPopup.open(markerPopup.value);
				}

				map.panTo(marker.getPosition());
			});

			return marker;
		});
		return map;
	};
	loadMap(api => {
		$sections.forEach($section => {
			const $maps = $section.querySelectorAll(SELECTORS.map);
			if (!$maps.length) return;

			$maps.forEach($map => {
				const $markers = $map.parentElement.querySelectorAll(SELECTORS.marker);
				const markersData = Array.from($markers).map($marker => ({
					lng: parseFloat($marker.dataset.flsMapLng) || 0,
					lat: parseFloat($marker.dataset.flsMapLat) || 0,
					icon: $marker.dataset.flsMapIcon,
					title: $marker.dataset.flsMapTitle,
					markerZoom: {
						enable: $marker.hasAttribute('data-fls-map-marker-zoom'),
						value: $marker.dataset.flsMapMarkerZoom,
					},
					markerPopup: {
						enable: $marker.hasAttribute('data-fls-map-marker-popup'),
						value: $marker.dataset.flsMapMarkerPopup,
					},
				}));
				const map = initMap({
					api,
					$map,
					lng: parseFloat($map.dataset.flsMapLng) || 0,
					lat: parseFloat($map.dataset.flsMapLat) || 0,
					zoom: parseFloat($map.dataset.flsMapZoom) || 6,
					maxZoom: parseFloat($map.dataset.flsMapMaxZoom) || 18,
					markersData,
				});
			});
		});
	});
}
document.querySelector('[data-fls-map]') ? window.addEventListener('load', mapInit) : null;
