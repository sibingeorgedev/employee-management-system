export function calculateRetirementDate(dateOfBirth, retirementAge = 65) {
    let birthdate = new Date(dateOfBirth);
    let retirementDate = new Date(birthdate);
    retirementDate.setFullYear(retirementDate.getFullYear() + retirementAge);
    return retirementDate;
}

export function calculateDateDifference(today, retirementDate) {
    let start = new Date(today);
    let end = new Date(retirementDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
        months -= 1;
        days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return { years, months, days };
}
