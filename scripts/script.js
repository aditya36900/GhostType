$(document).keydown(function (event) {
  // Check for Alt+X OR Ctrl+Shift+X
  if (
    (event.altKey && event.which === 88) ||
    (event.ctrlKey && event.shiftKey && event.which === 88)
  ) {
    chrome.storage.local.get(["lastCopied"], function (result) {
      var text = result.lastCopied;
      if (!text) return;

      var activeElement = document.activeElement;
      activeElement.focus();

      // THE FIX: Use insertText.
      // This pastes the text as a single block, preserving your original indentation
      // and preventing the website from auto-indenting (double spacing).
      var success = document.execCommand("insertText", false, text);

      // Fallback: If insertText fails, use manual injection
      if (!success && (activeElement.tagName === "TEXTAREA" || activeElement.tagName === "INPUT")) {
        var start = activeElement.selectionStart;
        var end = activeElement.selectionEnd;
        var val = activeElement.value;
        
        activeElement.value = val.slice(0, start) + text + val.slice(end);
        activeElement.selectionStart = activeElement.selectionEnd = start + text.length;
        
        // Notify the website that data changed (Important for React/Angular)
        activeElement.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  }
});