// // import Fastify from "fastify";
// // import db from "./db.js";
// // import cors from "@fastify/cors";
// // const fastify = Fastify({ logger: true });
// // import yup from 'yup'
// // import fastifyStatic from '@fastify/static';
// // import multipart from "@fastify/multipart";
// // import fs from "fs";
// // import path, { dirname } from 'path';
// // import { fileURLToPath } from 'url';
// // import { pipeline } from "stream";
// // import { promisify } from "util";

// // const __filename = fileURLToPath(import.meta.url);
// // const _dirname = dirname(_filename);
// // const yupOptions = {
// //   strict: false,
// //   abortEarly: false, // return all errors
// //   stripUnknown: true, // remove additional properties
// //   recursive: true
// // }


// // await fastify.register(cors);
// // await fastify.register(db);
// // const pump = promisify(pipeline);
// // await fastify.register(multipart);



// // const uploadDir = path.join(process.cwd(), "uploads");
// // if (!fs.existsSync(uploadDir)) {
// //   fs.mkdirSync(uploadDir);
// // }


// // fastify.post("/upload", async function (request, reply) {
// //   const parts = request.parts();
  

// //   for await (const part of parts) {
// //     if (part.file) {
// //       const filePath = path.join(uploadDir, part.filename);
// //       await pump(part.file, fs.createWriteStream(filePath));
// //     }
// //   }
// // })



// // const collection = fastify.mongo.db.collection("Users");


// // const opt = {
// //   schema: {
// //     body:  yup.object().shape({
// //       firstName: yup.string().required("First Name is required"),
// //       lastName: yup.string().required("Last Name is required"),
// //       maidenName: yup.string().required("Maiden Name is required"),
// //       age: yup.number().positive("Age must be positive").integer("Age must be an integer").required("Age is required"),
// //       gender: yup.string().required("Gender is required"),
// //       email: yup.string().email("Invalid email format").required("Email is required"),
// //       phone: yup.string().required("Phone is required"),
// //       username: yup.string().required("Username is required"),
// //       password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
// //       birthDate: yup.string().required("Birth Date is required"),
// //       image: yup.string().url("Invalid image URL").required("Image URL is required"),
// //       bloodGroup: yup.string().required("Blood Group is required"),
// //       height: yup.number().positive("Height must be positive").required("Height is required"),
// //       weight: yup.number().positive("Weight must be positive").required("Weight is required"),
// //       eyeColor: yup.string().required("Eye Color is required"),
// //       hair: yup.object().shape({
// //         color: yup.string().required("Hair Color is required"),
// //         type: yup.string().required("Hair Type is required"),
// //       }).required("Hair details are required"),
// //       domain: yup.string().required("Domain is required"),
// //       ip: yup.string().required("IP Address is required"),
// //       macAddress: yup.string().required("MAC Address is required"),
// //       university: yup.string().required("University is required"),
// //       address: yup.object().shape({
// //         address: yup.string().required("Address is required"),
// //         city: yup.string().required("City is required"),
// //         state: yup.string().required("State is required"),
// //         postalCode: yup.string().required("Postal Code is required"),
// //         country: yup.string().required("Country is required"),
// //         coordinates: yup.object().shape({
// //           lat: yup.number().required("Latitude is required"),
// //           lng: yup.number().required("Longitude is required"),
// //         }).required("Coordinates are required"),
// //       }).required("Address is required"),
// //       bank: yup.object().shape({
// //         cardExpire: yup.string().required("Card Expiry Date is required"),
// //         cardNumber: yup.string().required("Card Number is required"),
// //         cardType: yup.string().required("Card Type is required"),
// //         currency: yup.string().required("Currency is required"),
// //         iban: yup.string().required("IBAN is required"),
// //       }).required("Bank details are required"),
// //       company: yup.object().shape({
// //          country: yup.string().required("Company Country is required"),       // ➕ add this
// //   stateCode: yup.string().required("Company State Code is required"), // ➕ add this

// //         department: yup.string().required("Department is required"),
// //         name: yup.string().required("Company Name is required"),
// //         title: yup.string().required("Job Title is required"),
// //         address: yup.object().shape({
           
