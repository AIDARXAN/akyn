
export const getDayOfWeak = date => {
    const dayIfWeek = date.getDay();

    if (dayIfWeek === 0) return 6;

    return dayIfWeek - 1;
};
