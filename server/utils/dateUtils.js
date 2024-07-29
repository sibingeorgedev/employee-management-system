export function calculateRetirementDate(dateOfJoining, ageAtJoining, retirementAge = 65) {
    const dateOfJoiningDate = new Date(dateOfJoining);
    const yearsUntilRetirement = retirementAge - ageAtJoining;
    const retirementDate = new Date(dateOfJoiningDate);
    retirementDate.setFullYear(retirementDate.getFullYear() + yearsUntilRetirement);
    return retirementDate;
}

export function calculateDateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

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
