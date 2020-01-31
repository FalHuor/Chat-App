// ################################ Switch Dark / light mode ###################################

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('themeSlider').checked = false;
    } else {
        setTheme('theme-light');
      document.getElementById('themeSlider').checked = true;
    }
})();

// ################################ Switch sound mode ###################################

// function to set a given theme/color-scheme
function setSound(soundStatus) {
    localStorage.setItem('sound', soundStatus);
    //document.documentElement.className = soundStatus;
}

// function to toggle between light and dark theme
function toggleSound() {
    if (localStorage.getItem('sound') === 'on') {
        setSound('off');
    } else {
        setSound('on');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('sound') === 'on') {
        setSound('on');
        document.getElementById('soundSlider').checked = false;
    } else {
        setSound('off');
        document.getElementById('soundSlider').checked = true;
    }
})();