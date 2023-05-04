console.log("It's me it's me oh Lord!")

var templateOutput = document.getElementById("template-output")
var oddEvenNum = document.getElementById("odd-even-data")
function oddEvenCheck(num) {
    this.num = num
    var test = num % 2
    return test
}

oddEvenNum.onblur = function(checkNum) {
    checkNum = Number(oddEvenNum.value)
    var numResult = oddEvenCheck(checkNum)
    if (numResult != 0) {
        alert(checkNum + " is an odd number")
    } else {
        alert(checkNum + " is an even number")
    }
}

//SAME DIFFERENT APP
const thingName = document.getElementById("sd-name")
const thingSize = document.getElementById("sd-size")
const thingLenWid = document.getElementById("sd-len-wid")
const sameDiffTable = document.getElementById("same-diff-table")
const sdTableContent = sameDiffTable.getElementsByTagName("tbody")[0]
const sdPrintTContent = sameDiffTable.getElementsByTagName("tbody")[1]
const sameDiffTitle = document.getElementById("same-diff-title")
const sdAddTitle = document.getElementById("add-title")
const sameDiffTotal = document.getElementById("same-diff-total")
const sdSizeTable = document.getElementById("sd-size-table")
const sdSizeContent = sdSizeTable.getElementsByTagName("tbody")[0]
const sdSaveBtn = document.getElementById("sd-save-btn")

//Global Definitions
let person, size, lenWid, sdTotal, sdSubtotal, atNum

//Table Add Row/Cell Definitions
let sdListRow, sdDiffColumn1, sdDiffColumn2, sdDiffColumn3, sdDiffColumn4, sdDiffColumn5, rowInd, rowNum, szt, szsub
const sameDiffList = {
    rName: [],
    rSize: [],
    rLenWid: []
}

let sizeCount = {
    lw: [],
    sz: []
}

let sdCounted = []




//GLOBAL FUNCTIONS
//Recipient Table
function addSDRow(findTable) {
    sdListRow = findTable.insertRow()
    sdDiffColumn1 = sdListRow.insertCell(0)
    sdDiffColumn2 = sdListRow.insertCell(1)
    sdDiffColumn3 = sdListRow.insertCell(2)
    sdDiffColumn4 = sdListRow.insertCell(3)
    sdDiffColumn5 = sdListRow.insertCell(4)

    let sdEditBtn, sdDeleteBtn
    sdEditBtn = document.createElement("button")
    sdDeleteBtn = document.createElement("button")

    sdEditBtn.setAttribute("class", "btn edit-entry-btn")
    sdEditBtn.setAttribute("title", "edit entry")
    sdEditBtn.setAttribute("aria-label", "edit entry")
    sdEditBtn.setAttribute("onclick", "editDeleteEntry(this)")
    sdEditBtn.innerHTML = '&#9997;&#127996;'
    sdDiffColumn4.appendChild(sdEditBtn)

    sdDeleteBtn.setAttribute("class", "btn delete-entry-btn")
    sdDeleteBtn.setAttribute("title", "delete entry")
    sdDeleteBtn.setAttribute("aria-label", "delete entry")
    sdDeleteBtn.setAttribute("onclick", "editDeleteEntry(this)")
    sdDeleteBtn.innerHTML = '&#10060;'
    sdDiffColumn5.appendChild(sdDeleteBtn)
}

//Size Table Functions
 function addSDSizeRow() {
    sdListRow = sdSizeContent.insertRow()
    sdDiffColumn1 = sdListRow.insertCell(0)
    sdDiffColumn2 = sdListRow.insertCell(1)
}

function sdLenWidContent(lwc) {
    sdDiffColumn1.innerHTML = "<strong>" + lwc + "</strong>"
    sdDiffColumn2.innerHTML = "<strong>" + 1 + "</strong>"
}

function sdSubContent(szc) {
    sdDiffColumn1.innerHTML = " &nbsp;&nbsp;" + szc
    sdDiffColumn2.innerText = 1
}

function findCategoryRow(findCategory) {
    for (let j = 0; j < sdSizeContent.rows.length; j++) {
        if (sdSizeContent.rows[j].cells[0].innerText == findCategory) {
            rowNum = j
        }
    }
}

