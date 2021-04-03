const mongoose =require('mongoose')
const validator=require('validator')
conUrl='mongodb+srv://divyansha10:ABCabc123@#@cluster0.vcgcq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(conUrl,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})