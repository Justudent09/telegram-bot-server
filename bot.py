from telegram.ext import Application, CallbackContext
from telegram import Chat
import logging
import asyncio
import random

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

TOKEN = "7565778146:AAHh9601Gfil-Xku80b5p6qz2SKbaHbfE-U"

GROUP_CHAT_ID = -1002497633161  

RESPONSES = [
    "Крутой закреп!",
    "Интересный пост!",
    "Отличная мысль!",
    "Звучит здорово!",
    "Согласен, хорошая идея!"
]

last_pinned_message_id = None


async def check_pinned_message(context: CallbackContext):

    global last_pinned_message_id

    try:
        chat: Chat = await context.bot.get_chat(GROUP_CHAT_ID)
        pinned_message = chat.pinned_message

        if pinned_message:
            pinned_message_id = pinned_message.message_id

            if pinned_message_id != last_pinned_message_id:
                logger.info(f"Найдено новое закреплённое сообщение: {pinned_message.text}")

                response_text = random.choice(RESPONSES)

                await context.bot.send_message(
                    chat_id=GROUP_CHAT_ID,
                    text=response_text,
                    reply_to_message_id=pinned_message_id,  
                )

                last_pinned_message_id = pinned_message_id
                logger.info(f"Бот ответил на закреплённое сообщение: {response_text}")

    except Exception as e:
        logger.error(f"Ошибка при получении закреплённого сообщения: {e}")


def main():
    app = Application.builder().token(TOKEN).build()

    app.job_queue.run_repeating(check_pinned_message, interval=1, first=0)

    logger.info("Бот запущен и следит за закрепами...")
    app.run_polling()


if __name__ == "__main__":
    main()
