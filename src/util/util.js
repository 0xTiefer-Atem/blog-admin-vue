function formatDate(value) {
    let date = new Date(value);
    let year = date.getFullYear();
    let month = padDate(date.getMonth() + 1);
    let day = padDate(date.getDate());
    let hours = padDate(date.getHours());
    let minutes = padDate(date.getMinutes());
    let seconds = padDate(date.getSeconds());
    return year + '-' + month + "-" + day + "  " + hours + ":" + minutes + ":" + seconds
}