
// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import get from "lodash.get";

// const schema = yup.object().shape({
//   // Keep existing validations
//   firstName: yup.string().required("First name is required"),
//   lastName: yup.string().required("Last name is required"),
//   age: yup.number().required("Age is required"),
//   gender: yup.string().required("Gender is required"),
//   email: yup.string().email().required("Email is required"),
//   phone: yup.string().required("Phone number is required"),
//   username: yup.string().required("Username is required"),
//   password: yup.string().min(6).required("Password is required"),
//   birthDate: yup.date().required("Birthdate is required"),
//   // Make image optional or remove it
//   image: yup.string().url("Invalid URL").notRequired(),
//   bloodGroup: yup.string().required("Blood group is required"),
//   height: yup.number().required("Height is required"),
//   weight: yup.number().required("Weight is required"),
//   eyeColor: yup.string().required("Eye color is required"),
//   hair: yup.object({
//     color: yup.string().required("Hair color is required"),
//     type: yup.string().required("Hair type is required"),
//   }),
//   ip: yup.string().required("IP is required"),
//   macAddress: yup.string().required("MAC is required"),
//   userAgent: yup.string().required("User Agent is required"),
//   role: yup.string().required("Role is required"),
//   address: yup.object({
//     address: yup.string().required(),
//     city: yup.string().required(),
//     state: yup.string().required(),
//     stateCode: yup.string().required(),
//     postalCode: yup.string().required(),
//     country: yup.string().required(),
//     coordinates: yup.object({
//       lat: yup.number().required(),
//       lng: yup.number().required(),
//     }),
//   }),
//   university: yup.string().required(),
//   bank: yup.object({
//     cardExpire: yup.string().required(),
//     cardNumber: yup.string().required(),
//     cardType: yup.string().required(),
//     currency: yup.string().required(),
//     iban: yup.string().required(),
//   }),
//   company: yup.object({
//     department: yup.string().required(),
//     name: yup.string().required(),
//     title: yup.string().required(),
//     address: yup.object({
//       address: yup.string().required(),
//       city: yup.string().required(),
//       state: yup.string().required(),
//       country: yup.string().required(),
//       
//       }),
//     }),
//   }),
//   ein: yup.string().required(),
//   ssn: yup.string().required(),
//   crypto: yup.object({
//     coin: yup.string().required(),
//     wallet: yup.string().required(),
//     network: yup.string().required(),
//   }),
// });

// const AddUserForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       const file = data.imageFile?.[0];

//       if (file) {
//         formData.append("image", file);

//         const response = await fetch("http://localhost:3000/upload", {
//           method: "POST",
//           body: formData,
//         });

//         const result = await response.json();
//         console.log("Upload success:", result);
//         alert("File uploaded successfully!");
//       } else {
//         alert("No file selected");
//       }
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("File upload failed!");
//     }
//   };

//   const renderInput = (name, label, type = "text") => {
//     const errorMessage = get(errors,` ${name}.message`);

