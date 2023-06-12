import express from 'express';
import 'module-alias/register';
import fileUpload from "express-fileupload";
import cors from 'cors';
import routes from '@router';

const app = express();
const port = process.env.PORT || 4000


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

// enable files upload

if (process.env.DEVELOPMENT) {
  app.use(fileUpload({
    createParentPath: true,
    useTempFiles: false,
    tempFileDir: process.cwd() + "/uploads/",
    limits: {

      fileSize: 50 * 1024 * 1024 * 1024 //50MB max file(s) size
    },
  }))
} else {

  app.use(fileUpload({
    createParentPath: true,
    useTempFiles: true,
    // tempFileDir: process.cwd() + "/uploads/",
    limits: {
      fileSize: 50 * 1024 * 1024 * 1024 //50MB max file(s) size
    },
  }))
}


app.use(express.static('uploads'));
// app.use('/uploads', express.static("/uploads"));
app.use('/', routes);

app.listen(port, () => console.log(`Running on Port \n http://localhost:${port}`))


