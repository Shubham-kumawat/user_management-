


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




await fastify.register(cors, {
  origin: 'http://localhost:5173', // allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // explicitly allow DELETE
});

await fastify.register(multipart,{
  limits :{
    fileSize : 10*1024*1024,
  }
});
await fastify.register(db);
const tagCollection = fastify.mongo.db.collection('tags')
const categoriesCollection = fastify.mongo.db.collection("categories")

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
// Get user by ID - Updated to properly handle ObjectId
fastify.get('/users/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    
    // Validate the ID format first
    if (!fastify.mongo.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: 'Invalid user ID format' });
    }

    const user = await fastify.mongo.db.collection('Users').findOne({ 
      _id: new fastify.mongo.ObjectId(id) 
    });

    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }

    // Return the user data with proper formatting
    return reply.send({
      ...user,
      id: user._id.toString(), // Include both id and _id for compatibility
      _id: user._id.toString()
    });
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'Failed to fetch user' });
  }
});


// Update user by ID
fastify.put('/users/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const updatedData = request.body;

    const result = await fastify.mongo.db.collection('Users').updateOne(
      { _id: new fastify.mongo.ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return reply.status(404).send({ error: 'User not found' });
    }

    return reply.send({ success: true, message: 'User updated successfully' });
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'Failed to update user' });
  }
});

// Delete user by ID
fastify.delete('/users/:id', async (request, reply) => {
  try {
    const { id } = request.params;

    const result = await fastify.mongo.db.collection('Users').deleteOne({
      _id: new fastify.mongo.ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return reply.status(404).send({ error: 'User not found' });
    }

    return reply.send({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'Failed to delete user' });
  }
});



fastify.post('/blogs', async (req, reply) => {
  try {
    const parts = req.parts();

    const blog = {
      title: '',
      description: '',
      author: '',
     
      image: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    for await (const part of parts) {
      if (part.file) {
        // File part
        const filename = `${nanoid()}.${part.filename.split('.').pop()}`;
        const filePath = path.join(uploadDir, filename);
        await pump(part.file, fs.createWriteStream(filePath));
        blog.image = `/uploads/${filename}`;
       }
    else {
  if (part.fieldname === 'tags') {
    blog.tags = JSON.parse(part.value);
  } else if (part.fieldname === 'category') {
    blog.category = part.value;
  } else {
    blog[part.fieldname] = part.value;
  }
}

      
    }

    const result = await fastify.mongo.db.collection('blogs').insertOne(blog);

    return reply.code(201).send({
      ...blog,
      _id: result.insertedId,
    });
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
});





//tags
// fastify.post('/tags')
fastify.post('/tags', async (request, reply) => {
try{
  const {tagName} = request.body;

 const tag = await tagCollection.insertOne({tagName});
    return reply.code(201).send({ data: tag,success: true });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ error: 'Failed to save tags' });
  }
})



// fastify.get('/tags')
fastify.get('/tags', async (req, reply) => {
  try {
    const tags = await tagCollection.find().toArray();
    return reply.send(tags); // [{ name: 'reactjs' }, ...]
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: 'Failed to fetch tags' });
  }
});



fastify.get("/categories", async (request, reply) => {
  try {
    const tags = await categoriesCollection.find().toArray();
    return reply.status(200).send(tags);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
})


fastify.post("/categories", async (request, reply) => {
  const { categoryName } = request.body;
  try{
    const categories = await categoriesCollection.insertOne({categoryName})
    return reply.status(200).send({ data: categories,message: "Category created", categories})
  }
  catch(err){
    return reply.status(500).send({error: err.message})
  }
})

fastify.get("/categories/:categoryId", async (request, reply) => {
  const { categoryId } = request.params;

  try {
    const category = await categoriesCollection.findOne({
      _id: new fastify.mongo.ObjectId(categoryId),
    });

    if (!category) {
      return reply.status(404).send({ message: "Category not found" });
    }

    return reply.status(200).send(category);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
})



fastify.get('/blogs', async (request, reply) => {
  try {
    const { page = 1, limit = 10,search ="" } = request.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const blogCollection = fastify.mongo.db.collection('blogs');

    const searchQuery ={
      $or:[{ title: { $regex: search, $options: 'i' } },
        {content: { $regex: search, $options: 'i' }},
       {author: { $regex: search, $options: 'i' }},
{tags: { $regex: search, $options: 'i' }},
  {category: { $regex: search, $options: 'i' }},
     ] 
    }
    const blogs = await blogCollection
      .find(searchQuery)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    const total = await blogCollection.countDocuments(searchQuery);

    return reply.send({
      data: blogs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'Failed to fetch blogs' });
  }
});


fastify.get('/blogs/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const { ObjectId } = fastify.mongo;

    if (!ObjectId.isValid(id)) {
      return reply.code(400).send({ error: 'Invalid blog id' });
    }

    const blog = await fastify.mongo.db.collection('blogs').findOne({
      _id: new ObjectId(id),
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



fastify.put('/blogs/:id', async (req, reply) => {
  try {
    const { id } = req.params;

    const parts = req.parts();

    const updateData = {
      title: '',
      description: '',
      author: '',
      tags: [],
      category: '',
      updatedAt: new Date(),
    };

    for await (const part of parts) {
      if (part.file) {
        // Handle file upload part
        const filename = `${nanoid()}.${part.filename.split('.').pop()}`;
        const filePath = path.join(uploadDir, filename);
        await pump(part.file, fs.createWriteStream(filePath));
        updateData.image = `/uploads/${filename}`;
      }
      else {
        // Handle field part
        if (part.fieldname === 'tags') {
          try {
            updateData.tags = JSON.parse(part.value);
          } catch {
            updateData.tags = [];
          }
        } else {
          updateData[part.fieldname] = part.value;
        }
      }
    }

    // Update in DB
    const result = await fastify.mongo.db.collection('blogs').updateOne(
      { _id: new fastify.mongo.ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return reply.status(404).send({ error: 'Blog not found' });
    }

    return reply.send({ success: true, message: 'Blog updated successfully' });
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: 'Failed to update blog' });
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