function saveOrUpdate() {
    if (localStorage.getItem("savedNames") == null) {
        sdSaveBtn.innerText = "Save Data"
        sdSaveBtn.setAttribute("title", "Your data will be stored as long as you don't clear the cache.")
        sdSaveBtn.setAttribute("aria-label", "Your data will be stored as long as you don't clear the cache.")
    } else {
        sdSaveBtn.innerText = "Update Data"
        sdSaveBtn.setAttribute("title", "Your data will be updated and stored as long as you don't clear the cache.")
        sdSaveBtn.setAttribute("aria-label", "Your data will be updated and stored as long as you don't clear the cache.")
    }
}


//Count Function
function sdCount(findLW, findSZ) {
    for (let k = 0; k < sameDiffList.rLenWid.length; k++) {
        if (sameDiffList.rLenWid[k] == findLW) {
            sdCounted.push(sameDiffList.rLenWid[k])
            sdTotal = sdCounted.length
        }        
    }

    sdCounted = []

    for (let l = 0; l < sameDiffList.rLenWid.length; l++) {
        if (sameDiffList.rLenWid[l] == findLW && sameDiffList.rSize[l] == findSZ) {
            sdCounted.push(sameDiffList.rSize[l])
            sdSubtotal = sdCounted.length
        }
    }

    sdCounted = []
}

function calcSizeTable(lenWid, size) {
    sdCount(lenWid, size)
    findCategoryRow(lenWid)
    szt = rowNum
    szsub = sizeCount.sz[atNum].indexOf(size) + 1

    if (sdTotal == 0) {
        sdSizeContent.deleteRow(szsub)
        sdSizeContent.deleteRow(szt)
        sizeCount.sz[atNum].splice(szsub - 1, 1)
        sizeCount.lw[atNum].splice(szt)
    } else if (sdSubtotal == 0) {
        sdSizeContent.deleteRow(szsub)
        sdSizeContent.rows[szt].cells[1].innerHTML = "<strong>" + sdTotal + "</strong>"
    } else {
        sdSizeContent.rows[szt].cells[1].innerHTML = "<strong>" + sdTotal + "</strong>"
        sdSizeContent.rows[szsub].cells[1].innerText = sdSubtotal
    }
    
}

//EDIT SAME DIFFERENT TITLE
function editSDTitle() {
    if (localStorage.getItem("savedTitle") == null) {
        localStorage.setItem("savedTitle", "Give Your Thing A Title")
    }
  
    sameDiffTitle.style.display = "none"
    sdAddTitle.value = sameDiffTitle.innerText
    sdAddTitle.style.display = "block"
    sdAddTitle.focus()
    sdAddTitle.select()

    sdAddTitle.onblur = function () {
        sameDiffTitle.style.display = "block"
        sameDiffTitle.innerText = sdAddTitle.value
        sdAddTitle.value = ""
        sdAddTitle.style.display = "none"
        localStorage.savedTitle = sameDiffTitle.innerText;
    }
}



