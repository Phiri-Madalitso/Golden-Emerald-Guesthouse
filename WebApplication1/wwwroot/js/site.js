document.addEventListener('DOMContentLoaded', function () {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var menuBtn = document.getElementById('menuBtn');
    var navLinks = document.getElementById('navLinks');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function () {
            var open = navLinks.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', open);
        });
        navLinks.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                navLinks.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.15 });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('in'); });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var hero = document.querySelector('.hero');
    if (!hero) return;
    var slides = hero.querySelectorAll('.hero-slide');
    var dotsEl = document.getElementById('heroDots');
    if (slides.length < 2 || !dotsEl) return;

    var idx = 0, timer = null;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dots = [];

    slides.forEach(function (_, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'hero-dot';
        b.setAttribute('aria-label', 'Show photo ' + (i + 1));
        b.addEventListener('click', function () { go(i, true); });
        dotsEl.appendChild(b);
        dots.push(b);
    });

    function go(n, user) {
        slides[idx].classList.remove('active');
        dots[idx].classList.remove('active');
        idx = (n + slides.length) % slides.length;
        slides[idx].classList.add('active');
        dots[idx].classList.add('active');
        if (user) restart();
    }
    function restart() {
        clearInterval(timer);
        if (!reduce) timer = setInterval(function () { go(idx + 1); }, 6000);
    }

    document.getElementById('heroPrev').addEventListener('click', function () { go(idx - 1, true); });
    document.getElementById('heroNext').addEventListener('click', function () { go(idx + 1, true); });
    hero.addEventListener('mouseenter', function () { clearInterval(timer); });
    hero.addEventListener('mouseleave', restart);

    var startX = null;
    hero.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1), true);
        startX = null;
    });

    dots[0].classList.add('active');
    restart();
});

document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('ul.links a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting && map[e.target.id]) {
                links.forEach(function (a) { a.classList.remove('active'); });
                map[e.target.id].classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) {
        var s = document.getElementById(id);
        if (s) io.observe(s);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Farm tabs
    var tabs = document.querySelectorAll('.farm-tab');
    tabs.forEach(function (t) {
        t.addEventListener('click', function () {
            tabs.forEach(function (x) { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
            document.querySelectorAll('.farm-panel').forEach(function (p) { p.classList.remove('active'); });
            t.classList.add('active');
            t.setAttribute('aria-selected', 'true');
            document.getElementById('farm-' + t.dataset.target).classList.add('active');
        });
    });

    // Gallery lightbox
    var photos = document.querySelectorAll('.gallery-grid .photo');
    if (photos.length && window.HTMLDialogElement) {
        var dlg = document.createElement('dialog');
        dlg.className = 'lightbox';
        dlg.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close">&times;</button><img alt="" />';
        document.body.appendChild(dlg);
        var big = dlg.querySelector('img');
        photos.forEach(function (p) {
            var img = p.querySelector('img');
            p.tabIndex = 0;
            p.setAttribute('role', 'button');
            var open = function () { big.src = img.src; big.alt = img.alt; dlg.showModal(); };
            p.addEventListener('click', open);
            p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
        });
        dlg.addEventListener('click', function () { dlg.close(); });
    }

    // Enquiry form opens WhatsApp with the request filled in
    var form = document.getElementById('enquiryForm');
    if (form) {
        var today = new Date().toISOString().slice(0, 10);
        var inEl = document.getElementById('enqIn'), outEl = document.getElementById('enqOut');
        inEl.min = today; outEl.min = today;
        inEl.addEventListener('change', function () { outEl.min = inEl.value || today; });
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var v = function (id) { return document.getElementById(id).value.trim(); };
            var msg = 'Hello Golden Emerald, I would like to book a ' + v('enqRoom') +
                (v('enqIn') ? ' from ' + v('enqIn') : '') +
                (v('enqOut') ? ' to ' + v('enqOut') : '') +
                ' for ' + v('enqGuests') + ' guest(s).' +
                (v('enqName') ? ' Name: ' + v('enqName') + '.' : '');
            window.open('https://wa.me/260762512858?text=' + encodeURIComponent(msg), '_blank', 'noopener');
        });
    }
});