//     return (
//       <div className="flex flex-col gap-2">
//         <label className="text-sm font-medium text-gray-700">{label}</label>
//         <input
//           type={type}
//           {...register(name)}
//           className={`px-4 py-3 border ${
//             errorMessage ? "border-red-500" : "border-gray-300"
//           } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//         />
//         {errorMessage && (
//           <span className="text-xs text-red-600">{errorMessage}</span>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="px-4 py-10 flex justify-center">
//       <div className="max-w-4xl w-full mx-auto bg-white shadow-xl rounded-2xl p-6">
//         <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
//           User Registration Form
//         </h1>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
//             {renderInput("firstName", "First Name")}
//             {renderInput("lastName", "Last Name")}
//             {renderInput("age", "Age", "number")}
//             {renderInput("gender", "Gender")}
//             {renderInput("email", "Email", "email")}
//             {renderInput("phone", "Phone")}
//             {renderInput("username", "Username")}
//             {renderInput("password", "Password", "password")}
//             {renderInput("birthDate", "Birth Date", "date")}
//             {renderInput("bloodGroup", "Blood Group")}
//             {renderInput("height", "Height")}
//             {renderInput("weight", "Weight")}
//             {renderInput("eyeColor", "Eye Color")}
//             {renderInput("hair.color", "Hair Color")}
//             {renderInput("hair.type", "Hair Type")}
//             {renderInput("ip", "IP Address")}
//             {renderInput("macAddress", "MAC Address")}
//             {renderInput("userAgent", "User Agent")}
//             {renderInput("role", "Role")}
//             {renderInput("address.address", "Address")}
//             {renderInput("address.city", "City")}
//             {renderInput("address.state", "State")}
//             {renderInput("address.stateCode", "State Code")}
//             {renderInput("address.postalCode", "Postal Code")}
//             {renderInput("address.country", "Country")}
//             {renderInput("address.coordinates.lat", "Latitude")}
//             {renderInput("address.coordinates.lng", "Longitude")}
//             {renderInput("university", "University")}
//             {renderInput("bank.cardExpire", "Card Expiry")}
//             {renderInput("bank.cardNumber", "Card Number")}
//             {renderInput("bank.cardType", "Card Type")}
//             {renderInput("bank.currency", "Currency")}
//             {renderInput("bank.iban", "IBAN")}
//             {renderInput("company.department", "Company Department")}
//             {renderInput("company.name", "Company Name")}
//             {renderInput("company.title", "Company Title")}
//             {renderInput("company.address.address", "Company Address")}
//             {renderInput("company.address.city", "Company City")}
//             {renderInput("company.address.state", "Company State")}
//             {renderInput("company.address.stateCode", "Company State Code")}
//             {renderInput("company.address.postalCode", "Company Postal Code")}
//             {renderInput("company.address.country", "Company Country")}
//             {renderInput("company.address.coordinates.lat", "Company Latitude")}
//             {renderInput("company.address.coordinates.lng", "Company Longitude")}
//             {renderInput("ein", "EIN")}
//             {renderInput("ssn", "SSN")}
//             {renderInput("crypto.coin", "Crypto Coin")}
//             {renderInput("crypto.wallet", "Crypto Wallet")}
//             {renderInput("crypto.network", "Crypto Network")}
//           </div>

//           {/* 🔽 File Upload Field */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium text-gray-700">Upload Image File</label>
//             <input
//               type="file"
//               {...register("imageFile")}
//               accept="image/*"
//               className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Optional Preview */}
//           {watch("imageFile")?.[0] && (
//             <img
//               src={URL.createObjectURL(watch("imageFile")[0])}
//               alt="Preview"
//               className="w-40 h-40 object-cover mt-4 rounded"
//             />
//           )}

//           <div className="mt-10">
//             <button
//               type="submit"
//               className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddUserForm;



import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link } from "react-router";

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
  imageFile: yup.mixed().required("Image is required"),

  // Personal Details validation
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

const AddUserForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      // Upload file
   
      const formData = new FormData();
      formData.append("image", data.imageFile[0]);

      const uploadRes = await axios.post("http://localhost:3000/upload", formData);
      const filePath = uploadRes.data.filePath;

      // Build user data
      const fullName = `${data.firstName} ${data.lastName}`;
      const userPayload = {
        fullName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        dob: new Date(data.dob).toISOString().split('T')[0],
        age : data.age,
        city: data.city,
        university: data.university,
        filePath,
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

      await axios.post("http://localhost:3000/users", userPayload);

      alert("User created!");
      reset();
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


      
         <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 mb-10 bg-gray-100 p-6 rounded-lg shadow">
      <input {...register("firstName")} placeholder="First Name" />
      <input {...register("lastName")} placeholder="Last Name" />
      <input {...register("email")} placeholder="Email" />
      <input {...register("phone")} placeholder="Phone" />
      <input type="date"{...register("dob")} placeholder="Date of birth" />
      <input {...register("age")} placeholder="age" />
      <input {...register("gender")} placeholder="Gender" />
      <input {...register("city")} placeholder="City" />
      <input {...register("university")} placeholder="University" />
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
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Submit
        </button>
      </div>
    </form>
    </div>
 
  );
};

export default AddUserForm; 


