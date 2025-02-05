import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
    email: string;
    message: string;
};

type ResponseData = {
    result: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const data: Data = req.body;

    if (!data || !data.email || !data.message) {
        return res.status(400).json({ result: "FIELD_EMPTY" });
    }

    if (data.message.length > 1000) {
        return res.status(400).json({ result: "MESSAGE_TOO_LONG" });
    }

    if (data.email.length > 500) {
        return res.status(400).json({ result: "NAME_TOO_LONG" });
    }

    // Webhook'a veri gönderme
    try {
        const response = await axios.post(process.env.WEBHOOK_URL as string, {
            embeds: [
                {
                    color: 0x3498db, // Mavi renk
                    title: "Yeni Mesaj Alındı!", // Başlık
                    description: "Bir kullanıcı yeni bir mesaj gönderdi.", 
                    fields: [
                        {
                            name: "Gönderen E-posta",
                            value: data.email,
                            inline: true,
                        },
                        {
                            name: "Mesaj İçeriği",
                            value: data.message,
                            inline: false,
                        },
                    ],
                    author: {
                        name: req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "Bilinmeyen",
                        icon_url: "https://p.erslly.xyz/pngwing.com.png", 
                    },
                    footer: {
                        text: "Mesajın Tarihi",
                        icon_url: "https://p.erslly.xyz/ersllydev.jpg", 
                    },
                    timestamp: new Date(), 
                },
            ],
        });

        if (response.data.err) {
            return res.status(500).json({ result: "DISCORD_API_ERROR" });
        }

        return res.status(200).json({ result: "Success" });
    } catch (error) {
        console.error("Error sending to Discord webhook:", error);
        return res.status(500).json({ result: "SERVER_ERROR" });
    }
}
