function initHamburgerMenu() {
	const hamburgerMenu = document.getElementById('hamburgerMenu');
	const menuOverlay = document.getElementById('menuOverlay');
	let closingTimeout = null;

	function positionMenu() {
		if (hamburgerMenu && menuOverlay) {
			const rect = hamburgerMenu.getBoundingClientRect();

			// Align menu's top-right corner with the hamburger
			const top = rect.bottom + window.scrollY;
			const right = window.innerWidth - rect.right;

			menuOverlay.style.top = `${top}px`;
			menuOverlay.style.right = `${right}px`;
			menuOverlay.style.left = 'auto';
			// Default transform origin; will be refined in openMenu for center animation
		}
	}

	function closeMenu() {
		if (menuOverlay) {
			menuOverlay.classList.remove('active');
			menuOverlay.classList.add('closing');
			closingTimeout = setTimeout(() => {
				menuOverlay.classList.remove('closing');
				menuOverlay.style.display = 'none';
				closingTimeout = null;
			}, 200);
		}
	}

	function openMenu() {
		if (menuOverlay) {
			// Clear any pending closing animation
			if (closingTimeout) {
				clearTimeout(closingTimeout);
				closingTimeout = null;
			}
			
			// Cancel any running animation by resetting it
			menuOverlay.style.animation = 'none';
			
			// Remove closing class immediately
			menuOverlay.classList.remove('closing');
			
			// Reset transform and opacity to start position
			menuOverlay.style.opacity = '0';
			menuOverlay.style.transform = 'scale(0)';
			
			positionMenu();
			menuOverlay.style.display = 'block';
			
			// Recalculate transform origin so animation appears from hamburger center
			const rect = hamburgerMenu.getBoundingClientRect();
			const overlayWidth = menuOverlay.offsetWidth;
			const originX = overlayWidth - rect.width / 2;
			menuOverlay.style.transformOrigin = `${originX}px 0`;

			// Force reflow to ensure animation starts from scale(0) with new origin
			menuOverlay.offsetHeight;
			
			// Reset animation style to allow CSS animation to work
			menuOverlay.style.animation = '';
			menuOverlay.classList.add('active');
		}
	}

	if (hamburgerMenu && menuOverlay) {
		hamburgerMenu.addEventListener('click', (e) => {
			e.stopPropagation();
			// Check if menu is active OR closing - if closing, we want to open it
			if (menuOverlay.classList.contains('active') && !menuOverlay.classList.contains('closing')) {
				closeMenu();
			} else {
				openMenu();
			}
		});

		// Close menu when clicking outside
		document.addEventListener('click', (e) => {
			const target = e.target;
			if (menuOverlay.classList.contains('active') && 
				target &&
				!menuOverlay.contains(target) && 
				!hamburgerMenu.contains(target)) {
				closeMenu();
			}
		});

		// Reposition on window resize
		window.addEventListener('resize', () => {
			if (menuOverlay.classList.contains('active')) {
				positionMenu();
			}
		});
	}
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initHamburgerMenu);
} else {
	initHamburgerMenu();
}
