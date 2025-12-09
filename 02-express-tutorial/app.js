const { products } = require("./data");
const express = require('express')

const app = express()

app.use(express.static('./public'))

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