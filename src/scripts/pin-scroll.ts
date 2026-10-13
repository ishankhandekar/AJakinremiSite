// Pinned sections: while one is stuck to the screen, page scroll moves its content
// inside a window instead of moving the page, so everything passes through one screen.
//
// Markup: [data-pin-section] > [data-pin] > … [data-window] > [data-track]
// The section's own styles handle the pinned look, keyed off the `data-pinned`
// attribute this script sets once it has measured that the track overflows.
for (const section of document.querySelectorAll<HTMLElement>('[data-pin-section]')) {
	const pin = section.querySelector<HTMLElement>('[data-pin]');
	const frame = section.querySelector<HTMLElement>('[data-window]');
	const track = section.querySelector<HTMLElement>('[data-track]');
	if (!pin || !frame || !track) continue;

	let travel = 0;

	const update = () => {
		if (!travel) return;
		const progress = Math.min(Math.max(-section.getBoundingClientRect().top / travel, 0), 1);
		track.style.transform = `translate3d(0, ${-progress * travel}px, 0)`;
		section.style.setProperty('--progress', String(progress));
	};

	const measure = () => {
		section.setAttribute('data-pinned', '');
		travel = track.offsetHeight - frame.clientHeight;

		// Everything already fits on one screen: leave the section in normal flow
		if (travel <= 8) {
			travel = 0;
			section.removeAttribute('data-pinned');
			section.style.height = '';
			track.style.transform = '';
			return;
		}

		section.style.height = `${pin.offsetHeight + travel}px`;
		update();
	};

	measure();
	new ResizeObserver(measure).observe(track);
	window.addEventListener('resize', measure);
	window.addEventListener('scroll', update, { passive: true });
}

export {};
