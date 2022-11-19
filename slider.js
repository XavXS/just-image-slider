class slider {
    #element = undefined;
    #selectedSlide = undefined;
    #paths = [];

    constructor() {
        this.#createUI();
        setInterval(() => this.nextSlide(), 5000);
    }

    addImage(path) {
        this.#paths.push(path);
        this.#addSlide();
    }

    setParent(parent) {
        parent.appendChild(this.#element);
    }

    selectSlide(index) {
        let slides = this.#element.querySelectorAll('.slide');
        this.#selectSlide(slides[index]);
    }

    nextSlide() {
        if(this.#paths.length === 0) return;

        let slides = this.#element.querySelectorAll('.slide');
        let currentIndex = [].indexOf.call(slides, this.#selectedSlide);
        if(currentIndex === slides.length-1) {
            this.#selectSlide(slides[0]);
            return;
        }
        this.#selectSlide(slides[currentIndex+1]);
    }

    prevSlide() {
        if(this.#paths.length === 0) return;

        let slides = this.#element.querySelectorAll('.slide');
        let currentIndex = [].indexOf.call(slides, this.#selectedSlide);
        if(currentIndex === 0) {
            this.#selectSlide(slides[slides.length-1]);
            return;
        }
        this.#selectSlide(slides[currentIndex-1]);
    }

    #addSlide() {
        let slides = this.#element.querySelector('.slides');

        // create and append slide element
        let slide = document.createElement('div');
        slide.classList.add('slide');
        slides.appendChild(slide);

        // select slide if clicked
        slide.addEventListener('click', () => {
            this.#selectSlide(slide);
        });
    }

    #selectSlide(slide) {
        // return if already selected or select
        if(slide.classList.contains('selected')) return;
        slide.classList.add('selected');
        this.#selectedSlide = slide;

        // remove selected except target
        let slides = this.#element.querySelectorAll('.slide');
        slides.forEach(s => {
            if(s !== slide) s.classList.remove('selected');
        });

        // update frame based on element index and corresponding path
        let frame = this.#element.querySelector('.frame');
        frame.style.backgroundImage = this.#paths[[].indexOf.call(slides, slide)];
    }

    #createUI() {
        let slider = document.createElement('div');
        slider.classList.add('slider');
    
        let frame = document.createElement('div');
        frame.classList.add('frame');
    
        let slides = document.createElement('div');
        slides.classList.add('slides');

        let prev = document.createElement('button');
        prev.classList.add('prev');
        prev.textContent = '<';
        prev.addEventListener('click', () => {
            this.prevSlide();
        });

        let next = document.createElement('button');
        next.classList.add('next');
        next.textContent = '>';
        next.addEventListener('click', () => {
            this.nextSlide();
        });

        slider.appendChild(frame);
        slider.appendChild(prev);
        slider.appendChild(next);
        slider.appendChild(slides);

        this.#element = slider;
    }
}