$("#shuffleColors").click(function() {
    $(".color").each(function() {
        $(this).css("background-color", getColor(4, 0));
    });
});

function getColor(xd, hue) { // max: 4.8
    //x = saturation, y = value
    var divisions = 5;
    var yd = (1 / (xd - divisions)) + divisions;
    // xd += 1 / divisions;
    // yd += 1 / divisions;
    // umrechnung in werte zwischen 0 und 1
    var x = xd / divisions + ((0.04 / 4.8) * xd);
    var y = yd / divisions + ((0.04 / 4.8) * (4.8 - xd));
    console.log(x + " " + y);
    // von Wikipedia: https://en.wikipedia.org/wiki/HSL_and_HSV
    var luminance = y * (1 - x / 2);
    var saturation = 0;
    if(luminance > 0 && luminance < 1) {
        saturation = (y - luminance) / (Math.min(luminance, 1 - luminance));
    }
    // umrechnung in prozent
    saturation *= 100;
    luminance *= 100;
    // console.log(saturation + " " + luminance);
    return "hsl(" + hue + ", " + saturation + "%, " + luminance + "%)";
}

function copyToClipboard(str) {
    const element = document.createElement("textarea");
    element.value = str;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
}

$(".color").click(function() {
    copyToClipboard($(this).css("background-color"));
});
