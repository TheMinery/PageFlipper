function init() {
    //objPageFlipper = new PageFlipper();
    //objPageFlipper.init();
    objNewsBanner = new NewsBanner();
    objNewsBanner.init();
    objClock = new CoffeeClock();
    objClock.init();
}

document.addEventListener('DOMContentLoaded', init, false);