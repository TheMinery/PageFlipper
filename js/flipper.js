var PageFlipper = function() {
    this.init = function() {
        this.frameMain = document.getElementById('main');
        this.frameWeather = document.getElementById('weather');
        setInterval(this.refresh.bind(this), 1800000)
    }

    this.refresh = function() {
        this.frameMain.contentWindow.location.reload();
        console.log('Weather reloaded');
    }
}

function init() {
    objPageFlipper = new PageFlipper();
    objPageFlipper.init();
}

document.addEventListener('DOMContentLoaded', init, false);