$(document).ready(function () {
    
    // 1. SAVE BUTTON LOGIC
    $("#run-script-btn").click(function () {
        // Get the text from the dark area
        let text = $("#content").val();
        
        // Save it to Chrome's memory
        chrome.storage.local.set({ lastCopied: text }, function () {
            
            // Visual Feedback: Change button to Green "Saved!"
            let btn = $("#run-script-btn");
            let originalText = btn.text();
            
            btn.text("ARMED & READY");
            btn.addClass("btn-success"); // Turn green
            
            // Reset button after 1.5 seconds
            setTimeout(() => {
                btn.text(originalText);
                btn.removeClass("btn-success");
            }, 1500);
        });
    });

    // 2. LINK OPENING LOGIC (Fixes the LinkedIn click)
    // This forces any link (like your name) to open in a new Chrome tab
    $('a').click(function(e) {
        e.preventDefault(); // Stop it from trying to open inside the tiny popup
        var linkUrl = $(this).attr('href');
        if(linkUrl) {
            chrome.tabs.create({url: linkUrl});
        }
        return false;
    });

});