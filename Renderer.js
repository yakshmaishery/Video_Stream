const {spawn} = require("child_process");
const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    let childprocess;

    // Close Button
    document.getElementById("close_btn").addEventListener("click", () => {
        ipcRenderer.send("close_action")
    })

    // Minimize Button
    document.getElementById("min_btn").addEventListener("click", () => {
        ipcRenderer.send("min_action")
    })

    // Maximize Button
    document.getElementById("max_btn").addEventListener("click", () => {
        ipcRenderer.send("max_action")
    })

    ipcRenderer.on("max_reply", (arr,e) => {
        if(arr.data == true){
            document.getElementById("max_btn").innerHTML = "◻"
        }
        else{
            document.getElementById("max_btn").innerHTML = "❐"
        }
    })

    // Start Stream
    document.getElementById("startbtn").addEventListener("click", () => {
        let data = document.getElementById("txt").value;
        if(data != ""){
            childprocess = spawn("python",["main.py",data])
            let elem = document.getElementById("canvas"); // The Canvas

            // Getting the Data from python
            childprocess.stdout.on("data",(data) => {
                let new_data = JSON.parse(data)
                elem.src = "data:image/jpeg;base64," + new_data['x']
                elem.style.display = "block"
            })
        }
        else{
            ipcRenderer.send("no_url")
        }
    })
    
    // Stop Stream
    document.getElementById("stopbtn").addEventListener("click", () => {
        childprocess.kill()
        document.getElementById("canvas").src = ""
        document.getElementById("canvas").style.display = "none"
    })
})