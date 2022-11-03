let count = 0

document.querySelector('.add-button').addEventListener('click', () => { console.log(count); count++;})

document.querySelector('.sort').addEventListener('click', (event) =>
{
    if (event.target.src.indexOf("images/downgray.svg") != -1) event.target.src = 'images/upblack.svg';
    else event.target.src = 'images/downgray.svg';
})

document.querySelector('.delete').addEventListener('click', (event) =>