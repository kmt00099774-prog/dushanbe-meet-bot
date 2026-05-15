import os
import logging
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

logging.basicConfig(level=logging.INFO)

TOKEN = os.environ.get("TOKEN")

waiting_users = []
active_chats = {}

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if user_id in active_chats:
        await update.message.reply_text("Ты уже в чате. Напиши /stop чтобы выйти.")
        return
    if user_id in waiting_users:
        await update.message.reply_text("Ты уже в очереди. Ожидай собеседника...")
        return
    waiting_users.append(user_id)
    if len(waiting_users) >= 2:
        user1 = waiting_users.pop(0)
        user2 = waiting_users.pop(0)
        active_chats[user1] = user2
        active_chats[user2] = user1
        await context.bot.send_message(user1, "✅ Собеседник найден! Можешь писать. /stop — выйти.")
        await context.bot.send_message(user2, "✅ Собеседник найден! Можешь писать. /stop — выйти.")
    else:
        await update.message.reply_text("🔍 Ищем собеседника... Ожидай.")

async def stop(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if user_id in active_chats:
        partner_id = active_chats.pop(user_id)
        active_chats.pop(partner_id, None)
        await update.message.reply_text("❌ Ты вышел из чата. Напиши /start чтобы найти нового собеседника.")
        await context.bot.send_message(partner_id, "❌ Собеседник вышел. Напиши /start чтобы найти нового.")
    elif user_id in waiting_users:
        waiting_users.remove(user_id)
        await update.message.reply_text("Ты вышел из очереди.")
    else:
        await update.message.reply_text("Ты не в чате. Напиши /start.")

async def relay(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if user_id not in active_chats:
        await update.message.reply_text("Ты не в чате. Напиши /start.")
        return
    partner_id = active_chats[user_id]
    await context.bot.send_message(partner_id, update.message.text)

def main():
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("stop", stop))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, relay))
    app.run_polling()

if __name__ == "__main__":
    main()
