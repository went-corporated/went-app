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