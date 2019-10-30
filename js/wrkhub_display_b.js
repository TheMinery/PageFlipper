/*var PageFlipper = function() {
    this.init = function() {
        this.frameMain = document.getElementById('main');
        this.frameWeather = document.getElementById('weather');
        setInterval(this.refresh.bind(this), 60000);
    }

    this.refresh = function() {
        console.log(this.frameMain.contentWindow.location.href)
        if (this.frameMain.contentWindow.location.href.search('calendar') > -1) {
            this.frameMain.contentWindow.location.href = '/pricing/';
        } else {
            this.frameMain.contentWindow.location.href = '/calendar/';
        }
        //this.frameMain.contentWindow.location.reload();
        //console.log('Weather reloaded');
    }
}*/

class Calendar {
    constructor() {
        this.frameMain = document.getElementById('main');
        setInterval(this.refresh.bind(this), 60000);
    }

    refresh() {
        this.frameMain.location.reload(true);
    }
}

class NewsBanner {
    constructor() {
        this.arElNews = new Array();
        this.xhr = new XMLHttpRequest();
        this.xhr.onreadystatechange = this.handleResponse.bind(this);
        this.newsURL = '/newsfetch.php';
        this.contContent = document.getElementById('newsContent');
        this.activeNewsItemIdx = null;
        this.objInterval = null;
        this.fetchNews();
    }

    handleResponse(evt) {
        if (this.xhr.readyState == 4 && this.xhr.status == 200) {
            this.objNews = JSON.parse(this.xhr.responseText);
            this.haltNews();
            this.purgeNews();
            this.popNews();
            this.animateNews();
            setTimeout(this.fetchNews.bind(this), 360000)
        }
    }

    fetchNews() {
        this.xhr.open('GET', this.newsURL, true);
        this.xhr.send();
    }

    haltNews() {
        //console.log('Halt News');
        if (this.activeNewsItemIdx) {
            clearInterval(this.objInterval);
            this.deactivateNewsItem(this.activeNewsItemIdx);
        }
    }

    activateNewsItem(idx) {
        this.arElNews[idx].classList.add('active');
    }

    deactivateNewsItem(idx) {
        this.arElNews[idx].classList.add('inactive');
        this.arElNews[idx].classList.remove('active');
        setTimeout(function(){
            if (this.arElNews[idx]) {
                this.arElNews[idx].classList.remove('inactive');
            }
        }.bind(this), 1000);
    }

    animateNews() {
        this.objInterval = setInterval(this.scrollNews.bind(this), 8000);
    }

    scrollNews() {
        if (this.activeNewsItemIdx === null) {
            this.activeNewsItemIdx = this.arElNews.length;
        }  else {
            this.deactivateNewsItem(this.activeNewsItemIdx)
        }
        
        if (this.activeNewsItemIdx < this.arElNews.length - 1) { this.activeNewsItemIdx++; } else { this.activeNewsItemIdx = 0; } 
        //console.log('this.activeNewsItemIdx = ' + this.activeNewsItemIdx);
        this.activateNewsItem(this.activeNewsItemIdx);

    }

    popNews() {
        this.arElNews = new Array();
        var textNode = null;
        for (var i=0; i<this.objNews.channel.item.length; i++) {
            this.arElNews[i] = document.createElement('div');
            textNode = document.createTextNode(this.objNews.channel.item[i].title);
            this.arElNews[i].appendChild(textNode);
            this.contContent.appendChild(this.arElNews[i]); 
        }
        //console.log('this.arElNews.length = ' + this.arElNews.length);
    }

    purgeNews() {
        while (this.contContent.firstChild) {
            this.contContent.removeChild(this.contContent.firstChild);
        }
    }
}

class CoffeeClock {
    constructor() {
        this.doClock();
    }

    doClock() {
        var d, h, m, s;
        d = new Date;
        
        h = 30 * ((d.getHours() % 12) + d.getMinutes() / 60);
        m = 6 * d.getMinutes();
        s = 6 * d.getSeconds();
        
        //move hands
        this.setAttr('h-hand', h);
        this.setAttr('m-hand', m);
        this.setAttr('s-hand', s);
        this.setAttr('s-tail', s+180);
        
        //display time
        h = d.getHours();
        m = d.getMinutes();
        s = d.getSeconds();
        
        if(h >= 12){
            this.setText('suffix', 'PM');
        }else{
            this.setText('suffix', 'AM');
        }
        
        if(h != 12){
            h %= 12;
        }
        
        this.setText('sec', s);
        this.setText('min', m);
        this.setText('hr', h);
        
        //call every second
        setTimeout(this.doClock.bind(this), 1000);
    }

    setAttr(id, val) {
        var v = 'rotate(' + val + ', 70, 70)';
        document.getElementById(id).setAttribute('transform', v);
    }

    setText(id, val) {
        if (val < 10) { val = '0' + val; }
        document.getElementById(id).innerHTML = val;
    }
}

