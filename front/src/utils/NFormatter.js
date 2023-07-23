export const http_build_query = (payload) => {
    var params = new URLSearchParams();
    for (var key in payload) {
        params.append(key, payload[key]);
    }
    return params.toString()
}