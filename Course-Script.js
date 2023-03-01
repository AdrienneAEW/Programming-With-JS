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
    
    if (oddEvenCheck(checkNum) != 0) {
        alert(checkNum + " is an odd number")
    } else if (oddEvenCheck(checkNum) != 1) {
        alert(checkNum + " is an even number")
    }
    

}