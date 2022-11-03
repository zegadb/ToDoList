document.querySelector('.sort').addEventListener('click', (event) =>
{
    if (event.target.src.indexOf("images/downgray.svg") != -1) event.target.src = 'images/upblack.svg';
    else event.target.src = 'images/downgray.svg';
})

document.querySelectorAll('.delete').forEach(item => { item.addEventListener('mouseover', (event) =>
{ event.target.src = 'images/deleteX.svg' })})
document.querySelectorAll('.delete').forEach(item => { item.addEventListener('mouseout', (event) =>
{ event.target.src = 'images/delete.svg' })})
