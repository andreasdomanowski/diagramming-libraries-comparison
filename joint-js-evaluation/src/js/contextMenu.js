export function promptContextMenu(contextMenuSelector, x,y){
    document.getElementById(contextMenuSelector).className = "show";
    document.getElementById(contextMenuSelector).style.left = x + 'px';
    document.getElementById(contextMenuSelector).style.top = y + 'px';
}

