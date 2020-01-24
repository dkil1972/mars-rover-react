const utils = {
    range: (min, max) => Array.from({
        length: max - min + 1
    }, (_, i) => min + i),
}

export default utils;