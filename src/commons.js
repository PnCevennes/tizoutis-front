const formatTelephone = function (value) {
    if (!value || value.length !== 10) {
        return value
    }
    var out = []
    for (var i = 0; i <= value.length; i += 2) {
        out.push(value.slice(i, i + 2))
    }
    return out.join(' ')
}

export {formatTelephone}
