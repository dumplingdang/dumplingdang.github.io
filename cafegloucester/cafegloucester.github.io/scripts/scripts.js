(function(d) {
    const $btn = d.querySelector('.menu-btn');
    const $body = d.querySelector('body');
    $btn.addEventListener('click', function() {
        $body.classList.toggle('show');
    });
})(document);