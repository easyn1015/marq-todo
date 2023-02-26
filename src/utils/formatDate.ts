export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date); // Feb 18, 2023

    return formattedDate;
}

export function parseDate(dateString: string): Date {
    return new Date(dateString);
}
