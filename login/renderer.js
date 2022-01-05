if (localStorage.getItem('rememberChoices') === 'denied') {
    document.querySelector('.remember-choices-checkbox-container>span>svg>path').style.fill = 'rgba(70, 130, 240, .25)';
} else {
    localStorage.setItem('rememberChoices', 'grantied');
}

const avatar = document.getElementById('avatar');
let uploadedAvatar;

avatar.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadedAvatar = reader.result;
        document.querySelector('.avatar-screen').style.display = 'block';
        document.querySelector('.avatar-screen').style.background = `url(${reader.result})`;
        localStorage.setItem('avatarUrl', reader.result);
        console.log(localStorage.getItem('avatarUrl'));
    })
    reader.readAsDataURL(this.files[0]);
})

function rememberChoicesChange(checkbox) {
    if (checkbox.checked) {
        localStorage.setItem('rememberChoices', 'grantied');
        document.querySelector('.remember-choices-checkbox-container>span>svg>path').style.fill = 'rgb(70, 130, 240)';
    } else {
        localStorage.setItem('rememberChoices', 'denied');
        document.querySelector('.remember-choices-checkbox-container>span>svg>path').style.fill = 'rgba(70, 130, 240, .25)';
    }
}

if (localStorage.getItem('rememberChoices') === 'grantied') {
    document.getElementById('username').value = localStorage.getItem('usernameRemembered');
    document.querySelector('.avatar-screen').style.display = 'flex';
    document.querySelector('.avatar-screen').style.background = `url(${localStorage.getItem('avatarUrlRemembered')})`;
}