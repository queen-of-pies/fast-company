export function calculateCommentTime(createdAt) {
    const commentCreatedTimeMs = Date.parse(createdAt);
    const time = Date.now() - commentCreatedTimeMs;
    const date = new Date(+createdAt);
    const months = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря"
    ];
    let timeStr = "";
    if (time <= 1000 * 60) {
        timeStr = "1 минуту назад";
    } else if (time > 1000 * 60 && time <= 1000 * 60 * 5) {
        timeStr = "5 минут назад";
    } else if (time > 1000 * 60 * 5 && time <= 1000 * 60 * 10) {
        timeStr = "10 минут назад";
    } else if (time > 1000 * 60 * 10 && time <= 1000 * 60 * 30) {
        timeStr = "30 минут назад";
    } else if (time > 1000 * 60 * 30 && time <= 1000 * 60 * 60 * 24) {
        timeStr = `${date.getHours()}:${date.getMinutes()}`;
    } else if (
        time > 1000 * 60 * 60 * 24 &&
        time <= 1000 * 60 * 60 * 24 * 365
    ) {
        timeStr = `${date.getDate()} ${months[date.getMonth()]}`;
    } else {
        timeStr = `${date.getDate()} ${
            months[date.getMonth()]
        } ${date.getFullYear()}`;
    }
    return timeStr;
}
