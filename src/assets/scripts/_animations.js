function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimation() {
    var projects = document.querySelectorAll('.projectCard');

    projects.forEach(function (project) {
        if (isElementInViewport(project)) {
            project.classList.add('visible');
            project.classList.remove('hidden');
        } else {
            project.classList.add('hidden');
            project.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', function () {
    handleScrollAnimation();
});

handleScrollAnimation();