//ADD RECECIENT/BUILD TABLES
function sdAddRecipient() {    
    //check for inputs for dupes/null values
    if (sameDiffList.rName.includes(thingName.value)) {
        alert(thingName.value + " is already on the list. No duplicates allowed. Please update this entry.")
        thingName.focus()
        thingName.select()
    } else if (thingName.value == "" && thingSize.value == "") {
        alert("You have to enter a name and size to add this recipient to the list.")
        thingName.focus()
    } else if (thingName.value == "") {
        alert("You have to enter a name to add this recipient to the list.")
        thingName.focus()
    } else if (thingSize.value == "") {
        alert("You have to enter a size to add this recipient to the list.")
        thingSize.focus()
    } else {
        person = thingName.value
        size = thingSize.value

        if (thingLenWid.value == "") {
            lenWid = "Regular"
        } else {
            lenWid = thingLenWid.value
        }
        
        //Build Recipient Table
        addSDRow(sdTableContent)
        sdDiffColumn1.innerText = person
        sdDiffColumn2.innerText = size
        sdDiffColumn3.innerText = lenWid
        sameDiffList.rName.push(person)
        sameDiffList.rSize.push(size)
        sameDiffList.rLenWid.push(lenWid)

        //Build sizeCount Array and Size Table       
        if(sizeCount.lw.length == 0) {
            sizeCount.lw.push(lenWid)
            sizeCount.sz.push([size])
            //build size table
            addSDSizeRow()
            sdLenWidContent(lenWid)
            addSDSizeRow()
            sdSubContent(size)
        } else {
            if (sizeCount.lw.includes(lenWid) == false) {
                sizeCount.lw.push(lenWid)
                sizeCount.sz.push([size])
                //build size table
                addSDSizeRow()
                sdLenWidContent(lenWid)
                addSDSizeRow()
                sdSubContent(size)
            } else {
                atNum = sizeCount.lw.indexOf(lenWid)
                if (sizeCount.sz[atNum].includes(size) == false) {
                    sizeCount.sz[atNum].push(size)
                    console.log("You need to add row to category " + lenWid)
                    findCategoryRow(lenWid)
                    console.log("Category row index = " + rowNum)
                    szt = rowNum
                    szsub = sizeCount.sz[atNum].length
                    console.log("SubRow index is " + szsub)
                    sdListRow = sdSizeContent.insertRow(szt + szsub)
                    sdDiffColumn1 = sdListRow.insertCell(0)
                    sdDiffColumn2 = sdListRow.insertCell(1)
                    sdSubContent(size)
                    sdCount(lenWid, size)
                    sdSizeContent.rows[szt].cells[1].innerHTML = "<strong>" + sdTotal + "</strong>"
                } else {
                    sdCount(lenWid, size)
                    findCategoryRow(lenWid)
                    szt = rowNum
                    szsub = sizeCount.sz[atNum].indexOf(size) + 1
                    sdSizeContent.rows[szt].cells[1].innerHTML = "<strong>" + sdTotal + "</strong>"
                    sdSizeContent.rows[szsub].cells[1].innerText = sdSubtotal
                }
            }

        }

        sameDiffTotal.innerHTML = "<strong>" + sameDiffList.rName.length + "</strong>"
        thingName.value = ""
        thingSize.value = ""
        thingLenWid.value = ""
        thingName.focus()
    }
}
/* function sdAddRecipient(person,size,lenWid) {
    //check for inputs for dupes/null values
    if (sameDiffList.rName.includes(thingName.value)) {
        alert(thingName.value + " is already on the list. No duplicates allowed. Please update this entry.")
        thingName.focus()
        thingName.select()
    } else if (thingName.value == "" && thingSize.value == "") {
        alert("You have to enter a name and size to add this recipient to the list.")
        thingName.focus()
    } else if (thingName.value == "") {
        alert("You have to enter a name to add this recipient to the list.")
        thingName.focus()
    } else if (thingSize.value == "") {
        alert("You have to enter a size to add this recipient to the list.")
        thingSize.focus()
    } else {
    //Build List
        person = thingName.value
        sameDiffList.rName.push(person)
        size = thingSize.value
        sameDiffList.rSize.push(size)
        if (thingLenWid.value == "") {
            lenWid = "Regular"
        } else {
            lenWid = thingLenWid.value
        }
        sameDiffList.rLenWid.push(lenWid)
        sameDiffList.innerHTML = sameDiffList.rName.length

        //build list table
        addSDRow(sdTableContent)
        sdDiffColumn1.innerText = person
        sdDiffColumn2.innerText = size
        sdDiffColumn3.innerText = lenWid
        sameDiffTotal.innerHTML = "<strong>" + sameDiffList.rName.length + "</strong>"

        //build count array and size table
        if (sizeCount.lw.includes(lenWid) == false) {
            sizeCount.lw.push(lenWid)
            sizeCount.sz.push([size])
            addSDSizeRow()
            sdLenWidContent(lenWid)
            sdListRow.setAttribute("class", "size-heading")
            addSDSizeRow()
            sdSubContent(size)
        } else  {
            atNum = sizeCount.lw.indexOf(lenWid)
            findCategoryRow(lenWid)

            if (sizeCount.sz[atNum].includes(size) == false) {
                if (sizeCount.sz[atNum].length == 1) {
                    sizeCount.sz[atNum] += ("," + newSZ)
                    sizeCount.sz[atNum].split(",")
                } else {
                    sizeCount.sz[atNum].push(size)
                }

                
                sizeRow = sizeCount.sz[atNum].length

                findCategoryRow(lenWid)
                sdListRow = sdSizeContent.insertRow(rowNum + sizeRow)
                sdDiffColumn1 = sdListRow.insertCell(0)
                sdDiffColumn2 = sdListRow.insertCell(1)
                sdSubContent(size)
                sdCount(lenWid, size)

                sdSizeContent.rows[rowNum].cells[1].innerHTML = "<strong>" + sdTotal + "</strong>"
            } else {
                sizeRow = sizeCount.sz[atNum].indexOf(size) + 1
                findCategoryRow(lenWid)
                sdCount(lenWid, size)
                sdSizeContent.rows[rowNum].cells[1].innerHTML = "<strong>" + sdTotal + "</strong>"
                
                sdSizeContent.rows[rowNum + sizeRow].cells[1].innerHTML = sdSubtotal
            }
        }
    }

    thingName.value = ""
    thingSize.value = ""
    thingLenWid.value = ""
    thingName.focus()
}

*/



