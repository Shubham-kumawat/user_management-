import Fastify from "fastify";
import db from "./db.js";
import cors from "@fastify/cors";
const fastify = Fastify({ logger: true });

await fastify.register(cors);
await fastify.register(db);

const collection = fastify.mongo.db.collection("users");

fastify.get("/users", async (request, reply) => {
  
  const result =await collection.find().toArray()

    console.log(result)
  if (!result || result.length === 0) {
    return reply.status(404).send({ message: "No users found" });
  }
  return reply.status(200).send(result);
});

fastify.post("/user/create", async (request, reply) => {
  const {
    firstName,
    email,
    phone,
    gender,
    dob,
    age,
    eyeColor,
    hairColor,
    education
  } = request.body;
  const newUser = await collection.insertOne({
    firstName,
    email,
    phone,
    gender,
    dob,
    age,
    eyeColor,
    hairColor,
    education
    
  });
  return reply.status(201).send(newUser);
});

fastify.get("/user/:userId", async (request, reply) => {
  const { userId } = request.params;
  const user = await collection.findOne({
    _id: new fastify.mongo.ObjectId(userId),
  });
  if (!user) {
    return reply.status(404).send({ message: "User not found" });
  }
  return reply.status(200).send(user);
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});