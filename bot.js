const TelegramBot = require("node-telegram-bot-api");

const token = "5559285548:AAH42ndItM1pynWtgs84kparQvIg-6f0yMU";
const group = "-1001550525797";
const bot = new TelegramBot(token, { polling: true });
bot.on("callback_query", async (query) => {
  console.log(query);
});

const sendPost = async (product) => {
  const caption = `${product.title}\n${product.description}\nPrice: ${product.price}`;
  const image = __dirname + `/public/${product.images[0]}`;
  const BOT_USERNAME = (await bot.getMe()).username;
  const keyboard = {
    text: "Visit Profile",
    callback_data: "visit_profile",
    url: `https://t.me/${BOT_USERNAME}`,
  };

  const sentMessage = await bot.sendPhoto(group, image, {
    caption,
    reply_markup: {
      inline_keyboard: [[keyboard]],
    },
  });
  return sentMessage.message_id;
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const button = {
    text: "Open Web App",
    url: "https://idyllic-cassata-4dd4aa.netlify.app/#/",
  };
  
  bot.sendMessage(chatId, "Welcome to my Telegram bot!", {
    reply_markup: {
      inline_keyboard: [[{text: button.text ,web_app: {
        url: button.url,
      }}]],
    },
  });
});

module.exports = sendPost;
