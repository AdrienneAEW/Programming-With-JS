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
const sdTableContent = sameDiffTable.getElementsByTagName("tbody")
const sameDiffTitle = document.getElementById("same-diff-title")
const sameDiffTotal = document.getElementById("same-diff-total")
const sdSizeTable = document.getElementById("sd-size-table")
const sdSizeContent = sdSizeTable.getElementsByTagName("tbody")[0]

//Table Add Row/Cell Definitions
let sdListRow, sdDiffColumn1, sdDiffColumn2, sdDiffColumn3, sdDiffColumn4, sdDiffColumn5, addSize, rowNum, sizeRow, sdTotal, sdSubtotal
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
function addSDRow() {
    sdListRow = sdTableContent[0].insertRow()
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
        sdEditBtn.innerHTML = '&#9997;&#127996;'
        sdDiffColumn4.appendChild(sdEditBtn)
    
        sdDeleteBtn.setAttribute("class", "btn delete-entry-btn")
        sdDeleteBtn.setAttribute("title", "delete entry")
        sdDeleteBtn.setAttribute("aria-label", "delete entry")
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
        if (sameDiffList.rLenWid[l] == findLW && sameDiffList.rSize == findSZ) {
            sdCounted.push(sameDiffList.rSize[l])
            sdSubtotal = sdCounted.length
        }
    }

    sdCounted = []
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
    let atNum

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
        //addSize = "," + size NOT USED

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
            sdListRow = sdSizeContent.insertRow(rowNum + sizeCount.sz[atNum].length)
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
}

//EDIT/DELETE ENTRIES

//SAVE DATA

//PRINT DATA
