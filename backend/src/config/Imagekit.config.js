const imagekit=require('@imagekit/nodejs')

const Imagekitconfig=new imagekit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
})

module.exports=Imagekitconfig;