// //           address: yup.string().required("Company Address is required"),
// //           city: yup.string().required("Company City is required"),
// //             stateCode: yup.string().required("State Code is required"),
// //           state: yup.string().required("Company State is required"),
// //           postalCode: yup.string().required("Company Postal Code is required"),
// //           coordinates: yup.object().shape({
// //             lat: yup.number().required("Company Latitude is required"),
// //             lng: yup.number().required("Company Longitude is required"),
// //           }).required("Company Coordinates are required"),
// //         }).required("Company Address is required"),
// //       }).required("Company details are required"),
// //       ein: yup.string().required("EIN is required"),
// //       ssn: yup.string().required("SSN is required"),
// //       userAgent: yup.string().required("User Agent is required"),
// //       crypto: yup.object().shape({
// //         coin: yup.string().required("Crypto Coin is required"),
// //         wallet: yup.string().required("Crypto Wallet is required"),
// //         network: yup.string().required("Crypto Network is required"),
// //       }).required("Crypto details are required"),
// //       role: yup.string().required("Role is required"),
// //     })
// //   },
// //     validatorCompiler: ({ schema, method, url, httpPart }) => {
// //       return function (data) {
// //         // with option strict = false, yup validateSync function returns the
// //         // coerced value if validation was successful, or throws if validation failed
// //         try {
// //           const result = schema.validateSync(data, yupOptions)
// //           return { value: result }
// //         } catch (e) {
// //           return { error: e }
// //         }
// //       }
// //     }
  
// // }


// // fastify.get("/", async (request, reply) => {
// //   // const query = request.query.query;
// //   // console.log(query);
// //   // const result = await collection
// //   //   .find({
// //   //     $and: [
// //   //       {
// //   //         $or: [
// //   //           { fullName: { $regex: query, $options: "i" } },
// //   //           { email: { $regex: query, $options: "i" } },
// //   //         ],
// //   //       },
// //   //       { age: { $lt: 30 } },
// //   //     ],
// //   //   })
// //   //   .toArray();

// //   //   console.log(result)

// //   const result = await collection.find().toArray();
// //   if (!result || result.length === 0) {
// //     return reply.status(404).send({ message: "No users found" });
// //   }
// //   return reply.status(200).send(result);
// // });


// // fastify.post("/create", opt, async (request, reply) => {
 
 
// //   const {
  
// //     firstName,
// //     lastName,
// //     maidenName,
// //     age,
// //     gender,
// //     email,
// //     phone,
// //     username,
// //     password,
// //     birthDate,
// //     bloodGroup,
// //     height,
// //     weight,
// //     eyeColor,
// //     hair: { color, type },
// //     domain,
// //     ip,
// //     macAddress,
// //     university,
// //     address: {
// //       address,
// //       city,
// //       state,
// //       postalCode,
// //       country,
// //       coordinates: { lat, lng }
// //     },
// //     bank: {
// //       cardExpire,
// //       cardNumber,
// //       cardType,
// //       currency,
// //       iban
// //     },
// //     company: {
// //       department,
// //       name,
// //       title,
// //       address: {
// //         address: companyAddress,
// //         city: companyCity,
// //         state: companyState,
// //         postalCode: companyPostalCode,
// //         coordinates: { lat: companyLat, lng: companyLng }
// //       }
// //     },
// //     ein,
// //     ssn,
// //     userAgent,
// //     crypto: {
// //       coin,
// //       wallet,
// //       network
// //     },
// //     role
// //   } = request.body;

// //   const newUser = await collection.insertOne({
// //     firstName,
// //     lastName,
// //     maidenName,
// //     age,
// //     gender,
// //     email,
// //     phone,
// //     username,
// //     password,
// //     birthDate,
// //     image: filePath,
// //     bloodGroup,
// //     height,
// //     weight,
// //     eyeColor,
// //     hair: { color, type },
// //     domain,
// //     ip,
// //     macAddress,
// //     university,
// //     address: {
// //       address,
// //       city,
// //       state,
// //       postalCode,
// //       country,
// //       coordinates: { lat, lng }
// //     },
// //     bank: {
// //       cardExpire,
// //       cardNumber,
// //       cardType,
// //       currency,
// //       iban
// //     },
// //     company: {
// //       department,
// //       name,
// //       title,
// //       address: {
// //         address: companyAddress,
// //         city: companyCity,
// //         state: companyState,
// //         postalCode: companyPostalCode,
// //         coordinates: { lat: companyLat, lng: companyLng }
// //       }
// //     },
// //     ein,
// //     ssn,
// //     userAgent,
// //     crypto: {
// //       coin,
// //       wallet,
// //       network
// //     },
// //     role
// //   });

// //   return reply.status(201).send(newUser);
// // });