//DATA STORAGE

function saveSDData() {
    if (localStorage.getItem("savedNames") == null) {
        localStorage.setItem("savedNames", sameDiffList.rName.join(","))
        localStorage.setItem("savedLenWids", sameDiffList.rLenWid.join(","))
        localStorage.setItem("savedSizes", sameDiffList.rSize.join(","))
        localStorage.setItem("savedTitle", sameDiffTitle.innerText)
    } else {
        localStorage.savedNames = sameDiffList.rName.join(",")
        localStorage.savedLenWids = sameDiffList.rLenWid.join(",")
        localStorage.savedSizes = sameDiffList.rSize.join(",")
        sameDiffTitle.innerText = localStorage.savedTitle
    }
    
    if (sdSaveBtn.innerText == "Save Data") {
        alert("Your data has been saved.")
    } else {
        alert("Your data has been updated.")
    }
    saveOrUpdate()
}

window.onload = function() {
    if ((localStorage.getItem("savedNames") !== null)) {
        if (confirm("You have data stored. Would you like to use it?\nClick \"OK\" to populate the lists with your saved data.\nClick \"Cancel\" to remove ALL stored data and start a new list.") == true) {
            sameDiffList.rName = localStorage.getItem("savedNames").split(",")
            sameDiffList.rSize = localStorage.getItem("savedSizes").split(",")
            sameDiffList.rLenWid = localStorage.getItem("savedLenWids").split(",")
            sameDiffTitle.innerText = localStorage.getItem("savedTitle")

            for (let i = 0; i < sameDiffList.rName.length; i++) {
                //Build List Table
                addSDRow(sdTableContent)
                sdDiffColumn1.innerText = sameDiffList.rName[i]
                sdDiffColumn2.innerText = sameDiffList.rSize[i]
                sdDiffColumn3.innerText = sameDiffList.rLenWid[i]
                sameDiffTotal.innerHTML = "<strong>" + sameDiffList.rName.length + "</strong>"
                

                //Build sizeCount Array
                if (sizeCount.lw.includes(sameDiffList.rLenWid[i]) == false) {
                    sizeCount.lw.push(sameDiffList.rLenWid[i]) 
                    sizeCount.sz.push([sameDiffList.rSize[i]])
                } else {
                    atNum = sizeCount.lw.indexOf(sameDiffList.rLenWid[i])
                    if (sizeCount.sz[atNum].includes(sameDiffList.rSize[i]) == false) {
                        sizeCount.sz[atNum].push(sameDiffList.rSize[i])
                    }
                }

                for (let g = 0; g < sizeCount.sz.length; g++) {
                    if (sizeCount.sz[g].includes(",")) {
                        sizeCount.sz[g] = sizeCount.sz[g].split(",")
                    }

                    
                }                
            }

            //Build sdSizeContent Table
            for (let x = 0; x < sizeCount.lw.length; x++) {
                addSDSizeRow()
                sdDiffColumn1.innerHTML = "<strong>" + sizeCount.lw[x] + "</strong>"
                sdCount(sizeCount.lw[x], sizeCount.sz[x][0])
                sdDiffColumn2.innerHTML = "<strong>" + sdTotal + "</strong>"


                for (let y = 0; y < sizeCount.sz[x].length; y++) {
                    if (sizeCount.sz[x].length > 1) {
                        addSDSizeRow()
                        sdDiffColumn1.innerHTML = " &nbsp;&nbsp;" + sizeCount.sz[x][y]
                        sdCount(sizeCount.lw[x], sizeCount.sz[x][y])
                        sdDiffColumn2.innerText = sdSubtotal
                    } else {
                        addSDSizeRow()
                        sdDiffColumn1.innerHTML = " &nbsp;&nbsp;" + sizeCount.sz[x]
                        sdCount(sizeCount.lw[x], sizeCount.sz[x])
                        sdDiffColumn2.innerText = sdSubtotal

                    }
                    
                }
            }
        } else {
            localStorage.removeItem("savedNames")
            localStorage.removeItem("savedSizes")
            localStorage.removeItem("savedLenWids")
            localStorage.removeItem("savedLenWid")
            localStorage.removeItem("savedTitle")
            alert("Your stored date has been cleared. You can start a new list.")
            sameDiffTitle.innerText = "Give Your Thing A Title"
        }
    }

    saveOrUpdate()
}


