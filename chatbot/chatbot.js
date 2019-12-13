
function getQuery(query) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://answerbot.com/ask?query='+query, true);
    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
    } else {
        // We reached our target server, but it returned an error

    }
    };
    request.onerror = function() {
    // There was a connection error of some sort
    };
    request.send();
}

const setStylesOnElement = function(styles, element){
    Object.assign(element.style, styles);
}

// SVG ICONS
var icons = {
    close: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>',
    send: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
    chat: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15 4v7H5.17l-.59.59-.58.58V4h11m1-2H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm5 4h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z"/></svg>',
    chatFilled: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>'
}

// GLOBAL SETTINGS FOR CHATBOX
const theme = {
    closed_height: 50,
    open_height: 500,
    closed_width: 300,
    open_width: 400,
    bottom: 50,
    right : 50,
    accent : '#eaeaea',
    padding : 15
}

// DEFAULT FONT SETTINGS
var fontStyles = {
    fontFamily: 'sans-serif'
}

var secondaryFont = {
    color: 'grey',
    fontSize: '13px',
    lineHeight: '15px',
}

var inputStyles = {
    fontSize: '15px',
    userSelect: 'none',
    ...fontStyles
}

var borderStyles = {
    borderRadius: '15px',
    border: 'none'
}

var transitionEase = {
    transition: 'all .4s ease'
}

var styles = {
    chatbot : {
        position: 'fixed',
        bottom: theme.bottom,
        right: theme.right,
        width: theme.closed_width,
        height: theme.closed_height,
        lineHeight: '50px',
        backgroundColor: theme.accent,
        overflow: 'hidden',
        ...borderStyles,
        ...transitionEase
    },
    chatview : {
        position: 'absolute',
        left: 0,
        bottom: theme.bottom,
        height: (theme.open_height - theme.closed_height),
        width: theme.open_width,
        overflow: 'hidden',
        ...borderStyles
    },
    feed: {
        position: 'absolute',
        top: theme.padding,
        bottom: 0,
        margin: theme.padding,
        marginBottom: 0,
        overflow: 'scroll',
        width: theme.open_width - 2 * theme.padding,
        ...borderStyles
    },
    chatinput: {
        width: '100%',
        height: '50px',
        position: 'absolute',
        bottom: 0,
        left: theme.padding*4 - 24,
        padding: theme.padding,
        backgroundColor: '#ffffff00',
        ...fontStyles,
        ...inputStyles,
        ...borderStyles
    },
    closebutton: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 999
    },
    chatbubble: {
        open: {
            padding: theme.padding,
            backgroundColor: 'white',
            fontSize: '15px',
            lineHeight: '17px',
            textAlign: 'left',
            marginTop: '10px',
            ...borderStyles,
            ...fontStyles,
            ...transitionEase
        },
        closed: {
            height: 'default'
        }
    },
    divider: {
        borderStyle: 'solid',
        borderColor: 'grey',
        borderWidth: '0.5px',
        marginRight: -theme.padding,
        marginLeft: -theme.padding,
        marginTop: theme.padding,
        marginBottom: theme.padding
    },
    question: {
        ...secondaryFont,
    },
    answer: {
        marginTop: theme.padding / 3
    },
    source: {
        ...secondaryFont
    },
    sendbutton: {
        position: 'absolute',
        bottom: 13,
        left: theme.padding,
        fill: 'grey'
    },
    chatdivider: {
        position: 'absolute',
        bottom: theme.bottom,
        width: '100%',
        margin: 0
    }
}

var state = {
    messages: [],
    open: false,
    sampleQuestions: [
        'What are your hours?',
        'How much does it cost?',
        'What are your products?'
    ]
}

function handleChatbotClick(e) {
    if (state.open == false) {
        this.style.height = theme.open_height
        this.style.width = theme.open_width
        state.open = true
    } else if (e.composedPath().includes(window.closebutton)){
        this.style.height = theme.closed_height;
        this.style.width = theme.closed_width
        state.open = false
    }
}

