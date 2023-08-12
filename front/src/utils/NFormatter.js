export const http_build_query = (payload) => {
    var params = new URLSearchParams();
    for (var key in payload) {
        params.append(key, payload[key]);
    }
    return params.toString()
}

export const price = (string) => {
    const inputValue = string;
    const numericValue = inputValue.replace(/[^\d,.]/g, '');
    return numericValue.replace(/^(?!0\.00)[1-9]\d{0,2}(,\d{3})*(\.\d\d)?$/, (match) => {
        return new Intl.NumberFormat('en-US').format(parseFloat(match.replace(/,/g, '')));
    });
}