//EDIT/DELETE ENTRIES

const editEntryBtn = document.getElementsByClassName("edit-entry-btn")
const deleteEntryBtn = document.getElementsByClassName("delete-entry-btn")

function editDeleteEntry(element, newLW, newSZ, editColumn1, editColumn2, editColumn3) {
    person = element.parentElement.parentElement.getElementsByTagName("td")[0].innerText
    rowInd = sameDiffList.rName.indexOf(person)
    size = sameDiffList.rSize[rowInd]
    lenWid = sameDiffList.rLenWid[rowInd]
    

    console.log(rowInd, person, size, lenWid)
    console.log(rowInd, newLW, newSZ)


    if (element.classList.contains("edit-entry-btn")) {
        alert("You want to edit this entry.")
        
        editColumn1 = element.parentElement.parentElement.getElementsByTagName("td")[0]
        editColumn2 = element.parentElement.parentElement.getElementsByTagName("td")[1]
        editColumn3 = element.parentElement.parentElement.getElementsByTagName("td")[2]  

        editColumn1.contentEditable = true
        editColumn2.contentEditable = true
        editColumn3.contentEditable = true
        editColumn1.focus()

        editColumn3.onblur = function() {
            editColumn1.contentEditable = false
            editColumn2.contentEditable = false
            editColumn3.contentEditable = false
            newSZ = editColumn2.innerText
            newLW = editColumn3.innerText
            thingName.focus()
            console.log(newLW, newSZ, lenWid, size)

            if (newLW !== lenWid) {
                console.log(newLW + " does not match old " + lenWid)
                sameDiffList.rSize[rowInd] = newSZ
                sameDiffList.rLenWid[rowInd] = newLW
                    
                if (sizeCount.lw.includes(newLW) == false) {
                    
                    sizeCount.lw.push(newLW)
                    sizeCount.sz.push([newSZ])

                    //add rows to size table
                    addSDSizeRow()
                    sdLenWidContent(newLW)
                    addSDSizeRow()
                    sdSubContent(newSZ)

                    
                    findCategoryRow(lenWid)
                    sdCount(lenWid, size)
                    atNum = sizeCount.lw.indexOf(lenWid)
                    szt = rowNum
                    szsub = sizeCount.sz[atNum].indexOf(size) + 1
                    sdSizeContent.rows[szt].cells[1].innerHTML = "<strong>" + sdTotal + "</strong>"
                    sdSizeContent.rows[szsub].cells[1].innerText = sdSubtotal
                    
                } else {
                    atNum = sizeCount.lw.indexOf(newLW)
                    
                    if (sizeCount.sz[atNum].includes(newSZ) == false) {
                        sizeCount.sz[atNum].push(newSZ)                        
                        
                        console.log("You need to add row to category " + newLW)
                        findCategoryRow(newLW)
                        console.log("Category row index = " + rowNum)
                        szt = rowNum
                        szsub = sizeCount.sz[atNum].length
                        console.log("SubRow index is " + szsub)
                        sdListRow = sdSizeContent.insertRow(szt + szsub)
                        sdDiffColumn1 = sdListRow.insertCell(0)
                        sdDiffColumn2 = sdListRow.insertCell(1)
                        

                        calcSizeTable(lenWid, size)
                    } else {
                        calcSizeTable(newLW, newSZ)
                    }
                }
            } else {
                atNum = sizeCount.lw.indexOf(newLW)               
                if (sizeCount.sz[atNum].includes(newSZ) == false) {
                    sizeCount.sz[atNum].push(newSZ)
                    sameDiffList.rSize[rowInd] = newSZ
                    console.log("You need to add row to category " + newLW)
                    findCategoryRow(newLW)
                    console.log("Category row index = " + rowNum)
                    szt = rowNum
                    szsub = sizeCount.sz[atNum].length
                    console.log("SubRow index is " + szsub)
                    sdListRow = sdSizeContent.insertRow(szt + szsub)
                    sdDiffColumn1 = sdListRow.insertCell(0)
                    sdDiffColumn2 = sdListRow.insertCell(1)
                    sdSubContent(newSZ)
                    sdCount(lenWid, size)
                    sdSizeContent.rows[szt].cells[1].innerHTML = "<strong>" + sdTotal + "</strong>"
                } else {
                    calcSizeTable(newLW, newSZ)
                }
            }

            if (person != editColumn1.innerText) {
                sameDiffList.rName[rowInd] = editColumn1.innerText
            }
        }

        
        
    }

    if (element.classList.contains("delete-entry-btn")) {
        if (confirm("Deleting this entry cannot be undone. Do you want to delete this entry?") == true) {
            alert("This entry has been deleted.")
        } else {
            return
        }
    }
}

