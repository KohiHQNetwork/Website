var darkMode = localStorage.getItem('kohihq-dark-mode');
if (darkMode && darkMode == "true") {
    var root = document.getElementsByTagName('html')[0];
    root.className += ' dark-mode';
}