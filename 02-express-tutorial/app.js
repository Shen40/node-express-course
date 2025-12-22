const { products, people } = require("./data");
const express = require('express')
const app = express()
const peopleRouter = require('./routes/people');

const logger=(req,res,next)=>{
    const method = req.method
    const url = req.url
    const time = new Date().toTimeString()
    console.log(method, url, time)
    next()
}

app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./methods-public'))
app.use('/api/v1/people', peopleRouter);

// app.get("/api/v1/people",(req,res)=>{
//     res.json({ success: true, data: people });
// })


// app.post("/api/v1/people", (req,res)=>{
//     const {name} = req.body; 

//     if(!name){
//         return res.status(400).json({ success: false, 
//         message: "Please provide a name" });
//     }

//     people.push({ id: people.length + 1, name: req.body.name });
//     res.status(201).json({ success: true, name: req.body.name });

// })

app.get('/', (req, res) => {
  res.send('Home')
})

app.get("/api/v1/products/:productID",(req,res)=>{
    const idToFind = parseInt(req.params.productID); 
    const product = products.find((p) => p.id === idToFind);

    if(!product){
        return res.status(404).send("product not found")
    }
    return res.json(product);
    
})

app.get("/api/v1/query", (req,res)=>{
    const {search, limit, maxprice} = req.query
    let sortedProducts = [...products]

    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(maxprice){
        const mp = Number(maxprice)
        sortedProducts = sortedProducts.filter((product)=>{
            return product.price<mp 
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if(sortedProducts.length<1){
        return res.status(200).json({ message: "No products match your description" })
    }
    res.status(200).json(sortedProducts)
})

app.all("*", (req,res)=>{
    res.status(404).send("source not found")
})

app.listen(3000, ()=>{
    console.log("server listening on port 3000");
}) 