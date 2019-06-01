// Example of Wrong Accepted Answer: https://stackoverflow.com/questions/3829150/google-chrome-extension-console-log-from-background-page
// Example of Missing Accepted Answer: https://stackoverflow.com/questions/13/determine-a-users-timezone

var debug = false;

log(() => "TAAAC!");

let answerClass = ".answer";
let acceptedAnswerClass = ".answer.accepted-answer";
let voteCountClass = ".js-vote-count";
let voteCheckmarkClass = ".js-accepted-answer-indicator";
let voteDivClass = ".votecell";

let color = "yellow";
let checkMarkUrl = chrome.extension.getURL('imgs/check_' + color + '.svg');
let checkGrayUrl = chrome.extension.getURL('imgs/check_gray.svg');
let checkMarkElement = $("<img src='" + checkMarkUrl + "' title=\"This is the top voted answer and should be accepted\" \\>");
let checkGrayElement = $("<img src='" + checkGrayUrl + "' title=\"This is the top voted answer and should be accepted\" \\>");

let answers = $(answerClass);
log(() => `Number of Answers found with selector '${answerClass}': ${$(answerClass).length}`);

if (answers.length > 0) {

    // Searching for top voted answer
    log(() => `Votes found with selector '${answerClass} ${voteCountClass}': ${$(`${answerClass} ${voteCountClass}`).text()}`);
    let topVotedAnswer = _.maxBy($(answerClass), o => {
        let numberRaw = $(o).find(voteCountClass).text();
        return parseInt(numberRaw);
    });

    let topVotedAnswerId = $(topVotedAnswer)[0].id;
    log(() => `Top voted answer id: '${topVotedAnswerId}'`);

    // Searching for accepted answer
    let acceptedAnswer = $(acceptedAnswerClass);
    log(() => `Number of Accepted Answers found with selector '${acceptedAnswerClass}': ${$(acceptedAnswerClass).length}`);

    if (acceptedAnswer.length > 0) {
        log(() => `Accepted answer found`);

        // If accepted answer found: Checking if it's a wrong accepted answer
        let acceptedAnswerId = $(acceptedAnswer)[0].id;
        log(() => `Accepted answer id: '${acceptedAnswerId}'`);

        if (topVotedAnswerId !== acceptedAnswerId) {
            log(() => `Number of voteDivs found with selector '${answerClass} ${voteDivClass}': ${$(`${answerClass} ${voteDivClass}`).length}`);
            log(() => `Number of voteCheckmarks found with selector '${answerClass} ${voteCheckmarkClass}': ${$(`${answerClass} ${voteCheckmarkClass}`).length}`);

            $(topVotedAnswer).find(voteDivClass).append(checkMarkElement);
            $(acceptedAnswer).find(voteCheckmarkClass).remove();
            $(acceptedAnswer).find(voteDivClass).append(checkGrayElement);
        }
    }
    else {
        log(() => `No accepted answers found`);
        log(() => `Number of votes for the top voted answer: ${$(topVotedAnswer).find(voteCountClass).text()}`);

        // If no accepted answer found: Checking if it has votes
        if ($(topVotedAnswer).find(voteCountClass).text() > 0) {
            log(() => `Number of voteDivs found with selector '${answerClass} ${voteDivClass}': ${$(`${answerClass} ${voteDivClass}`).length}`);
            $(topVotedAnswer).find(voteDivClass).append(checkMarkElement);
        }
    }
}

function log(obj) {
    if (debug) {
        console.log(obj());
    }
}