function init() {
    objCal = new Calendar();
    objCal.init();
}

class Calendar {
    constructor() {
        this.calFrame = document.getElementById('main');
        setInterval(this.refresh.bind(this), 60000);
    }

    refresh() {
        this.calFrame.location.reload(true);
    }
}

document.addEventListener('DOMContentLoaded', init, false);