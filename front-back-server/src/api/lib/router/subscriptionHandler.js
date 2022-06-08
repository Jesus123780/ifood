/* eslint-disable linebreak-style */
const subscriptions = {}
import crypto from 'crypto'
import webpush from 'web-push'
const vapidKeys = {
    privateKey: 'bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU',
    publicKey: 'BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8'
}
let pushSubscripton

webpush.setVapidDetails('mailto:juvi69elpapu@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey)

const createHash = (input) => { 
    const md5sum = crypto.createHash('md5')
    md5sum.update(Buffer.from(input))
    return md5sum.digest('hex')
}

const handlePushNotificationSubscription = (req, res) => {
    const subscriptionRequest = req.body
    console.log( req)
    res.status(201).json({ message: 'Subscription successful' })
    // const susbscriptionId = createHash(JSON.stringify(subscriptionRequest))
    // subscriptions[susbscriptionId] = subscriptionRequest
    // res.status(201).json({ id: susbscriptionId })

}


const  sendPushNotification = (req, res) => {
    const subscriptionId = req.params.id
    const pushSubscription = subscriptions[subscriptionId]

    webpush.sendNotification(
        pushSubscription,
        JSON.stringify({
            title: 'New Product Available ',
            text: 'HEY! Take a look at this brand new t-shirt!',
            image: 'https://marketing4ecommerce.net/wp-content/uploads/2017/10/web-push-notifications.jpg',
            tag: 'new-product',
            url: 'https://www.facebook.com/watch?v=396244205551752'
        })
    )
        .catch(err => {
            // console.log(err)
        })
    res.status(202).json({})

}
export default {
    handlePushNotificationSubscription,
    sendPushNotification
}

