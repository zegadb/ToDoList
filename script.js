function sortList(order)
{
    let inputs = [];
    document.querySelectorAll('.line')
    .forEach(item => inputs.push(item.querySelector('input').value))
    if (order) inputs.sort();
    else inputs.sort().reverse();
    document.querySelectorAll('.line')
    .forEach((item, index) => item.querySelector('input').value = inputs[index])
}

document.querySelector('.sort').addEventListener('click', (event) =>
{
    if (event.target.src.indexOf("images/downgray.svg") != -1)
    { event.target.src = 'images/upblack.svg'; sortList(true) }
    else { event.target.src = 'images/downgray.svg'; sortList(false); }
})

function update()
{
    document.querySelectorAll('.delete').forEach(item => { item.addEventListener('mouseover', (event) =>
    { event.target.src = 'images/deleteX.svg' })})
    document.querySelectorAll('.delete').forEach(item => { item.addEventListener('mouseout', (event) =>
    { event.target.src = 'images/delete.svg' })})
    document.querySelectorAll('.delete').forEach(item => { item.addEventListener('click', (event) => { event.target.parentElement.parentElement.querySelector('input').value = '' })})
    const dragArea = document.querySelector('.input-area')
    new Sortable(dragArea, {animation: 350})
    document.querySelector('input').addEventListener('keyup', (event) =>
    {
        if (event.key == 'Enter' && event.target.value != '' && event.target.value != ' ') {
            let newP = document.createElement('div')
            newP.className = 'text'
            newP.textContent = event.target.value
            console.log(newP)
            console.log(event.target.parentElement.firstElementChild)
            event.target.parentElement.insertBefore(newP, event.target.parentElement.firstElementChild)
            event.target.parentElement.querySelector('input').remove()
        }
        document.querySelectorAll('.delete').forEach(item => { item.addEventListener('click', (event) => { if (event.target.parentElement.firstElementChild.className == 'text') event.target.parentElement.parentElement.remove()})})
    })
}
update()

document.querySelector('.add-button').addEventListener('click', () =>
{
    let newElement = document.createElement('div')
    let scroll = document.createElement('a')
    newElement.innerHTML = '<div class="line">\n<input type="text">\n<button class="delete"><img src="images/delete.svg" alt="img"></button>\n</div>'
    document.querySelector('.input-area').append(newElement)
    document.querySelector('.input-area').lastElementChild.scrollIntoView({behavior: "smooth"})
    update()
})