function renderAnswer(chatbubble, answer) {
    var answerDiv = document.createElement('div');
    answerDiv.innerHTML = answer;
    setStylesOnElement(styles.answer, answerDiv)
    chatbubble.appendChild(answerDiv)
    var divider = document.createElement('hr');
    setStylesOnElement(styles.divider, divider)
    chatbubble.appendChild(divider);
    var sourceDiv = document.createElement('div');
    sourceDiv.innerHTML = 'Source: <a href = "#">Some Link to Our Site</a>';
    setStylesOnElement(styles.source, sourceDiv)
    chatbubble.appendChild(sourceDiv)
}

function renderChatBubble(question, answer) {
    var chatbubble = document.createElement('div');
    var questionDiv = document.createElement('div');
    questionDiv.innerHTML = question;
    setStylesOnElement(styles.question, questionDiv)
    chatbubble.appendChild(questionDiv);

    if (answer) {
        renderAnswer(chatbubble, answer)
    }
    setStylesOnElement(styles.chatbubble.open, chatbubble);
    return chatbubble
}

function openQuestion(e) {
    e.preventDefault()
    if (!this.open) {
        answer = "We're open 9-5.";
        state.messages.push({
            question: this.innerHTML,
            answer: answer
        });
        renderAnswer(this, answer);
        this.open = true;
    }
}

function renderSampleQuestions() {
    for (var i = 0; i < state.sampleQuestions.length; i++) {
        question = state.sampleQuestions[i];
        sampleQuestionBubble = renderChatBubble(question)
        sampleQuestionBubble.onclick = openQuestion
        window.chatbot.feed.appendChild(sampleQuestionBubble)
    }
}

function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}

function renderMessages() {
    window.chatbot.feed.innerHTML = '';
    for (var i = 0; i < state.messages.length; i++){
        var msg = state.messages[i];
        window.chatbot.feed.appendChild(renderChatBubble(msg.question, msg.answer))
    }
    scrollToBottom(window.chatbot.feed);
}


function sendMessage(e) {
    // TODO: get actual answer
    e.preventDefault()
    state.messages.push({
        question: window.chatbot.chatinput.value,
        answer: 'Basic pricing plans cost <b>$10 dollar per month</b>'
    })
    window.chatbot.chatinput.value = ''
    renderMessages()
}

window.onload = function(e) {
    chatbot = document.createElement('div')
    setStylesOnElement(styles.chatbot, chatbot)
    document.body.appendChild(chatbot)

    // CONFIGURE CHAT INPUT
    chatinput = document.createElement('input')
    chatinput.type = 'text'
    chatinput.placeholder = 'Ask a question about answer.com'
    chatinput.autofocus
    window.chatbot.chatinput = chatinput
    setStylesOnElement(styles.chatinput, chatinput)
    form = document.createElement('form')
    chatinput.addEventListener("focus", function() {
        this.style.outline = "none";  
    });
    form.appendChild(chatinput)

    // SUBMIT BUTTON
    sendbutton = document.createElement('label')
    sendbutton.innerHTML = '<input type="submit" style="display:none"/>' + icons.chat
    setStylesOnElement(styles.sendbutton, sendbutton)
    form.appendChild(sendbutton)
    form.onsubmit = this.sendMessage
    chatbot.appendChild(form)
    
    // VIEW FOR MAIN CHAT
    chatview = document.createElement('div')
    setStylesOnElement(styles.chatview, chatview)

    // CLOSE BUTTON
    closebutton = document.createElement('div')
    window.closebutton = closebutton
    closebutton.innerHTML = icons.close
    setStylesOnElement(styles.closebutton, closebutton)
    chatview.appendChild(closebutton)

    // HANDLE ACTIONS
    chatbot.onclick = handleChatbotClick

    // FEED FOR QUESTIONS+ANSWERS
    feed = document.createElement('div')
    setStylesOnElement(styles.feed, feed)
    chatview.appendChild(feed)
    chatbot.appendChild(chatview)

    chatdivider = document.createElement('hr')
    setStylesOnElement(styles.chatdivider, chatdivider)
    chatbot.appendChild(chatdivider)

    window.chatbot.feed = feed;
    renderSampleQuestions()
}