//PRINT DATA
let printHeader, printHeaderRow, printLabel4, printLabel5
printHeader = sameDiffTable.getElementsByTagName("thead")[0]
printHeaderRow = printHeader.getElementsByTagName("tr")[0]
printLabel4 = printHeaderRow.getElementsByTagName("th")[3]
printLabel5 = printHeaderRow.getElementsByTagName("th")[4]


function sdPrintReset() {
    sdPrintTContent.classList.add("print")
    sdTableContent.style.display = "block"
    printLabel4.innerText = "Edit"
    printLabel5.innerText = "Delete"
}
function sdPrint() {
    if (sdPrintTContent.rows.length > 0) {
        sdPrintTContent.innerHTML = ""
    }
    sdPrintTContent.classList.remove("print")
    sdTableContent.style.display = "none"
    printLabel4.innerText = "New Size"
    printLabel5.innerText = "New Length/Width"
    
    for (let p = 0; p < sameDiffList.rName.length; p++) {
        sdListRow = sdPrintTContent.insertRow()
        sdDiffColumn1 = sdListRow.insertCell(0)
        sdDiffColumn2 = sdListRow.insertCell(1)
        sdDiffColumn3 = sdListRow.insertCell(2)
        sdDiffColumn4 = sdListRow.insertCell(3)
        sdDiffColumn5 = sdListRow.insertCell(4)

        sdDiffColumn1.innerText = sameDiffList.rName[p]
        sdDiffColumn2.innerText = sameDiffList.rSize[p]
        sdDiffColumn3.innerText = sameDiffList.rLenWid[p]
        sdDiffColumn4.innerText = ""
        sdDiffColumn5.innerText = ""
    }
    sameDiffTotal.innerHTML = "<strong>" + sameDiffList.rName.length + "</strong>"
    window.print()
    sdPrintReset()
}