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
const sameDiffTitle = document.getElementById("same-diff-title")
const sdAddTitle = document.getElementById("add-title")
const sameDiffTotal = document.getElementById("same-diff-total")
const sdSizeTable = document.getElementById("sd-size-table")
const sdSizeContent = sdSizeTable.getElementsByTagName("tbody")[0]

//Table Add Row/Cell Definitions
let sdListRow, sdDiffColumn1, sdDiffColumn2, sdDiffColumn3, sdDiffColumn4, sdDiffColumn5, rowNum, sizeRow, sdTotal, sdSubtotal, atNum
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

//Stored Data Definitions/Function
let namesList, lwlist, szlist

function updateSavedLists() {
    namesList = localStorage.getItem("savedNames")
    lwlist = localStorage.getItem("savedLenWid")
    szlist = localStorage.getItem("savedSizes")
}

//GLOBAL FUNCTIONS
function addSDRow() {
    sdListRow = sdTableContent.insertRow()
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

function addSDSizeRow() {
    sdListRow = sdSizeContent.insertRow()
    sdDiffColumn1 = sdListRow.insertCell(0)
    sdDiffColumn2 = sdListRow.insertCell(1)
}

function findCategoryRow(findCategory) {
    for (let j = 0; j < sdSizeContent.rows.length; j++) {
        if (sdSizeContent.rows[j].cells[0].innerText == findCategory) {
            rowNum = j
        }
    }
}

function sdCount(findLW, findSZ) {
    for (let k = 0; k < sameDiffList.rLenWid.length; k++) {
        if (sameDiffList.rLenWid[k] == findLW) {
            sdCounted.push(sameDiffList.rLenWid)
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

//EDIT SAME DIFFERENT TITLE
function editSDTitle() {
    if (localStorage.includes("savedTitle") == false) {
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

//ADD RECECIENT, CALCULATE NUMBERS
function sdAddRecipient(person,size,lenWid) {
    //check for empty inputs
    if (thingName.value == "" && thingSize.value == "") {
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
    }

    //build list table
    addSDRow()
    sdDiffColumn1.innerText = person
    sdDiffColumn2.innerText = size
    sdDiffColumn3.innerText = lenWid
    sameDiffTotal.innerHTML = sameDiffList.rName.length

    //build size table
    if (sizeCount.lw.length == 0) {
        sizeCount.lw.push(lenWid)
        sizeCount.sz.push(size)
        alert("Add first size table rows here.")
        addSDSizeRow()
        sdDiffColumn1.innerHTML = "<strong>" + lenWid + "</strong>"
        sdDiffColumn2.innerHTML = "<strong>" + 1 + "</strong>"

        addSDSizeRow()
        sdDiffColumn1.innerHTML = " &nbsp;&nbsp" + size
        sdDiffColumn2.innerHTML = 1
    } else if (sizeCount.lw.includes(lenWid) == true) {
        atNum = sizeCount.lw.indexOf(lenWid)
        
        if (sizeCount.sz[atNum].includes(size) == true) {
            alert("Add 1 to " + lenWid + " and 1 to " + size + ".")
            findCategoryRow(lenWid)
            sdCount(lenWid, size)

            sdSizeContent.rows[rowNum].cells[1].innerHTML = "<strong>" + sdTotal + "</strong>"
            sizeRow = sizeCount.sz[atNum].indexOf(size) + 1
            sdSizeContent.rows[rowNum + sizeRow].cells[1].innerHTML = sdSubtotal
            
        } else {
            alert(size + " is not at " + lenWid + " index of " + atNum + ". Adding it to " + lenWid + ".")
            sizeCount.sz[atNum] += size
            findCategoryRow(lenWid)
            sdCount(lenWid,size)

            if (sdSizeContent.rows.length < (rowNum + sizeCount.sz[atNum].length)) {
                sdListRow = sdSizeContent.insertRow()
            } else {
                sdListRow = sdSizeContent.insertRow(rowNum + sizeCount.sz[atNum].length)
            }
            
            sdDiffColumn1 = sdListRow.insertCell(0)
            sdDiffColumn2 = sdListRow.insertCell(1)
            sdDiffColumn1.innerHTML = " &nbsp;&nbsp" + size
            sdDiffColumn2.innerHTML = 1

            sdCount(lenWid, size)
            sdSizeContent.rows[rowNum].cells[1].innerHTML = "<strong>" + sdTotal + "</strong>"


        } 
    } else if (sizeCount.lw.includes(lenWid) == false) {
        sizeCount.lw.push(lenWid)
        sizeCount.sz.push(size)
        alert("Adding a new size category and row for " + lenWid + " - " + size + ".")
        addSDSizeRow()
        sdDiffColumn1.innerHTML = "<strong>" + lenWid + "</strong>"
        sdDiffColumn2.innerHTML = "<strong>" + 1 + "</strong>"

        addSDSizeRow()
        sdDiffColumn1.innerHTML = " &nbsp;&nbsp" + size
        sdDiffColumn2.innerHTML = 1
    }
    thingName.value = ""
    thingSize.value = ""
    thingLenWid.value = ""
    thingName.focus()
}

//DATA STORAGE
function saveSDData() {
    if (localStorage.getItem("savedNames") == null) {
        localStorage.setItem("savedNames", sameDiffList.rName.join(","))
        localStorage.setItem("savedLenWid", sameDiffList.rLenWid.join(","))
        localStorage.setItem("savedSizes", sameDiffList.rSize.join(","))
        updateSavedLists()
    } else {
        localStorage.savedNames = sameDiffList.rName.join(",")
        localStorage.savedLenWid = sameDiffList.rLenWid.join(",")
        localStorage.savedSizes = sameDiffList.rSize.join(",")
        updateSavedLists()
    }
}

//EDIT/DELETE ENTRIES
const editEntryBtn = document.getElementsByClassName("edit-entry-btn")
const deleteEntryBtn = document.getElementsByClassName("delete-entry-btn")


function editDeleteEntry(element, nameInd, rowInd, editLW, editSZ, editColumn1, editColumn2, editColumn3,  newLW, newSZ, szt, sc, szsub) {
    
    //Get element indexes and storage old lenWid and Size
    nameInd = element.parentNode.parentNode.cells[0].innerText
    rowInd = sameDiffList.rName.indexOf(nameInd)
    editLW = sameDiffList.rLenWid[rowInd]
    editSZ = sameDiffList.rSize[rowInd]

    console.log("Find Old Name = " + nameInd)
    console.log("sameDiff Index = " + rowInd)
    
    //Edit entry
    if (element.classList.contains("edit-entry-btn")) {
        alert("You want to edit entry.")
        editColumn1 = element.parentNode.parentNode.cells[0]
        editColumn2 = element.parentNode.parentNode.cells[1]
        editColumn3 = element.parentNode.parentNode.cells[2]
        
        editColumn1.contentEditable = true
        editColumn2.contentEditable = true
        editColumn3.contentEditable = true
        editColumn1.focus()

        //After updates
        editColumn3.onblur = function () {
            //Remove content editable return to form
            editColumn1.contentEditable = false
            editColumn2.contentEditable = false
            alert("Did anything change.")
            thingName.focus()
            editColumn3.contentEditable = false
            
            //Store new lenWid and Size data, sizeCount and sdSizeContent indexes
            newLW = editColumn3.innerText
            newSZ = editColumn2.innerText
            console.log("New lenWid = " + newLW)
            console.log("New size = " + newSZ)

            sc = sizeCount.lw.indexOf(editLW)
            console.log("sizeCount Index = " + sc)

            for (let s = 0; s < sdSizeContent.rows.length; s++) {
                if (sdSizeContent.rows[s].innerText.includes(editLW)) {
                    szt = s
                    szsub = sizeCount.sz[szt].indexOf(editSZ) + 1
                }
            }
            
            console.log("sdSizeContent Row Index = " + szt)
            console.log("sdSizeContent subRow Index = " + szsub)
            //Add or update sameDiffList, sizeCount and sdSizeContent

            if (editLW != newLW) {
                if (sizeCount.lw.includes(newLW) == false) {
                    alert("Add new sizeContent " + newLW + " row and a new sizeContent size " + newSZ + " row.")
                    addSDSizeRow()
                    sdDiffColumn1.innerHTML = "<strong>" + newLW + "</strong>"
                    sdDiffColumn2.innerHTML = "<strong>" + newSZ + "</strong>"

                    sizeCount.lw.push(newLW)
                    sizeCount.sz.push(newSZ)
                } else {
                    let newLWInd = sizeCount.lw.indexOf(newLW)
                    if (sizeCount.sz[newLWInd].includes(newSZ) == false) {
                        sizeCount.sz[newLWInd] += newSZ
                        
                    }
                }
            }
            
            

            if (sameDiffList.rName[rowInd] != editColumn1.innerText) {
                sameDiffList.rName[rowInd] = editColumn1.innerText
            }
                    

        }
    
    }
}

/*
for (let i = 0; i < sameDiffList.rLenWid.length; i++) {
    if (sizeCount.lw.includes(sameDiffList.rLenWid[i]) == false) {
        sizeCount.lw.push(sameDiffList.rLenWid[i])
        sizeCount.sz.push(sameDiffList.rSize[i])
    } 
}

for (let j = 0; j < sameDiffList.rLenWid.length; j++) {
    let atNum = sizeCount.lw.indexOf(sameDiffList.rLenWid[j])
    if (sizeCount.sz[atNum].includes(sameDiffList.rSize[j]) == false) {
        sizeCount.sz[atNum] += sameDiffList.rSize[j]
    }
}

*/

//PRINT DATA
