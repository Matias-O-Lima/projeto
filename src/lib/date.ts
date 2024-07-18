function formatTime(minutes: number) {
    const totalSeconds = Math.round(minutes * 60);  // Arredonda os segundos
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    let formattedTime = '';
    if (hours > 0) {
        formattedTime += `${hours.toString().padStart(2, '0')}:`;
    }
    formattedTime += `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return formattedTime;
}

export { formatTime };
