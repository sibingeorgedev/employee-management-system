export function calculateRetirementDate(dateOfBirth, dateOfJoining, retirementAge = 65) {
    const birthdate = new Date(dateOfBirth);
    const doj = new Date(dateOfJoining);
    
    const ageAtJoining = doj.getFullYear() - birthdate.getFullYear();
    const m = doj.getMonth() - birthdate.getMonth();
    
    if (m < 0 || (m === 0 && doj.getDate() < birthdate.getDate())) {
        ageAtJoining--;
    }

    const yearsUntilRetirement = retirementAge - ageAtJoining;
    const retirementDate = new Date(doj);
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
