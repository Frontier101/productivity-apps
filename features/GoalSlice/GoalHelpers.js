export const TimeLeft = (deadline) => {
    const now = new Date();
    const date = new Date(deadline)
    const day = 1000 * 60 * 60 * 24;

    return Math.floor((date - now) / day);
}

export const DeadlinePeriod = (deadline) => {
    const date = new Date(deadline);
    const now = new Date();

    if(date < now ) return 'overdue';

    const monthDiff = date.getMonth() - now.getMonth();
    const yearDiff = date.getFullYear() - now.getFullYear();

    if(yearDiff === 0){
        if(monthDiff === 0) return 'This Month';
        if(monthDiff === 1) return 'Next Month';
        if(monthDiff <= 3) return 'Next 3 Months';

        return 'This Year';
    }
    if(yearDiff === 1) return 'Next Year';
    if(yearDiff <= 5) return 'Next 5 years';

    return 'This Decade';
}

export const getSorts = (list) => {
    const deadlines = [
        'This Month','Next Month',
        'Next 3 Months','This Year',
        'Next Year','Next 5 years',
        'This Decade'
    ];
    let sorted = {};
    deadlines.forEach(deadline => {
        const filter = list.filter(item=>(
            DeadlinePeriod(item.deadline) === deadline &&
            item.totalSteps > item.completedSteps
        ));
        if(filter.length) sorted[deadline] = filter;
    });

    return sorted;
}