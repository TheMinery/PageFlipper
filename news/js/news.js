function newsScroller() {
    this.container = document.getElementsByTagName('section')[0]
    this.arElNewsItems = this.container.getElementsByTagName('div');
    this.elActiveNewsItem = null;

    this.scroll = function(elIdx) {
        if (this.elActiveNewsItem) { 
            var refThis = this;
            this.elActiveNewsItem.out();
            setTimeout(refThis.elActiveNewsItem.reset, 1000);
        }
    }
}

function newsItem(objParent, el) {
    this.objParent = objParent;
    this.container = el;

    this.in = function() {
        this.container.classList.toggle('active');
    }

    this.out = function() {
        this.container.classList.toggle('fadeOut');
    }

    this.reset = function() {
        this.container.classList.toggle('active');
        this.container.classList.toggle('fadeOut');
    }
}

function newsInit() {

}

document.addEventListener('DOMContentLoaded', newsInit);