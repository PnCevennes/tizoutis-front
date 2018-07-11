function minInt (ref, strict) {
    return function (value) {
        return strict ? ref < value : ref <= value
    }
}

function maxInt (ref, strict) {
    return function (value) {
        return strict ? ref > value : ref >= value
    }
}

function minLength (ref) {
    return function (value) {
        return value.length >= ref
    }
}

function maxLength (ref) {
    return function (value) {
        return value.length <= ref
    }
}

function regex (ref) {
    return function (value) {
        return !!value.match(ref)
    }
}

export default {
    minInt,
    maxInt,
    minLength,
    maxLength,
    regex
}
