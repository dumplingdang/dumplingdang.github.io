(function(d) {
    const $btn = d.querySelector('.menu-btn');
    const $body = d.querySelector('body');
    $btn.addEventListener('click', function() {
        $body.classList.toggle('show');
    });
})(document);

(function(d) {
    const $btn = d.querySelector('.foodmenu-btn1');
    const $body = d.querySelector('body');
    $btn.addEventListener('click', function() {
        $body.classList.toggle('collapse1');
    });
})(document);

(function(d) {
    const $btn = d.querySelector('.foodmenu-btn2');
    const $body = d.querySelector('body');
    $btn.addEventListener('click', function() {
        $body.classList.toggle('collapse2');
    });
})(document);