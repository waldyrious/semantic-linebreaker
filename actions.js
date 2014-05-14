function breakPhrases() {
  var textArea = document.getElementById("textbox");
  // http://stackoverflow.com/q/4698560/
  var scrollTop = textArea.scrollTop;
  // http://stackoverflow.com/q/3286595/
  var selStart = textArea.selectionStart;
  var selEnd = textArea.selectionEnd;
  var manualMode = document.getElementById("manual-mode");
  // clean up previous runs
  textArea.value = textArea.value.replace(/^(.{0,72})◀/gm, "$1");
  // don't do any parsing if we're editing in manual mode
  if( !manualMode.checked ) {
    // break on sentence boundaries (hard limits)
    textArea.value = textArea.value.replace(/(.{20,}?)([.?!][”"]?|[:;]) /g, "$1$2\n");
    // break on conjunctions
    textArea.value = textArea.value.replace(/(.{20,}?) (or|and|but|such as|for example,?|e(\. ?)?g\.?|i(\. ?)?e\.?) /g, "$1\n$2 ");
    // break on clause boundaries (soft limits)
    textArea.value = textArea.value.replace(/(.{20,}?)(,[”"]?) /g, "$1$2\n");
    // mark too long lines, if there are any left
    textArea.value = textArea.value.replace(/^([^◀\n]{72,}?)(?!◀) /gm, "$1◀ ");
  }
  textArea.scrollTop = scrollTop;
  textArea.selectionStart = selStart;
  textArea.selectionEnd = selEnd;
}

// http://stackoverflow.com/q/2176861/, http://stackoverflow.com/q/546905/
document.getElementById('text_area').onpaste = setTimeout(breakPhrases, 1);
