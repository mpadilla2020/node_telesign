var RestClient = require("./RestClient.js");

/***
 * TeleSign's Messaging API allows you to easily send SMS messages. You can send alerts,
 * reminders, and notifications, or you can send verification messages containing
 * one-time passcodes ( OTP ).
 */
class MessagingClient extends RestClient {

    constructor(customerId,
                apiKey,
                restEndpoint = null,
                timeout = 15000,
                userAgent = null,
                debug = false) {
        super(customerId, apiKey, restEndpoint, timeout, userAgent, debug);
        if(debug){console.log("Init MessagingClient")}
        this.messaging_resource = "/v1/messaging";
        this.messaging_status_resource = "/v1/messaging/";
    }

    /***
     * Send a message to the target phone_number.
     *
     * See https://developer.telesign.com/docs/messaging-api for detailed API documentation.
     *
     * @param callback: Callback method to handle response.
     * @param phoneNumber: Phone number to call
     * @param message: Text of the message to be sent to the end user.
     * @param messageType: This parameter specifies the traffic type being sent in the message.
     * transaction.
     */
    sendMessage(callback, phoneNumber, message, messageType) {
        var params = {
            phone_number: phoneNumber,
            message: message,
            message_type: messageType
        };
        this.execute(callback, "POST", this.messaging_resource, params, this.debug);
    }

    /***
     * Get status of message transaction.
     *
     * @param callback: Callback method to handle the response.
     * @param referenceId: Reference ID received in the response of message.
     */
    getMessageStatus(callback, referenceId) {
        this.execute(callback,
            "GET",
            this.messaging_status_resource + referenceId,
            null,
            this.debug);
    }
}

module.exports = MessagingClient;
