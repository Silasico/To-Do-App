const toggleDark = document.querySelector(".toggle-mode")
const body = document.body
let darkMode = true
let todoArr = []
let lsList = JSON.parse(localStorage.getItem("todo"))
if (lsList) {
    todoArr = [...lsList]
}
let addBtn = document.querySelector(".add-btn")
const input = document.querySelector("#input")
const error = document.querySelector(".error")
const list = document.querySelector("ul")
const remainder = document.querySelector(".remainder")
const clear = document.querySelector(".clear")
const navMenu = document.querySelector(".nav-menu")
const navItems = document.querySelectorAll(".nav-item")
let navCheck = 0
const todoBox = document.querySelector(".todo")
let listItems = document.querySelectorAll("li")
const createBox = document.querySelector(".create")
const timeBox = document.querySelector(".time")
const footer = document.querySelector(".footer")
updateList(todoArr)

window.addEventListener("DOMContentLoaded", () => {
    for (var i = 0; i < todoArr.length; i++) {
        todoArr[i].remove = ""
    }
    updateList(todoArr)
})
toggleDark.addEventListener("click", () => {
    body.classList.toggle("light")
    if (darkMode) {
        toggleDark.innerHTML = `<i class = "fa-solid fa-moon"></i>`
        todoBox.style.backgroundColor = "#ffffff"
        todoBox.style.color = "#25273C"
        listItems.forEach(li => {
            li.classList.add("list-light")
        })
        navMenu.classList.add("light-bg")
        createBox.classList.add("light-bg")
        input.classList.add("lig")
        darkMode = false
    } else {
        toggleDark.innerHTML = `<i class = "fa-solid fa-sun"></i>`
        todoBox.style.backgroundColor = "#25273C"
        todoBox.style.color = "#ffffff"
        listItems.forEach(li => {
            li.classList.remove("list-light")
        })
        navMenu.classList.remove("light-bg")
        createBox.classList.remove("light-bg")
        input.classList.remove("lig")
        darkMode = true
    }
})


addBtn.addEventListener("click", () => {
    if (!input.value) {
        error.innerHTML = 'Please Enter a task to continue'
        error.style.display = "block"
    } else if (input.value && !timeBox.value) {
        error.innerHTML = 'Please Select Time for your activity'
        error.style.display = "block"
    } else if (new Date().getTime() > new Date(timeBox.value).getTime()) {
        error.innerHTML = 'Please Select a future time for your activiity'
        error.style.display = "block"
    } else {
        let date = new Date(timeBox.value)
        let dateContent = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
        todoArr.push({
            value: input.value,
            time: dateContent,
            check: "",
            remove: ""
        })
        error.style.display = "none"
        updateList(todoArr)
        input.value = ""
    }
        
       
    
    
})

function updateList(arr) {
    let light = ""
    if (!darkMode) {
        light = "list-light"
    }

    if (arr.length > 0) {
        let todoArrMark = arr.map(e => {
            return `
            <li class = "${light} ${e.remove}">
            <div class="details">
            <div class = "checkbox-box">
            <input type="checkbox" name="check" id="check" class = "checkbox" ${e.check} />
            <span class = "replace"></span>
            </div>
            <h3>
            ${e.value}
            </h3>
            <p>${e.time}</p>
            </div>
            <div class="del-btn">
            <i class="fa-solid fa-xmark"></i>
            </div>
            </li>
            `
        })
        todoArrMark = todoArrMark.join("")
        list.innerHTML = todoArrMark
        updateCheckBox()
        deleteItem()
        countRem()
        saveLS()
        listItems = Array.from(document.querySelectorAll("li"))

    } else {
        todoArrMark = `<h4>Add Todo List</h4>`
        list.innerHTML = todoArrMark
        countRem()
        saveLS()
    }
}

function updateCheckBox() {
    let checkboxes = Array.from(document.querySelectorAll(".checkbox"))
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("click", e => {
            let pos = checkboxes.indexOf(e.currentTarget)

            if (!todoArr[pos].check) {
                todoArr[pos].check = "checked"
            } else {
                todoArr[pos].check = ""
            }
            updateList(todoArr)
        })
    })
}

function deleteItem() {
    let delBtn = Array.from(document.querySelectorAll(".del-btn"))
    delBtn.forEach(del => {
        del.addEventListener("click",
            e => {
                let pos = delBtn.indexOf(e.currentTarget)
                todoArr.splice(pos, 1)
                //deleted()
                updateList(todoArr)
            })
    })
}

function saveLS() {
        let list = JSON.stringify(todoArr)
        localStorage.setItem("todo", list)
}

function countRem() {
    let count = 0
    for (var i = 0; i < todoArr.length; i++) {
        if (!todoArr[i].check) {
            count++
        }
    }if (todoArr.length > 0) {
        remainder.innerText = `${count} of ${todoArr.length} items remaining`
    } else {
        remainder.innerText = `No item in your TO-DO list`
    }
    
}

clear.addEventListener("click", ()=> {
    if (confirm("Are you sure you want to delete all completed tasks, this process is irreversible")) {
        delComp()
        updateList(todoArr)
    } else {
        updateList(todoArr)
    }

})
function delComp() {
    let done;
    for (var i = 0; i < todoArr.length; i++) {
        if (todoArr[i].check) {
            todoArr.splice(i, 1)
            return delComp()
        } 
        updateList(todoArr)
    }
}
navItems.forEach(navitem => {
    navitem.addEventListener("click", e => {
        navItems.forEach(i => {
            i.classList.remove("active")
        })
        e.currentTarget.classList.add("active")
        if (e.currentTarget.innerText == "All") {
            navCheck = 0
            for (var i = 0; i < todoArr.length; i++) {
                todoArr[i].remove = ""
            }
            updateList(todoArr)
        } else if (e.currentTarget.innerText == "Completed") {
            navCheck = 1
            for (var i = 0; i < todoArr.length; i++) {
                if (!todoArr[i].check) {
                    todoArr[i].remove = "remove"

                } else {
                    todoArr[i].remove = ""
                }

            }


        } else {
            navCheck = 2
            /*newArr = todoArr.filter(e => {
                return (!e.check)
            })*/
            for (var i = 0; i < todoArr.length; i++) {
                if (todoArr[i].check) {
                    todoArr[i].remove = "remove"
                } else {
                    todoArr[i].remove = ""
                }
            }

        }
        updateList(todoArr)
    })
})