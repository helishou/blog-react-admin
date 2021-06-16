export default function openWindow(url, title, w, h) {
    // Fixes dual-screen position                            Most browsers       Firefox
    const dualScreenLeft =
        // eslint-disable-next-line no-restricted-globals
        window.screenLeft !== undefined ? window.screenLeft : screen.left;
    const dualScreenTop =
        // eslint-disable-next-line no-restricted-globals
        window.screenTop !== undefined ? window.screenTop : screen.top;

    const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
            ? document.documentElement.clientWidth
            // eslint-disable-next-line no-restricted-globals
            : screen.width;
    const height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            // eslint-disable-next-line no-restricted-globals
            : screen.height;

    const left = width / 2 - w / 2 + dualScreenLeft;
    const top = height / 2 - h / 2 + dualScreenTop;
    const newWindow = window.open(
        url,
        title,
        "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" +
        w +
        ", height=" +
        h +
        ", top=" +
        top +
        ", left=" +
        left
    );

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
    return newWindow
}
