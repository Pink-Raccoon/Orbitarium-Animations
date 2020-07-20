function readCoronaData() {
    fetch('data/full_grouped.csv', { mode: 'no-cors' })
        .then(response => response.text())
        .then(data => parseToObject(data))
        .catch(error => console.log("error:" + error));
}

function parseCoronaData(data) {
    var parseOptions =
    {
        delimiter: ",",	// auto-detect
        newline: "",	// auto-detect
        header: true,
        dynamicTyping: true,
        preview: 0,
        encoding: "",
        worker: true,
        comments: false,
        step: undefined,
        complete: function(results, file) {
            console.log("Parsing complete:", results, file);
        },
        error: undefined,
        download: false,
        downloadRequestHeaders: undefined,
        downloadRequestBody: undefined,
        skipEmptyLines: false,
        chunk: undefined,
        fastMode: undefined,
        beforeFirstChunk: undefined,
        withCredentials: undefined,
        transform: undefined,
        delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
    }
    Papa.parse(data, parseOptions)
}

