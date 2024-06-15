let OpenAiTextCreation = (string, initalContent) => {
    if (initalContent)
        return removeUnwantedBreak(string.replace(/\n/g, '<br>').replace(/\\n/g, '<br>').replace(/\[.*?\]/g, '').replace(/"/g, '').replace(/\\/g, '').replace('Story:', '').replace('Image:', '').replace(/\*/g, ''));
    else
        return string.replace(/\n/g, '<br>').replace(/\\n/g, '<br>').replace(/\[.*?\]/g, '').replace(/"/g, '').replace(/\\/g, '').replace('Story:', '').replace('Image:', '').replace(/\*/g, '')
}

let removeUnwantedBreak = (str) => {
    let udaptedArr = [];
    let statmentStarted = false;
    str.split('<br>').forEach(value => {
        if (value) {
            statmentStarted = true;
            if (value.toLowerCase().includes("option "))
                udaptedArr.push('<br>' + value)
            else
                udaptedArr.push(value)
        } else if (!value && statmentStarted) {
            udaptedArr.push("<br/>");
        }
    });


    return udaptedArr.join(' ');
}

export default OpenAiTextCreation;