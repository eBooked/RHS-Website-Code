function initNavbarDropdowns() {
	const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

	dropdownToggles.forEach(toggle => {
		toggle.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			
			const dropdown = toggle.closest('.dropdown');
			const isActive = dropdown.classList.contains('active');
			
			// Close all other dropdowns
			document.querySelectorAll('.dropdown').forEach(dd => {
				if (dd !== dropdown) {
					dd.classList.remove('active');
				}
			});
			
			// Toggle current dropdown
			if (isActive) {
				dropdown.classList.remove('active');
			} else {
				dropdown.classList.add('active');
			}
		});
	});

	// Close dropdowns when clicking outside
	document.addEventListener('click', (e) => {
		if (!e.target.closest('.dropdown')) {
			document.querySelectorAll('.dropdown').forEach(dropdown => {
				dropdown.classList.remove('active');
			});
		}
	});
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initNavbarDropdowns);
} else {
	initNavbarDropdowns();
}
