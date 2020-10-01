function expressionCalculator(expr) {
    return dracketsEditor(expr)


}
function pseudoEval(expr) {
    let exprArr = expr.trim().split("");
    if (exprArr.find(i => i === " ")) {
        exprArr = expr.trim().split(" ").filter(i=>i!=="")
    }
    function myEval(exprArr) {
        let newArray = []
        let result = 0;
        for (let i = 0; i < exprArr.length; i++) {
            if (exprArr[i] === "/" || exprArr[i] === "*") {
                if (exprArr[i] === "/" && exprArr[i + 1] == 0) {
                    throw  new Error("TypeError: Division by zero.")
                }

                let rexult = exprArr[i] === "/" ? newArray[newArray.length - 1] / exprArr[+i + 1] : newArray[newArray.length - 1] * exprArr[+i + 1];
                newArray.pop()
                newArray.push(rexult)
                i++;
                continue
            }

            newArray.push(exprArr[i])
        }
        for (let i = 0; i < newArray.length; i++) {
            if (i === 0) {
                result = +newArray[0];
            } else {
                if (newArray[i - 1] === '-') {
                    result = result - newArray[i]
                } else if (newArray[i - 1] === "+") {
                    result = result + +newArray[i]
                }
            }
        }
        return result

    }

    return myEval(exprArr)

}

function dracketsEditor(expr) {
    bracketsMustBePaired(expr)

    let exprArr = expr.trim().split("");
    if (exprArr.find(i => i === " ")) {
        exprArr = expr.trim().split(" ")
    }
    exprArr = exprArr.filter(i=>i!=="")
    bracketsMustBePaired(exprArr)
    let start = null
    for (let i in exprArr) {
        if (exprArr[i] === "(") {
            start=i
        }
        if (exprArr[i] === ")") {
            console.log(exprArr)
            let inBrackets = exprArr.slice(start,+i+1);
            inBrackets= inBrackets.join(" ")
            inBrackets=inBrackets.slice(1,inBrackets.length-1)
            exprArr[start]=pseudoEval(inBrackets)
            debugger
            console.log(exprArr)
            exprArr.splice(+start+1,i- +start)
            console.log(exprArr)
            break
        }
    }
    if(exprArr.find(i=>i==="(")){
        return dracketsEditor(exprArr.join(" "))
    }

    return pseudoEval(exprArr.join(" "))


}
function bracketsMustBePaired(array) {

    let count = 0;
    for (let i of array) {
        if (i === "(") {
            count++
        } else if (i === ")") {
            count--
        }
        if (count < 0) {
            throw  new Error("ExpressionError: Brackets must be paired")
        }
    }

    if (count !== 0) {
        console.log(array)
        throw  new Error("ExpressionError: Brackets must be paired")
    }

}
module.exports = {
    expressionCalculator
}