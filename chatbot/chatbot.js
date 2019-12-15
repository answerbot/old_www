
(function() {
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
        chatFilled: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>',
        arrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>',
        downArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>'
    }

    // GLOBAL SETTINGS FOR CHATBOX
    const theme = {
        closed_height: 50,
        open_height: 500,
        closed_width: 250,
        open_width: 350,
        bottom: 50,
        right : 50,
        accent : '#eaeaea',
        padding : 15,
        lineHeight: 20,
    }

    // DEFAULT FONT SETTINGS
    var fontStyles = {
        fontFamily: 'sans-serif'
    }

    var primaryFont = {
        fontSize: '17px',
        lineHeight: '20px'
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
            bottom: theme.bottom + 'px',
            right: theme.right + 'px',
            width: theme.closed_width + 'px',
            height: theme.closed_height + 'px',
            lineHeight: theme.lineHeight + 'px',
            backgroundColor: theme.accent,
            overflow: 'hidden',
            zIndex: 800,
            ...borderStyles,
            ...transitionEase
        },
        chatview : {
            position: 'absolute',
            left: 0 + 'px',
            bottom: theme.bottom + 'px',
            height: (theme.open_height - theme.closed_height) + 'px',
            width: theme.open_width + 'px',
            overflow: 'hidden',
            ...transitionEase,
            ...borderStyles
        },
        feed: {
            position: 'absolute',
            top: theme.padding + 'px',
            bottom: 0 + 'px',
            margin: theme.padding + 'px',
            marginBottom: 0 + 'px',
            overflow: 'scroll',
            width: theme.open_width - 2 * theme.padding + 'px',
            ...transitionEase
        },
        chatinput: {
            width: '100%',
            height: '20px',
            position: 'absolute',
            bottom: 0 + 'px',
            left: theme.padding*4 - 24 + 'px',
            padding: theme.padding + 'px',
            backgroundColor: '#ffffff00',
            ...fontStyles,
            ...inputStyles,
            ...borderStyles
        },
        closebutton: {
            position: 'absolute',
            top: 12 + 'px',
            right: 12 + 'px',
            zIndex: 999
        },
        infoBox: {
            padding: theme.padding + 'px',
            backgroundColor: 'white',
            fontSize: '15px',
            lineHeight: '20px',
            textAlign: 'left',
            marginBottom: theme.padding * 2 + 'px',
            ...borderStyles,
            ...fontStyles,
            ...transitionEase
        },
        infoBoxTitle: {
            ...primaryFont
        },
        infoBoxUrl: {
            ...secondaryFont
        },
        infoBoxText: {
            marginTop: theme.padding / 3 + 'px'
        },
        infoBoxAction: {
            marginBottom: -15 + 'px',
            textAlign: 'center'
        },
        divider: {
            borderStyle: 'solid',
            borderColor: 'grey',
            borderWidth: '0.5px',
            marginRight: -theme.padding + 'px',
            marginLeft: -theme.padding + 'px',
            marginTop: theme.padding + 'px',
            marginBottom: theme.padding + 'px'
        },
        questionDiv: {
            marginTop: theme.padding + 'px',
            overflow: 'hidden',
            cursor: 'pointer',
            fontWeight: 200,
            color: 'grey',
            ...fontStyles,
        },
        quesitonText: {
            float: 'left',
            marginLeft: theme.padding + 'px',
            lineHeight: 24 + 'px'
        },
        questionAction: {
            float: 'right',
        },
        header: {
            ...fontStyles,
            fontSize: '20px',
            paddingBottom: theme.padding + 'px'
        },
        answer: {
            // marginTop: theme.padding / 3
            ...fontStyles,
            fontSize: '17px',
            paddingTop: theme.padding + 'px',
            paddingBottom: theme.padding + 'px'
        },
        source: {
            ...secondaryFont
        },
        sendbutton: {
            position: 'absolute',
            bottom: 10 + 'px',
            left: theme.padding + 'px',
            fill: 'grey'
        },
        chatdivider: {
            position: 'absolute',
            bottom: theme.bottom + 'px',
            width: '100%',
            margin: 0 + 'px'
        }
    }

    // DEFINE TYPE TO RENDER IN FEED
    function getHeader(header) {
        return {
            type: 'header',
            header
        }
    }

    function getQuestion(question, clickable) {
        return {
            type: 'question',
            question,
            clickable
        }
    }

    function getAnswer(answer) {
        return {
            type: 'answer',
            answer
        }
    }

    function getInfoBox(title, link, content) {
        return {
            type: 'infoBox',
            title,
            link,
            content
        }
    }

    function clearDefaultView() {
        state.feed = state.feed.filter((elem) => {
            (elem.type != 'question' || elem.clickable == false) && elem.type != 'header'
        })
    }

    // RENDERING FUNCTIONS FOR EACH TYPE OF FEED ITEM
    function renderHeader(item) {
        header = document.createElement('div')
        header.innerHTML = item.header
        setStylesOnElement(styles.header, header)
        return header
    }

    function renderQuestion(item) {
        var questionDiv = document.createElement('div');
        setStylesOnElement(styles.questionDiv, questionDiv)

        var questionText = document.createElement('div');
        questionText.innerHTML = item.question;
        setStylesOnElement(styles.quesitonText, questionText)

        questionDiv.appendChild(questionText)
        if (item.clickable) {
            var questionAction = document.createElement('div')
            questionAction.innerHTML = icons.arrow
            setStylesOnElement(styles.questionAction, questionAction)
            questionDiv.appendChild(questionAction)
            questionDiv.onclick = (e) => {
                clearDefaultView();
                state.feed.push(getQuestion(item.question))
                state.feed.push(getAnswer("We are open all day."))
                state.feed.push(getInfoBox("Search Results", 'https://something.com','This is a passage about something, it doesnt really matter what its about'))
                renderFeedTransition()
            }
        }
        return questionDiv;
    }

    function renderAnswer(item) {
        var answerDiv = document.createElement('div');
        answerDiv.innerHTML = item.answer;
        setStylesOnElement(styles.answer, answerDiv);
        return answerDiv;
    }

    function renderInfoBox(item) {
        var infoBox = document.createElement('div');
        var infoBoxUrl = document.createElement('div');
        var infoBoxTitle = document.createElement('div');
        var infoBoxText = document.createElement('div');
        var infoBoxAction = document.createElement('div');
        infoBoxUrl.innerHTML = item.link
        infoBoxTitle.innerHTML = '<a href = "#" style="color:inherit;">' + item.title + '</a>';
        infoBoxText.innerHTML = item.content;
        infoBoxAction.innerHTML = icons.downArrow;

        setStylesOnElement(styles.infoBox, infoBox);
        setStylesOnElement(styles.infoBoxTitle, infoBoxTitle);
        setStylesOnElement(styles.infoBoxText, infoBoxText);
        setStylesOnElement(styles.infoBoxUrl, infoBoxUrl);
        setStylesOnElement(styles.infoBoxAction, infoBoxAction);
        infoBox.appendChild(infoBoxUrl);
        infoBox.appendChild(infoBoxTitle);
        infoBox.appendChild(infoBoxText);
        infoBox.appendChild(infoBoxAction);
        return infoBox;
    }

    // ROOT FUNCTION FOR RENDERING FEED ITEMS
    function render(item) {
        switch(item.type) {
            case 'header':
                return renderHeader(item)
            case 'question':
                return renderQuestion(item)
            case 'answer':
                return renderAnswer(item)
            case 'infoBox':
                return renderInfoBox(item)
        }
    }

    var state = {
        feed: [],
        open: false
    }

    // handle OPEN / CLOSE chatbot
    function handleChatbotClick(e) {
        console.log(e)
        console.log(state)
        if (state.open == false) {
            this.style.height = theme.open_height + 'px';
            this.style.width = theme.open_width + 'px';
            state.open = true
        } else if (e.composedPath().includes(window.closebutton)){
            this.style.height = theme.closed_height + 'px';
            this.style.width = theme.closed_width + 'px';
            state.open = false
        }
    }

    function scrollToBottom(element) {
        element.scrollTop = element.scrollHeight;
    }

    function sendMessage(e) {
        // TODO: get actual answer
        e.preventDefault()
        state.feed.push(getQuestion(window.chatbot.chatinput.value))
        state.feed.push(getAnswer('Basic pricing plans cost <b>$10 dollar per month</b>'))
        state.feed.push(getInfoBox("Search Results", 'https://something.com','This is a passage about something, it doesnt really matter what its about'))
        window.chatbot.chatinput.value = ''
        renderFeed()
    }

    function renderFeedElem(feed) {
        feed.innerHTML = '';
        for (var i = 0; i < state.feed.length; i++){
            var item = state.feed[i];
            feed.appendChild(render(item))
        }
    }

    function renderFeed() {
        renderFeedElem(window.chatbot.feed)
        scrollToBottom(window.chatbot.feed);
    }

    function renderFeedTransition() {
        overrideStyles = {left: theme.open_width + 'px'}
        feed = renderChatView(window.chatbot.chatbot, overrideStyles)
        renderFeedElem(feed);
        setTimeout( () => {
            feed.parentNode.style.left = 0 + 'px';
            window.chatbot.feed.style.left = -theme.open_width + 'px';
            window.chatbot.feed = feed
        }, 1)
    }

    function renderChatView(chatbot, overrideStyles = {}) {
        // VIEW FOR MAIN CHAT
        chatview = document.createElement('div')
        setStylesOnElement({...styles.chatview, ...overrideStyles}, chatview)

        // FEED FOR QUESTIONS+ANSWERS
        feed = document.createElement('div')
        setStylesOnElement(styles.feed, feed)
        chatview.appendChild(feed)
        chatbot.appendChild(chatview)

        // CLOSE BUTTON
        closebutton = document.createElement('div')
        window.closebutton = closebutton
        closebutton.innerHTML = icons.close
        setStylesOnElement(styles.closebutton, closebutton)
        chatview.appendChild(closebutton)
        return feed
    }

    function renderChatBotLayout() {
        chatbot = document.createElement('div')
        console.log(styles.chatbot)
        setStylesOnElement(styles.chatbot, chatbot)
        document.body.appendChild(chatbot)

        // CONFIGURE CHAT INPUT
        chatinput = document.createElement('input')
        chatinput.type = 'text'
        chatinput.placeholder = 'What can I help you with?'
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
        sendbutton.innerHTML = icons.chat
        setStylesOnElement(styles.sendbutton, sendbutton)
        form.appendChild(sendbutton)
        form.onsubmit = sendMessage
        chatbot.appendChild(form)
        
        window.chatbot.feed = renderChatView(chatbot);

        chatdivider = document.createElement('hr')
        setStylesOnElement(styles.chatdivider, chatdivider)
        chatbot.appendChild(chatdivider)

        // HANDLE ACTIONS
        chatbot.onclick = handleChatbotClick
        window.chatbot.chatbot = chatbot
    }

    function renderSampleQuestions(sampleQuestions) {
        for (var i = 0; i < sampleQuestions.length; i++) {
            state.feed.push(getQuestion(sampleQuestions[i], true))
        }
    }

    window.onload = function(e) {
        renderChatBotLayout()
        sampleQuestions = [
            'What are your hours?',
            'How much does it cost?',
            'What are your products?'
        ]
        state.feed.push(getHeader("What other users are asking"))
        renderSampleQuestions(sampleQuestions)
        renderFeed()
    }
})();
