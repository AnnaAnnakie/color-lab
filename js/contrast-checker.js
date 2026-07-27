let testContrast = document.getElementById("testContrast");
let result = document.getElementById("result");
let colors = document.querySelectorAll(".color");

testContrast.addEventListener("click", e => {
    result.innerText = "";
    console.log(colors);
    colors.forEach(color => {
        console.log(color);
        colors.forEach(color2 => {
            if (color2.value.toLowerCase() !== color.value.toLowerCase()) {
                let contrast = computeContrast(color.value, color2.value);
                console.log("contrast", contrast);
                let newDisplay = document.createElement("p");
                newDisplay.innerHTML = color.value + " " + contrast;
                newDisplay.style.color = color.value;
                newDisplay.style.backgroundColor = color2.value;
                result.appendChild(newDisplay);
            }

        })

    })
})

function computeContrast(color1, color2) {
    let l1 = computeLuminance(
        color1.slice(1, 3),
        color1.slice(3, 5),
        color1.slice(5, 7)
    );

    let l2 = computeLuminance(
        color2.slice(1, 3),
        color2.slice(3, 5),
        color2.slice(5, 7)
    );

    let lighter = Math.max(l1, l2);
    let darker = Math.min(l1, l2);

    let ratio = (lighter + 0.05) / (darker + 0.05);

    return Math.round(ratio * 100) / 100;

}

function computeLuminance(rHex, gHex, bHex) {
    let r = hexToFloat(rHex);
    let g = hexToFloat(gHex);
    let b = hexToFloat(bHex);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToFloat(hexStr) {
    let val = parseInt(hexStr, 16) / 255;

    if (val <= 0.04045) {
        return val / 12.92;
    } else {
        return Math.pow((val + 0.055) / 1.055, 2.4);
    }
}