const sendButton = document.getElementById('send-button');
const textInput = document.getElementById('text-input');
const greetingElement = document.getElementById('greeting-element');
const suggestionsElement = document.getElementById('suggestions-element');
const messagesContainer = document.getElementById('messages-container');

let chatIsStarted = false;

const createNode = (tag, className) => {
    const node = document.createElement(tag);
    if (className) node.classList.add(className);
    return node;
};

const createMessage = (who, text) => {
    let imageSource = './img/girl.png';
    let name = 'Чат-бот';
    if (who === 'user') {
        imageSource = './img/user.png';
        name = 'Вы';
    }

    const messageContainer = createNode('div', 'message-container');

    const messageAvatarContainer = createNode('div', 'message__avatar-container');
    const avatarImage = createNode('img', 'avatar-image');
    avatarImage.src = (imageSource);
    messageAvatarContainer.append(avatarImage);

    const messageTextContainer = createNode('div', 'message__text-container');
    const messageTextName = createNode('div', 'message__text-name');
    messageTextName.textContent = name;
    const messageTextBody = createNode('div', 'message__text-body');
    messageTextBody.textContent = text;
    messageTextContainer.append(messageTextName, messageTextBody);

    messageContainer.append(messageAvatarContainer, messageTextContainer);

    messagesContainer.append(messageContainer);
};

const sendMessage = (text) => {
    if (!text) return;
    if (!chatIsStarted) {
        chatIsStarted = true;
        greetingElement.classList.add('hide-element');
        suggestionsElement.classList.add('hide-element');
    }
    console.log(text);

    createMessage('user', text);
    createMessage('chat-bot', text + '\nэто написал бот');
};

const handleSendButton = () => {
    let userText = textInput.value.trim();
    if (!userText) return;
    textInput.value = '';
    sendMessage(userText);
};

const handleSuggestionButton = (event) => {
    event.preventDefault();
    const suggestionButton = event.target.closest('.suggestion-button');
    if (!suggestionButton) return;
    const mainText = suggestionButton.querySelector('.suggestion__main-text').textContent;
    const subText = suggestionButton.querySelector('.suggestion__sub-text').textContent;
    const wholeText = mainText + ' ' + subText;
    sendMessage(wholeText);
};

sendButton.addEventListener('click', handleSendButton);
suggestionsElement.addEventListener('click', handleSuggestionButton);
document.body.addEventListener('keydown', (e) => {
    if (e.key === "Enter" && !e.shiftKey) { //  && window.innerWidth > 800
        e.preventDefault();
        handleSendButton();
    }
});