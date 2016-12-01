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

let acceptedAnswer = $(acceptedAnswerClass);
let acceptedAnswerId = $(acceptedAnswer)[0].id;

let topVotedAnswer = _.maxBy($(answerClass), o => {
    let numberRaw = $(o).find(voteCountClass).text();
    return parseInt(numberRaw);
});

let topVotedAnswerId = $(topVotedAnswer)[0].id;

/*
    console.log("Is max answer accepted?");
    console.log(topVotedAnswerId === acceptedAnswerId);
    console.log("topVotedAnswer id: " + topVotedAnswerId);
    console.log("acceptedAnswer id: " + acceptedAnswerId);
*/

if (topVotedAnswerId !== acceptedAnswerId) {
    $(topVotedAnswer).find(voteDivClass).append(checkMarkElement);
    $(acceptedAnswer).find(voteCheckmarkClass).remove();
    $(acceptedAnswer).find(voteDivClass).append(checkGrayElement);
}