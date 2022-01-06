let txPhLeft = 100;
let txPhRight = -100;

function carrouselToLeft(){
    document.querySelectorAll('.dia').forEach(function(dia){
        dia.style.transform = 'translateX(' + txPhLeft + '%)';
    });
    txPhLeft += 100;
    txPhRight += 100;
    console.log('right: ' + txPhRight);
    console.log('left: ' + txPhLeft);
    checkTeleport();
}

function carrouselToRight(){
    document.querySelectorAll('.dia').forEach(function (dia) {
        dia.style.transform = 'translateX(' + txPhRight + '%)';
    });
    txPhLeft -= 100;
    txPhRight -= 100;
    console.log('right: ' + txPhRight);
    console.log('left: ' + txPhLeft);
    checkTeleport();
}

function checkTeleport(){
    if (txPhRight === -400) {
        carrouselToLeft();
        carrouselToLeft();
        carrouselToLeft();
    }
    if (txPhLeft === 200) {
        carrouselToRight();
        carrouselToRight();
        carrouselToRight();
    }
}

document.getElementById('gotoMiddlepointFromDashboard').onclick = function (){
    document.querySelector('.dashboard').classList.add('hidden');
    document.getElementById('middlepointIframe').classList.remove('hidden');
    document.querySelector('.mask').style.zIndex = '30';
    setTimeout('okloaded()', 500);
}

document.getElementById('gotoOpennewsFromDashboard').onclick = function () {
    document.querySelector('.dashboard').classList.add('hidden');
    document.getElementById('opennewsIframe').classList.remove('hidden');
    document.querySelector('.mask').style.zIndex = '30';
    setTimeout('okloaded()', 500);
}

document.getElementById('gotoPoogleFromDashboard').onclick = function () {
    document.querySelector('.dashboard').classList.add('hidden');
    document.getElementById('poogleIframe').classList.remove('hidden');
    document.querySelector('.mask').style.zIndex = '30';
    setTimeout('okloaded()', 500);
}

function okloaded(){
    document.querySelector('.mask').style.zIndex = '5';
    document.querySelector('.identity').style.marginTop = '-100px';
    document.querySelector('.zive-ghary').style.height = '100%';
}

document.querySelector('.identity>.username').innerHTML = localStorage.getItem('username');
document.querySelector('.identity>.avatar').style.background = "url(" + localStorage.getItem('avatarUrl') + ") center";