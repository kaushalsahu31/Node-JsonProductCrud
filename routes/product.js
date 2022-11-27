
const ProductRoutes = require("express").Router();
const multer = require("multer");
const { getSingleProduct, postProduct, getProduct, UpdateProduct, deleteProduct } = require("../controllers/product");



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null,  file.originalname);
    },
});

var upload = multer({ storage: storage });




ProductRoutes.get('/:id', getSingleProduct);
ProductRoutes.get('/', getProduct);
ProductRoutes.post('/', upload.single("single") , postProduct);
ProductRoutes.patch('/:id', upload.single("single"), UpdateProduct);
ProductRoutes.delete('/:id', deleteProduct);





module.exports = ProductRoutes