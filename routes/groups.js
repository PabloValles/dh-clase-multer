const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/groupsController");

// Donde vamos a guardar los archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/img/groups"));
  },
  filename: (req, file, cb) => {
    // path.basename(file.originalname) -> nombre del archivo
    // path.extname(file.originalname) -> nombre de la extension del archivo
    // file.filename -> nombre del archivo

    const newFileName = `group-${Date.now()}.${path.extname(
      file.originalname
    )}`;
    cb(null, newFileName);
  },
});

// Ejecutar la configuración de Multer
const upload = multer({ storage: storage });

// Todos los grupos
router.get("/", controller.index);

// Formulario de creación
router.get("/create", controller.create);

// Procesamiento del formulario de creación
router.post("/", upload.single("group-image"), controller.store);

// Detalle de un grupo
router.get("/:id", controller.show);

module.exports = router;
