let fileMenuStrip = document.getElementById('fileMenuStrip');
let fileStripenDropdown = document.getElementById('file_stripen_dropdown');
let helpMenuStrip = document.getElementById('helpMenuStrip');
let helpStripenDropdown = document.getElementById('help_stripen_dropdown');

let IsAnyStripenDropdownOpened = false;
let IsFileStripenDropdownOpened = false;
let IsHelpStripenDropdownOpened = false;

// functions.

function styleDisplay(element, displayMode) {
        element.style.display = displayMode;
}

function closeAllStripenDropdown(){
        let getAttr;
        let splitGetAttr;
        document.querySelectorAll('.menu-strip-dropdown').forEach(function (stripenDropdown) {
                styleDisplay(stripenDropdown, "none");
                getAttr = stripenDropdown.getAttribute('id');
                splitGetAttr = getAttr.split('_', 1);
                document.getElementById(splitGetAttr + 'MenuStrip').style.backgroundColor = 'transparent';
        });
        IsAnyStripenDropdownOpened = false;
        IsFileStripenDropdownOpened = false;
        IsHelpStripenDropdownOpened = false;
        document.querySelector('.menuStripMask').style.display = 'none';
}

// endsection.

helpStripenDropdown.style.left = `${helpMenuStrip.offsetLeft}px`;

let eventClass;

const onClick = (event) => {
        eventClass = event.target.getAttribute('class');
        console.log(eventClass);
        if (eventClass !== "menu-strip-dropdown" && eventClass !== "btn-open-stripen-dropdown"){
                closeAllStripenDropdown();
        }
}

window.addEventListener('click', onClick);

fileMenuStrip.onclick = function(){
    if(IsFileStripenDropdownOpened === false) {
        closeAllStripenDropdown();
        fileMenuStrip.style.backgroundColor = 'rgba(0, 0, 0, .05)';
        styleDisplay(fileStripenDropdown, "block");
        IsAnyStripenDropdownOpened = true;
        IsFileStripenDropdownOpened = true;
        document.querySelector('.menuStripMask').style.display = 'block';
    } else {
        fileMenuStrip.style.backgroundColor = 'transparent';
        styleDisplay(fileStripenDropdown, "none");
        IsAnyStripenDropdownOpened = false;
            IsFileStripenDropdownOpened = false;
            document.querySelector('.menuStripMask').style.display = 'none';
        }
}

fileMenuStrip.onmouseover = function () {
        if (IsAnyStripenDropdownOpened === true) {
                closeAllStripenDropdown();
                fileMenuStrip.style.backgroundColor = 'rgba(0, 0, 0, .05)';
                styleDisplay(fileStripenDropdown, "block");
                IsAnyStripenDropdownOpened = true;
                IsFileStripenDropdownOpened = true;
                document.querySelector('.menuStripMask').style.display = 'block';
        }
}

helpMenuStrip.onclick = function(){
        if (IsHelpStripenDropdownOpened === false) {
                closeAllStripenDropdown();
                helpMenuStrip.style.backgroundColor = 'rgba(0, 0, 0, .05)';
                styleDisplay(helpStripenDropdown, "block");
                IsAnyStripenDropdownOpened = true;
                IsHelpStripenDropdownOpened = true;
                document.querySelector('.menuStripMask').style.display = 'block';
        } else {
                helpMenuStrip.style.backgroundColor = 'transparent';
                styleDisplay(helpStripenDropdown, "none");
                IsAnyStripenDropdownOpened = false;
                IsHelpStripenDropdownOpened = false;
                document.querySelector('.menuStripMask').style.display = 'none';
        }
}

helpMenuStrip.onmouseover = function () {
        if (IsAnyStripenDropdownOpened === true) {
                closeAllStripenDropdown();
                helpMenuStrip.style.backgroundColor = 'rgba(0, 0, 0, .05)';
                styleDisplay(helpStripenDropdown, "block");
                IsAnyStripenDropdownOpened = true;
                IsHelpStripenDropdownOpened = true;
                document.querySelector('.menuStripMask').style.display = 'block';
        }
}