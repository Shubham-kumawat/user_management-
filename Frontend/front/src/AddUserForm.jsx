
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link, useParams } from "react-router";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  gender: yup.string().required(),
  dob: yup.date().required("Birthdate is required"),
  age: yup.number().required("Age is required"),
  city: yup.string().required(),
  university: yup.string().required(),
  imageFile: yup.mixed(), // Image optional in edit mode

  bloodGroup: yup.string().required("Blood group is required"),
  height: yup.number().required("Height is required"),
  weight: yup.number().required("Weight is required"),
  eyeColor: yup.string().required("Eye color is required"),
  hair: yup.object({
    color: yup.string().required("Hair color is required"),
    type: yup.string().required("Hair type is required"),
  }),
  address: yup.object().shape({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postalCode: yup.string().required("Postal Code is required"),
    country: yup.string().required("Country is required"),
  }),

  company: yup.object().shape({
    department: yup.string().required("Department is required"),
    name: yup.string().required("Company name is required"),
    title: yup.string().required("Title is required"),
    address: yup.object().shape({
      address: yup.string().required("Company address is required"),
      city: yup.string().required("Company city is required"),
      state: yup.string().required("Company state is required"),
      country: yup.string().required("Company country is required"),
    }),
  }),
});

const AddUserForm = () => {
  const { userId } = useParams();
  const [existingImage, setExistingImage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userId) {
      // Fetch user details for edit/view
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then(({ data }) => {
          reset({
            firstName: data.fullName?.split(" ")[0] || "",
            lastName: data.fullName?.split(" ")[1] || "",
            email: data.email || "",
            phone: data.phone || "",
            gender: data.gender || "",
            dob: data.dob ? data.dob.split("T")[0] : "",
            age: data.age || "",
            city: data.city || "",
            university: data.university || "",

            bloodGroup: data.bloodGroup || "",
            height: data.height || "",
            weight: data.weight || "",
            eyeColor: data.eyeColor || "",
            hair: {
              color: data.hair?.color || "",
              type: data.hair?.type || "",
            },

            address: {
              address: data.address?.address || "",
              city: data.address?.city || "",
              state: data.address?.state || "",
              postalCode: data.address?.postalCode || "",
              country: data.address?.country || "",
            },

            company: {
              department: data.company?.department || "",
              name: data.company?.name || "",
              title: data.company?.title || "",
              address: {
                address: data.company?.address?.address || "",
                city: data.company?.address?.city || "",
                state: data.company?.address?.state || "",
                country: data.company?.address?.country || "",
              },
            },
          });

          if (data.filePath) {
            setExistingImage(`http://localhost:3000/${data.filePath}`);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user", err);
          alert("Failed to load user data");
        });
    }
  }, [userId, reset]);

  const onSubmit = async (data) => {
    try {
      let filePath = "";

      if (data.imageFile && data.imageFile.length > 0) {
        // Upload new image if selected
        const formData = new FormData();
        formData.append("image", data.imageFile[0]);
        const uploadRes = await axios.post("http://localhost:3000/upload", formData);
        filePath = uploadRes.data.filePath;
      }

      const fullName = `${data.firstName} ${data.lastName}`;

      const userPayload = {
        fullName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        dob: new Date(data.dob).toISOString().split("T")[0],
        age: data.age,
        city: data.city,
        university: data.university,
        bloodGroup: data.bloodGroup,
        height: data.height,
        weight: data.weight,
        eyeColor: data.eyeColor,
        hair: {
          color: data.hair.color,
          type: data.hair.type,
        },
        address: {
          address: data.address.address,
          city: data.address.city,
          state: data.address.state,
          postalCode: data.address.postalCode,
          country: data.address.country,
        },
        company: {
          department: data.company.department,
          name: data.company.name,
          title: data.company.title,
          address: {
            address: data.company.address.address,
            city: data.company.address.city,
            state: data.company.address.state,
            country: data.company.address.country,
          },
        },
      };

      if (filePath) {
        userPayload.filePath = filePath;
      }

      if (userId) {
        await axios.put(`http://localhost:3000/users/${userId}`, userPayload);
        alert("User updated successfully!");
      } else {
        await axios.post("http://localhost:3000/users", userPayload);
        alert("User created successfully!");
        reset();
        setExistingImage("");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex justify-end mt-4 mb-4">
        <Link
          to="/"
          className="inline-block px-4 py-2 absolute top-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 mb-10 bg-gray-100 p-6 rounded-lg shadow"
      >
        <input {...register("firstName")} placeholder="First Name" />
        <input {...register("lastName")} placeholder="Last Name" />
        <input {...register("email")} placeholder="Email" />
        <input {...register("phone")} placeholder="Phone" />
        <input type="date" {...register("dob")} placeholder="Date of birth" />
        <input {...register("age")} placeholder="Age" />
        <input {...register("gender")} placeholder="Gender" />
        <input {...register("city")} placeholder="City" />
        <input {...register("university")} placeholder="University" />

        {/* Show existing image if available */}
        {existingImage && (
          <div className="col-span-2">
            <p>Current Image:</p>
            <img src={existingImage} alt="User" width="150" className="mb-2 rounded" />
          </div>
        )}

        <input type="file" accept="image/*" {...register("imageFile")} />

        <h3 className="col-span-2 font-semibold mt-4">Personal Details</h3>

        <input {...register("bloodGroup")} placeholder="Blood Group" />
        <input type="number" {...register("height")} placeholder="Height (cm)" />
        <input type="number" {...register("weight")} placeholder="Weight (kg)" />
        <input {...register("eyeColor")} placeholder="Eye Color" />
        <input {...register("hair.color")} placeholder="Hair Color" />
        <input {...register("hair.type")} placeholder="Hair Type" />

        <h3 className="col-span-2 font-semibold mt-4">Address Details</h3>

        <input {...register("address.address")} placeholder="Street Address" />
        <input {...register("address.city")} placeholder="City" />
        <input {...register("address.state")} placeholder="State" />
        <input {...register("address.postalCode")} placeholder="Postal Code" />
        <input {...register("address.country")} placeholder="Country" />

        <h3 className="col-span-2 font-semibold mt-4">Company Details</h3>

        <input {...register("company.department")} placeholder="Department" />
        <input {...register("company.name")} placeholder="Company Name" />
        <input {...register("company.title")} placeholder="Job Title" />

        <h4 className="col-span-2 font-medium mt-2">Company Address</h4>

        <input {...register("company.address.address")} placeholder="Company Address" />
        <input {...register("company.address.city")} placeholder="City" />
        <input {...register("company.address.state")} placeholder="State" />
        <input {...register("company.address.country")} placeholder="Country" />

        <div className="col-span-2 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {userId ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