// // fastify.get("/user/:userId", async (request, reply) => {
// //   const { userId } = request.params;
// //   const user = await collection.findOne({
// //     _id: new fastify.mongo.ObjectId(userId),
// //   });
// //   if (!user) {
// //     return reply.status(404).send({ message: "User not found" });
// //   }
// //   return reply.status(200).send(user);
// // });

// // fastify.listen({ port: 3000 }, (err, address) => {
// //   if (err) {
// //     fastify.log.error(err);
// //     process.exit(1);
// //   }
// //   fastify.log.info(`Server listening at ${address}`);
// // });


// import Fastify from "fastify";
// import cors from "@fastify/cors";
// import db from "./db.js";
// import multipart from "@fastify/multipart";
// import fs from "fs";
// import path from "path";
// import { pipeline } from "stream";
// import { promisify } from "util";
// import { nanoid } from 'nanoid'
// import fastifyStatic from "@fastify/static";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const fastify = Fastify({ logger: true });
// const pump = promisify(pipeline);
// const __filename = fileURLToPath(import.meta.url);
// const _dirname = dirname(_filename);

// // Register plugins
// await fastify.register(multipart);
// await fastify.register(cors);
// await fastify.register(db);

// // Static files for uploaded files
// fastify.register(fastifyStatic, {
//   root: path.join(__dirname, 'uploads'),
//   prefix: '/uploads/',
// });

// // Simplified schema matching your frontend form
// const userSchema = {
//   fullName: { type: 'string', required: true },
//   email: { type: 'string', format: 'email', required: true },
//   phone: { type: 'string', pattern: '^[0-9]{10}$', required: true },
//   gender: { type: 'string', required: true },
//   city: { type: 'string', required: true },
//   university: { type: 'string', required: true },
//   filePath: { type: 'string' }
// };

// // File upload endpoint
// fastify.post('/upload', async function (req, reply) {
//   try {
//     const data = await req.file();
//     const filename =` ${nanoid()}.${data.filename.split('.').pop()}`;
//     const filePath = `uploads/${filename}`;
    
//     await pump(data.file, fs.createWriteStream(filePath));
    
//     return reply.send({
//       success: true,
//       filePath: `/uploads/${filename}`,
//       message: "File uploaded successfully"
//     });
//   } catch (err) {
//     fastify.log.error(err);
//     return reply.status(500).send({ error: "File upload failed" });
//   }
// });

// // Create user endpoint
// fastify.post('/users', async (request, reply) => {
//   try {
//     const userData = request.body;
    
//     // Basic validation
//     if (!userData.fullName || !userData.email || !userData.phone) {
//       return reply.status(400).send({ error: "Missing required fields" });
//     }
    
//     const result = await fastify.mongo.db.collection("Users").insertOne(userData);
    
//     return reply.status(201).send({
//       success: true,
//       id: result.insertedId,
//       message: "User created successfully"
//     });
//   } catch (err) {
//     fastify.log.error(err);
//     return reply.status(500).send({ error: "User creation failed" });
//   }
// });

// // Get all users
// fastify.get('/users', async (request, reply) => {
//   try {
//     const users = await fastify.mongo.db.collection("Users").find().toArray();
//     return reply.send(users);
//   } catch (err) {
//     fastify.log.error(err);
//     return reply.status(500).send({ error: "Failed to fetch users" });
//   }
// });

// // Start server
// fastify.listen({ port: 3000 }, (err, address) => {
//   if (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
//   fastify.log.info(`Server listening at ${address}`);
// });



// server.js
import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream";
import { promisify } from "util";
import fs from "fs";
import { nanoid } from "nanoid";
import db from "./db.js"; // your MongoDB plugin

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fastify = Fastify({ logger: true });
const pump = promisify(pipeline);

await fastify.register(cors);
await fastify.register(multipart);
await fastify.register(db);

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

fastify.register(fastifyStatic, {
  root: uploadDir,
  prefix: "/uploads/",
});

fastify.post("/upload", async (req, reply) => {
  const file = await req.file();
  const filename = `${nanoid()}.${file.filename.split(".").pop()}`;
  const filePath = path.join(uploadDir, filename);
  await pump(file.file, fs.createWriteStream(filePath));
  reply.send({ filePath: `/uploads/${filename}` });
});

fastify.post("/users", async (req, reply) => {
  const user = req.body;
  const result = await fastify.mongo.db.collection("Users").insertOne(user);
  reply.code(201).send({ success: true, id: result.insertedId });
});

fastify.get("/users", async (req, reply) => {
  const users = await fastify.mongo.db.collection("Users").find().toArray();
  reply.send(users);
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server running at ${address}`);
});
