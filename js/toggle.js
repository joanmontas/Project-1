var on_and_off = true;
function toggleButton() {
        if (on_and_off)
        {
                console.log("Its on, turn it off");
                on_and_off = false;
                document.getElementsByClassName("middleDiv")[0].style.backgroundColor = "#F7F7F7";
        } else {
                on_and_off = true;
                console.log("Its off, turn it on");
                document.getElementsByClassName("middleDiv")[0].style.backgroundColor = "#FFB22C";
        }
}