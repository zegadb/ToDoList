// Sorting confirmed lines
function sortList(order)
{
    // Sending all blank inputs to the end
    document.querySelectorAll('input')
    .forEach(item => {
        if (item.readOnly == false) {
            let newElement = document.createElement('div')
            newElement.className = 'line'
            newElement.innerHTML = '<input type="text">\n<button class="delete"><img src="images/delete.svg" alt="img"></button>'
            newElement.firstElementChild.value = item.value
            item.parentElement.remove()
            document.querySelector('.input-area').append(newElement)
        }
    })
    let inputs = [];
    document.querySelectorAll('.text')
    .forEach(item => inputs.push(item.value))
    if (order) inputs.sort();
    else inputs.sort().reverse();
    document.querySelectorAll('.text')
    .forEach((item, index) => item.value = inputs[index])
    update()
}
// Sort button listener
document.querySelector('.sort').addEventListener('click', (event) =>
{
    if (event.target.src.indexOf("images/downgray.svg") != -1)
    { event.target.src = 'images/upgray.svg'; sortList(true) }
    else { event.target.src = 'images/downgray.svg'; sortList(false); }
})
// Confims inputs; replaces inputs with text lines
function confirmInput(event)
{
    event.target.readOnly = true
    event.target.className = 'text'
    document.querySelector('.input-area').lastElementChild.firstElementChild.focus()
}
// Removes or clears the line
function clearLine(event)
{
    let parent = document.querySelector('.input-area');
    let line = event.target.parentElement.parentElement
    if (event.target.parentElement.parentElement.className == 'input-area')
        line = event.target.parentElement;
    if (line.firstElementChild.tagName == 'INPUT' && line.firstElementChild.readOnly == false)
    {
        if (line.firstElementChild.value != '') line.querySelector('input').value = '';
        else if (parent.childElementCount != 1) {line.remove();}
    }
    else line.remove();
}
// Check if string only contains spaces
function onlySpaces(str) { return str.trim().length === 0 }
// Updates event listeners for appended elements
function update()
{
    // Delete button hover effect
    document.querySelectorAll('.delete').forEach(item => { item.addEventListener('mouseover', (event) =>
    { event.target.src = 'images/deleteX.svg' })})
    document.querySelectorAll('.delete').forEach(item => { item.addEventListener('mouseout', (event) =>
    { event.target.src = 'images/delete.svg' })})
    // Delete button listener
    document.querySelectorAll('.delete').forEach(item => item.addEventListener('click', clearLine))
    // Draggable
    const dragArea = document.querySelector('.input-area')
    new Sortable(dragArea, {animation: 300})
    // Confirm input and turn it into text line
    document.querySelectorAll('input')
    .forEach(item => {
        item.addEventListener('keyup', (event) =>
        { if (event.key == 'Enter' && !onlySpaces(event.target.value)) {
            confirmInput(event)
            let blankLineCounter = 0
            document.querySelectorAll('input').forEach(item => {
                if (item.value == '') blankLineCounter++; })
            if (!(blankLineCounter >= 1)) addElement(event);
        }})
    })
} update()
// Add input to end
function addElement(event)
{
    let newElement = document.createElement('div')
    newElement.className = 'line'
    newElement.innerHTML = '<input type="text">\n<button class="delete"><img src="images/delete.svg" alt="img"></button>'
    document.querySelector('.input-area').append(newElement)
    document.querySelector('.input-area').lastElementChild.scrollIntoView({behavior: "smooth"})
    document.querySelector('.input-area').lastElementChild.firstElementChild.focus()
    // event.target.parentElement.nextSibling.firstElementChild.focus()
    if (document.querySelector('.input-area').childElementCount > 5)
    document.querySelector('.input-area').lastElementChild.previousSibling.scrollIntoView({behavior: "smooth"});
    update()
}
// Add button listener
document.querySelector('.add-button').addEventListener('click', addElement)