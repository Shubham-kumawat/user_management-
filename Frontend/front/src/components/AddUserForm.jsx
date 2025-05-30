import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

// Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.date().required("Birthdate is required").typeError("Please enter a valid date"),
  age: yup.number().required("Age is required").positive("Age must be positive").integer("Age must be a whole number"),
  city: yup.string().required("City is required"),
  university: yup.string().required("University is required"),
  imageFile: yup.mixed(),
  bloodGroup: yup.string().required("Blood group is required"),
  height: yup.number().required("Height is required").positive("Height must be positive"),
  weight: yup.number().required("Weight is required").positive("Weight must be positive"),
  eyeColor: yup.string().required("Eye color is required"),
  hair: yup.object({
    color: yup.string().required("Hair color is required"),
    type: yup.string().required("Hair type is required"),
  }),
  address: yup.object().shape({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postalCode: yup.string().required("Postal code is required"),
    country: yup.string().required("Country is required"),
  }),
  company: yup.object().shape({
    department: yup.string().required("Department is required"),
    name: yup.string().required("Company name is required"),
    title: yup.string().required("Job title is required"),
    address: yup.object().shape({
      address: yup.string().required("Company address is required"),
      city: yup.string().required("Company city is required"),
      state: yup.string().required("Company state is required"),
      country: yup.string().required("Company country is required"),
    }),
  }),
});

