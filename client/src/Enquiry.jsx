import React from "react";
import { useState, useEffect } from "react";
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

  let [enquiries, setEnquiries] = useState([]);
  let [editMode, setEditMode] = useState(false);
  let [editId, setEditId] = useState(null);
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  let [deleteId, setDeleteId] = useState(null);
  let [showEditModal, setShowEditModal] = useState(false);
  let [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // Fetch enquiries when component loads
  useEffect(() => {
    getAllEnquiries();
  }, []);

  let saveEnquiry = (e) => {
    e.preventDefault();

    if (editMode) {
      // Update existing enquiry
      axios
        .put(`http://localhost:8000/api/web/enquiry/update/${editId}`, formData)
        .then((res) => {
          if (res.data.status === 1) {
            console.log(res.data);
            toast.success("Enquiry updated successfully");
            setFormData({
              name: "",
              email: "",
              phone: "",
              message: "",
            });
            setEditMode(false);
            setEditId(null);
            getAllEnquiries(); // Refresh the list after successful update
          } else {
            toast.error(res.data.message || "Update failed");
            console.error("Error:", res.data);
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
          toast.error("Network error. Please try again.");
        });
    } else {
      // Create new enquiry
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
            getAllEnquiries(); // Refresh the list after successful submission
          } else {
            toast.error(res.data.message || "Submission failed");
            console.error("Error:", res.data);
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
          toast.error("Network error. Please try again.");
        });
    }
  };

  let getAllEnquiries = () => {
    axios
      .get("http://localhost:8000/api/web/enquiry/view")
      .then((res) => {
        if (res.data.status === 1) {
          console.log("Fetched enquiries:", res.data.data);
          setEnquiries(res.data.data);
        } else {
          console.error("Error:", res.data);
          toast.error("Failed to fetch enquiries");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
        toast.error("Network error while fetching enquiries");
      });
  };

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };

    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  let deleteEnquiry = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  let confirmDelete = () => {
    axios
      .delete(`http://localhost:8000/api/web/enquiry/delete/${deleteId}`)
      .then((res) => {
        if (res.data.status === 1) {
          toast.success("Enquiry deleted successfully");
          getAllEnquiries(); // Refresh the list after successful deletion
        } else {
          toast.error(res.data.message || "Delete failed");
          console.error("Error:", res.data);
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
        toast.error("Network error. Please try again.");
      })
      .finally(() => {
        setShowDeleteModal(false);
        setDeleteId(null);
      });
  };

  let cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
    toast.info("Delete operation cancelled");
  };

  let editEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowEditModal(true);
  };

  let confirmEdit = () => {
    setFormData({
      name: selectedEnquiry.name,
      email: selectedEnquiry.email,
      phone: selectedEnquiry.phone,
      message: selectedEnquiry.message,
    });
    setEditMode(true);
    setEditId(selectedEnquiry._id);
    setShowEditModal(false);
    setSelectedEnquiry(null);
    toast.success("Edit mode activated. Update the form and submit.");
  };

  let cancelEditModal = () => {
    setShowEditModal(false);
    setSelectedEnquiry(null);
    toast.info("Edit operation cancelled");
  };

  let cancelEdit = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setEditMode(false);
    setEditId(null);
    toast.info("Edit mode cancelled");
  };

  // Delete Confirmation Modal Component
  const DeleteModal = () => (
    showDeleteModal && (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-md w-full">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 rounded-full p-2 mr-3">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Delete Enquiry</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this enquiry? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={cancelDelete}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );

  // Edit Confirmation Modal Component
  const EditModal = () => (
    showEditModal && (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-md w-full">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 rounded-full p-2 mr-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Edit Enquiry</h3>
          </div>
          <div className="mb-6">
            <p className="text-gray-600 mb-3">You are about to edit the following enquiry:</p>
            {selectedEnquiry && (
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <p><span className="font-medium">Name:</span> {selectedEnquiry.name}</p>
                <p><span className="font-medium">Email:</span> {selectedEnquiry.email}</p>
                <p><span className="font-medium">Phone:</span> {selectedEnquiry.phone}</p>
                <p><span className="font-medium">Message:</span> {selectedEnquiry.message}</p>
              </div>
            )}
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={cancelEditModal}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmEdit}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <>
      <DeleteModal />
      <EditModal />
      <div className="px-2 sm:px-4 lg:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center mt-4">User Enquiry</h1>
        <ToastContainer />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start">
        <div className="bg-gray-200 p-4 w-full h-auto max-w-lg mx-auto md:mx-8 md:w-[350px] lg:w-[400px] rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-bold mb-6 text-center md:text-left">
            {editMode ? "Edit Enquiry" : "Enquiry Form"}
          </h2>
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

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editMode ? "Update" : "Submit"}
              </Button>
              {editMode && (
                <Button 
                  type="button" 
                  color="gray" 
                  onClick={cancelEdit}
                  className="flex-1"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-gray-200 p-4 mt-8 md:mt-0 rounded-lg shadow w-full lg:-ml-8 h-[600px] flex flex-col">
          {/* Enquiry list Table */}
          <h2 className="text-lg md:text-xl font-bold mb-6 text-center md:text-left">Enquiry List</h2>
          <div className="overflow-auto flex-1">
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
                {enquiries.length === 0 ? (
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell colSpan={7} className="text-center py-4">
                      No enquiries found
                    </TableCell>
                  </TableRow>
                ) : (
                  enquiries.map((enquiry, index) => (
                    <TableRow key={enquiry._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {index + 1}
                      </TableCell>
                      <TableCell>{enquiry.name}</TableCell>
                      <TableCell>{enquiry.email}</TableCell>
                      <TableCell>{enquiry.phone}</TableCell>
                      <TableCell className="max-w-xs truncate">{enquiry.message}</TableCell>
                      <TableCell>
                        <a
                          href="#"
                          className="font-medium text-red-600 hover:underline dark:text-red-500"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteEnquiry(enquiry._id);
                          }}
                        >
                          Delete
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                          onClick={(e) => {
                            e.preventDefault();
                            editEnquiry(enquiry);
                          }}
                        >
                          Edit
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Enquiry;
