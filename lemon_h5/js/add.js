define(function() {
    var add = function() {
        var addName = document.querySelector("#add")
        addName.onclick = function() {
            location.href = "addclass.html"
        }

    }
    return {
        add: add
    }
})