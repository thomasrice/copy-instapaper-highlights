/*
    Adds a "Copy highlights" link to Instapaper read pages, which when clicked will
    copy highlights to the clipboard.
    
    It adds > beforehand for easy pasting into markdown.
*/

function copyTextToClipboard(text) {
    // https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension

    //Create a textbox field where we can insert text to. 
    var copyFrom = document.createElement("textarea");

    //Set the text content to be the text you wished to copy.
    copyFrom.textContent = text;

    //Append the textbox field into the body as a child. 
    //"execCommand()" only works when there exists selected text, and the text is inside 
    //document.body (meaning the text is part of a valid rendered HTML element).
    document.body.appendChild(copyFrom);

    //Select all the text!
    copyFrom.select();

    //Execute command
    document.execCommand('copy');

    //(Optional) De-select the text using blur(). 
    copyFrom.blur();

    //Remove the textbox field from the document.body, so no other JavaScript nor 
    //other elements can get access to this.
    document.body.removeChild(copyFrom);
}

function copyHighlights() {
    let text = '';
    let highlights = document.getElementsByClassName('highlight');
    for (let highlight of highlights) {
        text += '>' + highlight.innerText + '\n\n';
    }
    text = text.slice(0, -1); // Remove final \n
    copyTextToClipboard(text);
    alert('Highlights copied to clipboard');
    
}

function addLink() {
    let a = document.createElement('a');
    a.setAttribute('href', '#');
    a.innerHTML = 'Copy highlights';
    a.addEventListener('click', copyHighlights);
    
    let controlBar = document.getElementsByClassName('control_bar_right_buttons')[0]
    controlBar.appendChild(a);
}

function anchorElementLoaded() {
    if (document.getElementsByClassName('control_bar_right_buttons')) {
        return true;
    };
    return false;
}

function start() {
    addLink();
}

var waitForLoad = setInterval(function() {

    if (anchorElementLoaded()) {
      console.log("Anchor Element loaded.");
      clearInterval(waitForLoad);
      start();
   }
   else
   {
       console.log("Waiting to load.");
   }
}, 100); // check every 100ms
