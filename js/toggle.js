var on_and_off = true;
function toggleButton() {
        if (on_and_off)
        {
                console.log("Its on, turn it off");
                on_and_off = false;
                document.getElementsByClassName("middleDiv")[0].style.backgroundColor = "gray";
        } else {
                on_and_off = true;
                console.log("Its off, turn it on");
                document.getElementsByClassName("middleDiv")[0].style.backgroundColor = "wheat";
        }

}