import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream';
import { promisify } from 'util';
import fs from 'fs';
import { nanoid } from 'nanoid';
import db from './db.js'; // MongoDB plugin

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fastify = Fastify({ logger: true });
const pump = promisify(pipeline);

await fastify.register(cors);
await fastify.register(multipart);
await fastify.register(db);

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

fastify.register(fastifyStatic, {
  root: uploadDir,
  prefix: '/uploads/',
});

// File upload endpoint
fastify.post('/upload', async (req, reply) => {
  try {
    const data = await req.file();
    const filename = `${nanoid()}.${data.filename.split('.').pop()}`;
    const filePath = path.join(uploadDir, filename);

    await pump(data.file, fs.createWriteStream(filePath));

    return reply.send({
      success: true,
      filePath: `/uploads/${filename}`,
      message: 'File uploaded successfully',
    });
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'File upload failed' });
  }
});

// Create user
fastify.post('/users', async (request, reply) => {
  try {
    const userData = request.body;
    if (!userData.fullName || !userData.email || !userData.phone) {
      return reply.status(400).send({ error: 'Missing required fields' });
    }

    const result = await fastify.mongo.db.collection('Users').insertOne(userData);
    return reply.status(201).send({
      success: true,
      id: result.insertedId,
      message: 'User created successfully',
    });
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'User creation failed' });
  }
});

// Get all users
fastify.get('/users', async (_, reply) => {
  try {
    const users = await fastify.mongo.db.collection('Users').find().toArray();
    return reply.send(users);
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
fastify.get('/users/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const user = await fastify.mongo.db.collection('Users').findOne({ _id: new fastify.mongo.ObjectId(id) });
    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }
    return reply.send(user);
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'Failed to fetch user' });
  }
});

// Create blog
fastify.post('/blogs', async (request, reply) => {
  try {
    const { title, description, author } = request.body;
    const result = await fastify.mongo.db
      .collection('blogs')
      .insertOne({
        title,
        description,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    return reply.code(201).send({
      _id: result.insertedId,
      title,
      description,
      author,
    });
  } catch (error) {
    console.error('Failed to create blog:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
});


fastify.get('/blogs', async (_, reply) => {
  try {
    const blogs = await fastify.mongo.db.collection('blogs').find().toArray(); // ✅ lowercase
    return reply.send(blogs);
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'Failed to fetch blogs' });
  }
});


// Get single blog by ID
// Get single blog by ID
fastify.get('/blogs/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const blog = await fastify.mongo.db.collection('blogs').findOne({
      _id: new fastify.mongo.ObjectId(id),
    });

    if (!blog) {
      return reply.code(404).send({ error: 'Blog not found' });
    }

    return reply.send(blog);
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: 'Failed to fetch blog' });
  }
});


// Update blog by ID
fastify.put('/blogs/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const { title, description, author } = request.body;

    const result = await fastify.mongo.db.collection('blogs').updateOne(
      { _id: new fastify.mongo.ObjectId(id) },
      { $set: { title, description, author, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return reply.status(404).send({ error: 'Blog not found' });
    }

    return reply.send({ success: true, message: 'Blog updated successfully' });
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'Failed to update blog' });
  }
});

// Delete blog by ID
fastify.delete('/blogs/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const result = await fastify.mongo.db.collection('blogs').deleteOne({ _id: new fastify.mongo.ObjectId(id) });

    if (result.deletedCount === 0) {
      return reply.status(404).send({ error: 'Blog not found' });
    }

    return reply.send({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'Failed to delete blog' });
  }
});

// Start the server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
