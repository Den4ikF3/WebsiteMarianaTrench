document.addEventListener('DOMContentLoaded', () => {

    const MAX_DEPTH = 10994;
    const depthDisplay = document.getElementById('current-depth');
    const trench = document.querySelector('.trench');

    function updateDepth() {
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        
        let scrollFraction = currentScroll / totalScrollHeight;
        let currentDepth = Math.round(scrollFraction * MAX_DEPTH);

        if (currentDepth > MAX_DEPTH) {
            currentDepth = MAX_DEPTH;
        }

        depthDisplay.textContent = currentDepth;
    }

    window.addEventListener('scroll', updateDepth);

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');                
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const creatures = document.querySelectorAll('.creature');
    creatures.forEach(creature => {
        observer.observe(creature);
    });

});