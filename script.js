// Sorting confirmed lines
function sortList(order)
{
    let inputs = [];
    document.querySelectorAll('.text')
    .forEach(item => inputs.push(item.textContent))
    if (order) inputs.sort();
    else inputs.sort().reverse();
    document.querySelectorAll('.text')
    .forEach((item, index) => item.textContent = inputs[index])
}
// Sort button listener
document.querySelector('.sort').addEventListener('click', (event) =>
{
    if (event.target.src.indexOf("images/downgray.svg") != -1)
    { event.target.src = 'images/upgray.svg'; sortList(true) }
    else { event.target.src = 'images/downgray.svg'; sortList(false); }
})
// Replaces inputs with text lines
function confirmInput(event)
{
    let newP = document.createElement('div')
    newP.className = 'text'
    newP.textContent = event.target.value
    // console.log(newP)
    // console.log(event.target.parentElement.firstElementChild)
    event.target.outerHTML = newP.outerHTML
    // event.target.parentElement.insertBefore(newP, event.target.parentElement.firstElementChild)
    // event.target.parentElement.querySelector('input').remove()

    // document.querySelectorAll('.delete').forEach(item => { item.addEventListener('click', (event) => { if (event.target.parentElement.firstElementChild.className == 'text') event.target.parentElement.parentElement.remove()})})
}
// Removes or clears the line
function clearLine(event)
{
    let parent = document.querySelector('.input-area');
    let line = event.target.parentElement.parentElement;
    if (line.firstElementChild.tagName == 'INPUT')
    {
        if (line.firstElementChild.value != '') line.querySelector('input').value = '';
        else if (parent.childElementCount != 1) {console.log(line.className); line.remove();}
    }
    else line.remove();
}
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
        { if (event.key == 'Enter' && event.target.value != '' && event.target.value != ' ') confirmInput(event); })
    })
} update()
// Add button listener
document.querySelector('.add-button').addEventListener('click', () =>
{
    let newElement = document.createElement('div')
    newElement.className = 'line'
    newElement.innerHTML = '<input type="text">\n<button class="delete"><img src="images/delete.svg" alt="img"></button>'
    document.querySelector('.input-area').append(newElement)
    document.querySelector('.input-area').lastElementChild.scrollIntoView({behavior: "smooth"}) 
    update()
})