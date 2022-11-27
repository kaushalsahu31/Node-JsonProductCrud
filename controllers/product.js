const dataPath = __dirname+"/models/product.json"
const fs = require("fs")




const saveProductData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getProductData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)
}
const Validater = (check,data) => {
    for (let i = 0; i < check.length; i++) {
        if (data[check[i]] == "" || data[check[i]] == undefined || data[check[i]] == null) {
            return [false, check[i]]
        }
    }
    return [true, ""]
}





const postProduct = async (req, res) => {

    try {
        let check = Validater(["productName", "productDescription", "isActive"],req.body)
        if (check[0] == false) { res.status(400).json({ message: `${check[1]} Field Required`, data: [] }); }

        const productImage = req.file.destination + "/" + req.file.originalname
        if (!productImage) res.status(400).json({ message: `productImage Field Required`, data: [] });

        const { productName, productDescription, isActive }=req.body
        let existProducts = getProductData()
        const ProductId = Math.floor(1000000000 + Math.random() * 9000000000)
        existProducts[ProductId] = { ProductId, productName, productDescription, productImage, isActive }
        console.log(existProducts);
        saveProductData(existProducts);
        let newexistProducts = getProductData()
        res.status(200).json({ message: 'Product added successfully', data: newexistProducts[ProductId] }); 
    } catch (error) {
        res.status(500).json({ message: error.message, data:[]});
    }
}



const getSingleProduct = async (req, res) => {
    try {
        var existProducts = getProductData()
        res.status(200).json({ message: "Sucess", product: existProducts[req.params['id']] });
    } catch (error) {
        res.status(500).json({ message: error.message, data: [] });
    }
}


const getProduct = async (req, res) => {

    try {
        let check = Validater(["page"], req.query)
        let page = check[0] == false ? 1 : req.query.page
        let Products = getProductData()
        Products = Object.values(Products)
        let newArray = Products.slice(10 * (page-1), 10)
        res.status(200).json({
            message: "Sucess",
            CurrentPage: page,
            LastPage: Math.ceil(Products.length/10),
            totalProducts: Products.length,
            products: newArray
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: [] });
    }
}


const UpdateProduct = async (req, res) => {
    try {
        let check = Validater(["productName", "productDescription", "isActive"], req.body)
        if (check[0] == false) { res.status(400).json({ message: `${check[1]} Field Required`, data: [] }); }

        const productImage = req.file.destination + "/" + req.file.originalname
        if (!productImage) res.status(400).json({ message: `productImage Field Required`, data: [] });

        const { productName, productDescription, isActive } = req.body
        let existProducts = getProductData()
        fs.readFile(dataPath, 'utf8', (err, data) => {
            let ProductId = parseInt(req.params['id']);
            existProducts[ProductId] = { ProductId, productName, productDescription, productImage, isActive }
            saveProductData(existProducts);
            let newexistProducts = getProductData()
            res.status(200).json({ message: `Products with id ${ProductId} has been updated`, data: newexistProducts[ProductId] });
        }, true);
   } catch (error) {
       res.status(500).json({ message: error.message, data: [] });   
   }
}


const deleteProduct = async (req, res) => {
   try {
       fs.readFile(dataPath, 'utf8', (err, data) => {
           var existProducts = getProductData()
           const ProductID = req.params['id'];
           delete existProducts[ProductID];
           saveProductData(existProducts);
           res.status(200).json({ message: `Products with id ${ProductID} has been deleted`, data: [] });
       }, true);
   } catch (error) {
       res.status(500).json({ message: error.message, data: [] });   
   }
}




module.exports = {
    getSingleProduct,
    postProduct,
    getProduct,
    UpdateProduct,
    deleteProduct

}