import twilio from 'twilio';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { trailName, latitude, longitude, trailType, url } = req.body;

        // Your Twilio Account SID and Auth Token
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        // Your WhatsApp sandbox number (from Twilio Console)
        const from = 'whatsapp:+14155238886'; // Use your Twilio WhatsApp sandbox number

        // Your number to send the WhatsApp message to
        const to = 'whatsapp:+919449187343'; // Your personal number

        // URL for the approval page (this URL would be a page on your website where users approve the trail)
        const approvalUrl = `https://loopercode.com/approve-trail?trailName=${encodeURIComponent(trailName)}&latitude=${latitude}&longitude=${longitude}&trailType=${trailType}&url=${encodeURIComponent(url)}`;

        // Message content (Main content of the message)
        const message = `A new trail has been reported:

        Trail Name: ${trailName}
        Latitude: ${latitude}
        Longitude: ${longitude}
        Trail Type: ${trailType}
        URL: ${url}
        Please review the trail details and approve or reject it by clicking the link below:

        ${approvalUrl}`;

        try {
            // Send the WhatsApp message
            const messageResponse = await client.messages.create({
                from: from,
                to: to,
                body: message,
            });

            console.log('WhatsApp message sent successfully:', messageResponse.sid);

            // Return success response
            res.status(200).json({ message: 'WhatsApp message with approval link sent successfully', messageId: messageResponse.sid });
        } catch (error) {
            console.error('Error sending WhatsApp message:', error); // Log the error here
            res.status(500).json({ error: 'Failed to send WhatsApp message', message: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
