export function isOutData(date, minutes) {
    return Date.now() - date > minutes * 60 * 1000;
}
