var string = '{"items":[{"Desc":"Item1"},{"Desc":"Item2"}]}';
var json = {
    "items":
    [
        {"Desc":"Item1"},
        {"Desc":"Item2"},
        {"firstName":"John"},
        {"lastName":"Smith"}
    ]
};

localStorage.setItem('added-items', AddToLocalStorage(string));
localStorage.setItem('added-items', AddToLocalStorage(json));

// this function converts JSON into string to be entered into localStorage
function AddToLocalStorage(data) {
    if (typeof data != "string") {data = JSON.stringify(data);}
    return data;
}

// this function gets string from localStorage and converts it into JSON
function GetFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

var myData = GetFromLocalStorage("added-items");

console.log(myData.items[2].firstName)    // "John"

myData.items[2].firstName = ["John","Elizabeth"];
myData.items[2].lastName = ["Smith","Howard"];

console.log(myData.items[2])    // {"firstName":["John","Elizabeth"],"lastName":["Smith","Howard"]}

console.log(myData.items.length)    // 4
