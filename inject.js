let answerClass = ".answer";
let acceptedAnswerClass = ".answer.accepted-answer";
let voteCountClass = ".vote-count-post";
let voteCheckmarkClass = ".vote-accepted-on";
let voteDivClass = ".vote";

let color = "yellow";
let checkMarkUrl = chrome.extension.getURL('imgs/check_' + color + '.svg');
let checkGrayUrl = chrome.extension.getURL('imgs/check_gray.svg');
let checkMarkElement = $("<img src='" + checkMarkUrl + "' title=\"This is the top voted answer and should be accepted\" \\>");
let checkGrayElement = $("<img src='" + checkGrayUrl + "' title=\"This is the top voted answer and should be accepted\" \\>");

let answers = $(answerClass);

if (answers.length > 0) {

    // Searching for top voted answer
    let topVotedAnswer = _.maxBy($(answerClass), o => {
        let numberRaw = $(o).find(voteCountClass).text();
        return parseInt(numberRaw);
    });

    let topVotedAnswerId = $(topVotedAnswer)[0].id;

    // Searching for accepted answer
    let acceptedAnswer = $(acceptedAnswerClass);

    if (acceptedAnswer.length > 0) {

        // If accepted answer found: Checking if it's a wrong accepted answer
        let acceptedAnswerId = $(acceptedAnswer)[0].id;

        if (topVotedAnswerId !== acceptedAnswerId) {
            $(topVotedAnswer).find(voteDivClass).append(checkMarkElement);
            $(acceptedAnswer).find(voteCheckmarkClass).remove();
            $(acceptedAnswer).find(voteDivClass).append(checkGrayElement);
        }
    }
    else {

        // If no accepted answer found: Checking if it has votes
        if ($(topVotedAnswer).find(voteCountClass).text() > 0) {
            $(topVotedAnswer).find(voteDivClass).append(checkMarkElement);
        }
    }
}