const AddUserForm = ({ mode = "create" }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [existingImage, setExistingImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const isViewMode = mode === "view";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Fetch user data when in edit/view mode
  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      setIsLoading(true);
      setServerError("");
      
      try {
        const { data } = await axios.get(`http://localhost:3000/users/${userId}`);
        
        // Set all form values
        setValue("firstName", data.firstName || data.fullName?.split(" ")[0] || "");
        setValue("lastName", data.lastName || data.fullName?.split(" ")[1] || "");
        setValue("email", data.email || "");
        setValue("phone", data.phone || "");
        setValue("gender", data.gender || "");
        setValue("dob", data.dob ? data.dob.split("T")[0] : "");
        setValue("age", data.age || "");
        setValue("city", data.city || "");
        setValue("university", data.university || "");
        setValue("bloodGroup", data.bloodGroup || "");
        setValue("height", data.height || "");
        setValue("weight", data.weight || "");
        setValue("eyeColor", data.eyeColor || "");
        
        // Nested objects
        setValue("hair.color", data.hair?.color || "");
        setValue("hair.type", data.hair?.type || "");
        setValue("address.address", data.address?.address || "");
        setValue("address.city", data.address?.city || "");
        setValue("address.state", data.address?.state || "");
        setValue("address.postalCode", data.address?.postalCode || "");
        setValue("address.country", data.address?.country || "");
        setValue("company.department", data.company?.department || "");
        setValue("company.name", data.company?.name || "");
        setValue("company.title", data.company?.title || "");
        setValue("company.address.address", data.company?.address?.address || "");
        setValue("company.address.city", data.company?.address?.city || "");
        setValue("company.address.state", data.company?.address?.state || "");
        setValue("company.address.country", data.company?.address?.country || "");

        // Handle image
        if (data.image || data.filePath) {
          setExistingImage(data.image || `http://localhost:3000${data.filePath}`);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setServerError("Failed to load user data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId, setValue]);

  // Form submission
  const onSubmit = async (formData) => {
    if (isViewMode) return; // Prevent submission in view mode
    
    setServerError("");
    try {
      let imageUrl = existingImage ? existingImage.replace("http://localhost:3000", "") : "";

      // Upload new image if provided
      if (formData.imageFile && formData.imageFile.length > 0) {
        const uploadFormData = new FormData();
        uploadFormData.append("image", formData.imageFile[0]);
        
        const uploadResponse = await axios.post(
          "http://localhost:3000/upload", 
          uploadFormData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        
        imageUrl = uploadResponse.data.filePath;
      }

      // Prepare payload
      const userPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        dob: new Date(formData.dob).toISOString(),
        age: formData.age,
        city: formData.city,
        university: formData.university,
        bloodGroup: formData.bloodGroup,
        height: formData.height,
        weight: formData.weight,
        eyeColor: formData.eyeColor,
        hair: {
          color: formData.hair.color,
          type: formData.hair.type,
        },
        address: {
          address: formData.address.address,
          city: formData.address.city,
          state: formData.address.state,
          postalCode: formData.address.postalCode,
          country: formData.address.country,
        },
        company: {
          department: formData.company.department,
          name: formData.company.name,
          title: formData.company.title,
          address: {
            address: formData.company.address.address,
            city: formData.company.address.city,
            state: formData.company.address.state,
            country: formData.company.address.country,
          },
        },
      };

      if (imageUrl) {
        userPayload.filePath = imageUrl;
      }

      // Update or create user
      if (userId) {
        await axios.put(`http://localhost:3000/users/${userId}`, userPayload);
        alert("User updated successfully!");
      } else {
        await axios.post("http://localhost:3000/users", userPayload);
        alert("User created successfully!");
        reset();
        setExistingImage("");
      }
      
      navigate("/");
    } catch (error) {
      console.error("Submission error:", error);
      setServerError("Something went wrong. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {isViewMode ? "View User" : userId ? "Edit User" : "Add New User"}
        </h1>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {isViewMode ? "Back to List" : "Cancel"}
        </Link>
      </div>

      {serverError && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow">
        {/* Basic Information Section */}
        <fieldset className="mb-8 p-4 border border-gray-200 rounded">
          <legend className="px-2 text-lg font-semibold text-gray-700">Basic Information</legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
              <input
                {...register("firstName")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
              <input
                {...register("lastName")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
              <input
                type="email"
                {...register("email")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
              <input
                {...register("phone")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
              <input
                type="date"
                {...register("dob")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.dob ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.dob && (
                <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
              )}
            </div>

            {/* Age */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Age*</label>
              <input
                type="number"
                {...register("age")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.age ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
              )}
            </div>

            {/* Gender */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
              <select
                {...register("gender")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>

            {/* City */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
              <input
                {...register("city")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            {/* University */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">University*</label>
              <input
                {...register("university")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.university ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.university && (
                <p className="mt-1 text-sm text-red-600">{errors.university.message}</p>
              )}
            </div>

            {/* Profile Image */}
            <div className="form-group col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
              
              {existingImage && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                  <img 
                    src={existingImage} 
                    alt="Profile" 
                    className="w-32 h-32 object-cover rounded border"
                  />
                </div>
              )}
              
              <input
                type="file"
                accept="image/*"
                {...register("imageFile")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  isViewMode ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
                }`}
              />
            </div>
          </div>
        </fieldset>

        {/* Physical Attributes Section */}
        <fieldset className="mb-8 p-4 border border-gray-200 rounded">
          <legend className="px-2 text-lg font-semibold text-gray-700">Physical Attributes</legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Blood Group */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group*</label>
              <select
                {...register("bloodGroup")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.bloodGroup ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors.bloodGroup && (
                <p className="mt-1 text-sm text-red-600">{errors.bloodGroup.message}</p>
              )}
            </div>

            {/* Height */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)*</label>
              <input
                type="number"
                {...register("height")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.height ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.height && (
                <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>
              )}
            </div>

            {/* Weight */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)*</label>
              <input
                type="number"
                {...register("weight")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.weight ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.weight && (
                <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
              )}
            </div>

            {/* Eye Color */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Eye Color*</label>
              <input
                {...register("eyeColor")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.eyeColor ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.eyeColor && (
                <p className="mt-1 text-sm text-red-600">{errors.eyeColor.message}</p>
              )}
            </div>

            {/* Hair Color */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Hair Color*</label>
              <input
                {...register("hair.color")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.hair?.color ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.hair?.color && (
                <p className="mt-1 text-sm text-red-600">{errors.hair.color.message}</p>
              )}
            </div>

            {/* Hair Type */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Hair Type*</label>
              <input
                {...register("hair.type")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.hair?.type ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.hair?.type && (
                <p className="mt-1 text-sm text-red-600">{errors.hair.type.message}</p>
              )}
            </div>
          </div>
        </fieldset>

        {/* Address Information Section */}
        <fieldset className="mb-8 p-4 border border-gray-200 rounded">
          <legend className="px-2 text-lg font-semibold text-gray-700">Address Information</legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Street Address */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address*</label>
              <input
                {...register("address.address")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.address?.address ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.address?.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.address.message}</p>
              )}
            </div>

            {/* City */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
              <input
                {...register("address.city")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.address?.city ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.address?.city && (
                <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
              )}
            </div>

            {/* State */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
              <input
                {...register("address.state")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.address?.state ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.address?.state && (
                <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>
              )}
            </div>

            {/* Postal Code */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code*</label>
              <input
                {...register("address.postalCode")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.address?.postalCode ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.address?.postalCode && (
                <p className="mt-1 text-sm text-red-600">{errors.address.postalCode.message}</p>
              )}
            </div>

            {/* Country */}
            <div className="form-group col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
              <input
                {...register("address.country")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.address?.country ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.address?.country && (
                <p className="mt-1 text-sm text-red-600">{errors.address.country.message}</p>
              )}
            </div>
          </div>
        </fieldset>

        {/* Company Information Section */}
        <fieldset className="mb-8 p-4 border border-gray-200 rounded">
          <legend className="px-2 text-lg font-semibold text-gray-700">Company Information</legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Department */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
              <input
                {...register("company.department")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.company?.department ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.company?.department && (
                <p className="mt-1 text-sm text-red-600">{errors.company.department.message}</p>
              )}
            </div>

            {/* Company Name */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
              <input
                {...register("company.name")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.company?.name ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.company?.name && (
                <p className="mt-1 text-sm text-red-600">{errors.company.name.message}</p>
              )}
            </div>

            {/* Job Title */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
              <input
                {...register("company.title")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.company?.title ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.company?.title && (
                <p className="mt-1 text-sm text-red-600">{errors.company.title.message}</p>
              )}
            </div>

            {/* Company Address - Street */}
            <div className="form-group col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Address*</label>
              <input
                {...register("company.address.address")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.company?.address?.address ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.company?.address?.address && (
                <p className="mt-1 text-sm text-red-600">{errors.company.address.address.message}</p>
              )}
            </div>

            {/* Company Address - City */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company City*</label>
              <input
                {...register("company.address.city")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.company?.address?.city ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.company?.address?.city && (
                <p className="mt-1 text-sm text-red-600">{errors.company.address.city.message}</p>
              )}
            </div>

            {/* Company Address - State */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company State*</label>
              <input
                {...register("company.address.state")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.company?.address?.state ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.company?.address?.state && (
                <p className="mt-1 text-sm text-red-600">{errors.company.address.state.message}</p>
              )}
            </div>

            {/* Company Address - Country */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Country*</label>
              <input
                {...register("company.address.country")}
                disabled={isSubmitting || isViewMode}
                className={`w-full px-3 py-2 border rounded ${
                  errors.company?.address?.country ? "border-red-500" : "border-gray-300"
                } ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.company?.address?.country && (
                <p className="mt-1 text-sm text-red-600">{errors.company.address.country.message}</p>
              )}
            </div>
          </div>
        </fieldset>

        {/* Submit Button (Hidden in View Mode) */}
        {!isViewMode && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded text-white font-medium ${
                isSubmitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {userId ? "Updating..." : "Creating..."}
                </span>
              ) : (
                <span>{userId ? "Update User" : "Create User"}</span>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddUserForm;