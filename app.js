const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

//modal drawer
const listEl = document.querySelector('.mdc-drawer .mdc-list');
const hamburger = document.querySelector('#hamburger');
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

hamburger.addEventListener('click', (event) => {
	openDrawer();
});

listEl.addEventListener('click', (event) => {
	closeDrawer();
});

function openDrawer() {
	drawer.open = true;
}
function closeDrawer() {
	drawer.open = false;
}

// tabs
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));

const homebtn = document.querySelector('#home');

homebtn.addEventListener('click', () => {
	home();
});

function home() {
	const tabActive = document.querySelector('.mdc-tab--active');
	const indicatorActive = document.querySelector('.mdc-tab-indicator--active');

	tabActive.classList.remove('mdc-tab--active');
	indicatorActive.classList.remove('mdc-tab-indicator--active');

	document.querySelectorAll('.mdc-image-list__item').forEach((item) => {
		item.classList.remove('hidden');
	});
}

//filtering
document.querySelectorAll('.mdc-tab__ripple').forEach((tab) => {
	tab.addEventListener('click', filter);
});
function filter(event) {
	const filter = event.target.parentElement
		.querySelector('.mdc-tab__text-label')
		.textContent.toLowerCase();
	console.log(filter);
	document.querySelectorAll('.mdc-image-list__item').forEach((item) => {
		item.classList.add('hidden');
	});

	document.querySelectorAll(`.${filter}`).forEach((item) => {
		item.classList.remove('hidden');
		console.log(item);
	});
}

//sheets
const appBarElement = document.querySelector('.mdc-top-app-bar-meme');
const appBar = new MDCTopAppBar(appBarElement);

const memeTabBar = document.querySelector('.mdc-tab-bar');
const tabBarMeme = new MDCTabBar(memeTabBar);

document.querySelectorAll('.mdc-image-list__item').forEach((item) => {
	console.log(item);
	item.addEventListener('click', openSheet);
});

document.getElementById('close').addEventListener('click', closeSheet);

function openSheet(event) {
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	document.querySelector('.sheet').classList.remove('sheet-out-of-view');
	document.querySelector('.sheet').querySelector('img').src = event.target.src;
	document.querySelector('.meme-title').textContent = event.target.alt;
	document.querySelector('body').classList.add('no-scroll');

	const url = new URL(location);
	url.searchParams.set('meme', event.target.alt);
	history.pushState({ page: 1 }, '', url);
}

function closeSheet() {
	document.querySelector('.sheet').classList.add('sheet-out-of-view');
	document.querySelector('body').classList.remove('no-scroll');

	const url = new URL(location);
	url.searchParams.delete('meme');
	history.pushState({ page: 0 }, '', url);
}

//pop state
addEventListener('popstate', (event) => {});
onpopstate = (event) => {
	closeSheet();
};

//offline state
window.addEventListener('load', () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('service-worker.js');
	}
});
