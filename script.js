// Sorting confirmed lines
function sortList(order)
{
    let inputs = [];
    document.querySelectorAll('.line')
    .forEach(item => inputs.push(item.textContent))
    if (order) inputs.sort();
    else inputs.sort().reverse();
    document.querySelectorAll('.line')
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
    event.target.parentElement.insertBefore(newP, event.target.parentElement.firstElementChild)
    event.target.parentElement.querySelector('input').remove()

    document.querySelectorAll('.delete').forEach(item => { item.addEventListener('click', (event) => { if (event.target.parentElement.firstElementChild.className == 'text') event.target.parentElement.parentElement.remove()})})
}
// Updates event listeners for appended elements
function update()
{
    document.querySelectorAll('.delete').forEach(item => { item.addEventListener('mouseover', (event) =>
    { event.target.src = 'images/deleteX.svg' })})
    document.querySelectorAll('.delete').forEach(item => { item.addEventListener('mouseout', (event) =>
    { event.target.src = 'images/delete.svg' })})
    document.querySelectorAll('.delete').forEach(item => { item.addEventListener('click', (event) => { event.target.parentElement.parentElement.querySelector('input').value = '' })})
    const dragArea = document.querySelector('.input-area')
    new Sortable(dragArea, {animation: 300})
    document.querySelector('input').addEventListener('keyup', (event) =>
    {
        if (event.key == 'Enter' && event.target.value != '' && event.target.value != ' ')
            confirmInput(event);
    })
} update()
// Add button listener
document.querySelector('.add-button').addEventListener('click', () =>
{
    let newElement = document.createElement('div')
    newElement.innerHTML = '<div class="line">\n<input type="text">\n<button class="delete"><img src="images/delete.svg" alt="img"></button>\n</div>'
    document.querySelector('.input-area').append(newElement)
    document.querySelector('.input-area').lastElementChild.scrollIntoView({behavior: "smooth"}) 
    update()
})