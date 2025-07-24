import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Radio,
  RangeSlider,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";

const Enquiry = () => {
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  let saveEnquiry = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/web/enquiry/insert", formData)
      .then((res) => {
        if (res.data.status === 1) {
          console.log(res.data);
          toast.success("Enquiry submitted successfully");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        } else {
          toast.error(res.data.message || "Submission failed");
          console.error("Error:", res.data);
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
        toast.error("Network error. Please try again.");
      });
  };

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };

    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  return (
    <div className="px-2 sm:px-4 lg:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center mt-4">User Enquiry</h1>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        <div className="bg-gray-200 p-4 w-full max-w-lg mx-auto md:mx-8 md:w-[350px] lg:w-[400px] rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-bold mb-6 text-center md:text-left">Enquiry Form </h2>
          <form action="" onSubmit={saveEnquiry} className="space-y-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Your Name</Label>
              </div>
              <TextInput
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={getValue}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1">Your email</Label>
              </div>
              <TextInput
                id="email1"
                name="email"
                type="email"
                value={formData.email}
                onChange={getValue}
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone">Your Phone</Label>
              </div>
              <TextInput
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={getValue}
                placeholder="1234567890"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="message">Your Message</Label>
              </div>
              <Textarea
                id="message"
                name="message"
                type="message"
                value={formData.message}
                onChange={getValue}
                placeholder="Your Message"
                required
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </div>

        <div className="bg-gray-200 p-4 mt-8 md:mt-0 rounded-lg shadow w-full lg:-ml-8 overflow-x-auto">
          {/* Enquiry list Table */}
          <h2 className="text-lg md:text-xl font-bold mb-6 text-center md:text-left">Enquiry List</h2>
          <div className="overflow-x-auto ">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Sr.No</TableHeadCell>
                  <TableHeadCell>Name</TableHeadCell>
                  <TableHeadCell>Email</TableHeadCell>
                  <TableHeadCell>Phone</TableHeadCell>
                  <TableHeadCell>Message</TableHeadCell>
                  <TableHeadCell>Delete</TableHeadCell>
                  <TableHeadCell>Edit</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    1
                  </TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>name@example.com</TableCell>
                  <TableCell>1234567890</TableCell>
                  <TableCell>Your Message</TableCell>

                  <TableCell>
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Delete
                    </a>
                  </TableCell>

                  <TableCell>
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Edit
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;

// import { Label, TextInput, Textarea, Button } from "flowbite-react";
// import { useState } from "react";
// import { Table } from "flowbite-react";

// export default function Enquiry() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [enquiries, setEnquiries] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setEnquiries((prev) => [...prev, formData]);
//     setFormData({ name: "", email: "", phone: "", message: "" });
//     alert("Enquiry saved");
//   };

//   return (
//     <div className="flex flex-row gap-8  px-8">
//       {/* Enquiry Form */}
//       <div className="basis-1/2 min-w-[400px] bg-white shadow-md p-8 rounded-xl">
//         <h2 className="text-2xl font-bold mb-6 text-center">Enquiry Form</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div>
//             <Label htmlFor="name">Your Name </Label>
//             <TextInput
//               id="name"
//               name="name"
//               placeholder="John Doe"
//               required
//               onChange={handleChange}
//               value={formData.name}
//             />
//           </div>
//           <div>
//             <Label htmlFor="email">Your Email</Label>
//             <TextInput
//               id="email"
//               name="email"
//               type="email"
//               placeholder="name@example.com"
//               required
//               onChange={handleChange}
//               value={formData.email}
//             />
//           </div>
//           <div>
//             <Label htmlFor="phone">Your Phone</Label>
//             <TextInput
//               id="phone"
//               name="phone"
//               type="tel"
//               placeholder="1234567890"
//               required
//               onChange={handleChange}
//               a
//               value={formData.phone}
//             />
//           </div>
//           <div>
//             <Label htmlFor="message">Your Message</Label>
//             <Textarea
//               id="message"
//               name="message"
//               placeholder="Type your message..."
//               rows={4}
//               required
//               onChange={handleChange}
//               value={formData.message}
//             />
//           </div>
//           <Button type="submit" color="blue">
//             Submit
//           </Button>
//         </form>
//       </div>
//       {/* Enquiry List Table */}
//       <div className="basis-1/2 min-w-[400px] bg-white shadow-md p-8 rounded-xl">
//         <h2 className="text-2xl font-bold mb-6 text-center">Enquiry List</h2>
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr>
//               <th className="border px-2 py-1">Name</th>
//               <th className="border px-2 py-1">Email</th>
//               <th className="border px-2 py-1">Phone</th>
//               <th className="border px-2 py-1">Message</th>
//             </tr>
//           </thead>
//           <tbody>
//             {enquiries.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center py-2">
//                   No enquiries yet.
//                 </td>
//               </tr>
//             ) : (
//               enquiries.map((enq, idx) => (
//                 <tr key={idx}>
//                   <td className="border px-2 py-1">{enq.name}</td>
//                   <td className="border px-2 py-1">{enq.email}</td>
//                   <td className="border px-2 py-1">{enq.phone}</td>
//                   <td className="border px-2 py-1">{enq.message}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
