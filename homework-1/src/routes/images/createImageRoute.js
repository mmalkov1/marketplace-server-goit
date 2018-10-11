const multer  = require('multer');
const fs = require('fs');
const path = require('path');
const util = require('util');
const renameFile = util.promisify(fs.rename);
const TEMP_IMAGE_FOLDER = path.join(__dirname, '../../../', 'assets');
const PRODUCT_IMAGE_FOLDER = path.join(__dirname, '../../../', 'data', 'product-images');

const storage = multer.diskStorage({
  // определяем папку куда сохранять временное изображение
  destination: (req, file, next) => {
    next(null, TEMP_IMAGE_FOLDER)
  },
  // определяем имя файла
  filename: (req, file, next) => {
    next(null, file.originalname)
  }
});

// Применяем настройки
const upload = multer({ storage });

const moveImage = (fileObject, productId) => {
  //  cоздаем папку для файлов пользователя
  const productImageFolderName = 'product-' + productId;
  const productImagePath =  path.join(PRODUCT_IMAGE_FOLDER, productImageFolderName);

  if (!fs.existsSync(productImagePath)){
    fs.mkdirSync(productImagePath);
  }

  const tempFilePath = path.join(TEMP_IMAGE_FOLDER, fileObject.originalname);
  const newFilePath = path.join(productImagePath, fileObject.originalname);

  return renameFile(tempFilePath, newFilePath).then(() => productImageFolderName);
};

const saveImageMultipart = (req, res) => {
  console.log(PRODUCT_IMAGE_FOLDER);
  // Берем файл
  const fileObject = req.file;
  console.log(fileObject);

  // Берем другие данные что пришли
  const productId = req.body.productId;

  moveImage(fileObject, productId)
    .then(productImageFolderName => {
      res.json({ status: 'was saved in folder: ' +  productImageFolderName });
    })

};

// добавляем промежуточный обработчик для post-multipart запросов
module.exports = () => [upload.single('file'), saveImageMultipart];