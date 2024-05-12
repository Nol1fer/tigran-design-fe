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
        imageSource = './img/arrow.svg';
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

const handleSend = () => {
    let userText = textInput.value.trim();
    if (!userText) return;
    if (!chatIsStarted) {
        chatIsStarted = true;
        greetingElement.classList.add('hide-element');
        suggestionsElement.classList.add('hide-element');
    }
    console.log(userText);
    textInput.value = '';

    createMessage('user', userText);
    createMessage('chat-bot', userText + '\nэто написал бот');
};

sendButton.addEventListener('click', handleSend);