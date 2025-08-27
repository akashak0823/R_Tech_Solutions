import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/admin/Products.css";
import TestimonialForm from "./components/TestimonialForm";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(
        "https://r-tech-backend.onrender.com/api/testimonials"
      );
      setTestimonials(res.data);
    } catch (err) {
      toast.error("Failed to fetch testimonials");
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://r-tech-backend.onrender.com/api/testimonials/${id}`
      );
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      toast.success("Testimonial deleted successfully");
    } catch (err) {
      toast.error("Failed to delete testimonial");
    }
  };

  const handleFormSubmit = async (form) => {
    try {
      const data = new FormData();
      data.append("_id", form._id || "");
      data.append("name", form.name);
      data.append("position", form.position);
      data.append("message", form.message);

      if (form.video instanceof File) {
        data.append("video", form.video);
      } else if (form._id) {
        data.append("oldVideo", form.video);
      }

      let res;
      if (form._id) {
        res = await axios.put(
          `https://r-tech-backend.onrender.com/api/testimonials/${form._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setTestimonials((prev) =>
          prev.map((t) => (t._id === form._id ? res.data : t))
        );
        toast.success("Testimonial updated successfully");
      } else {
        res = await axios.post(
          "https://r-tech-backend.onrender.com/api/testimonials",
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setTestimonials((prev) => [...prev, res.data]);
        toast.success("Testimonial added successfully");
      }
    } catch (err) {
      toast.error("Failed to save testimonial");
    }

    setModalOpen(false);
    setEditingTestimonial(null);
  };

  // ✅ TanStack Table Columns
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "message",
      header: "Message",
    },
    {
      accessorKey: "video",
      header: "Video",
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? (
          <video
            src={value.startsWith("http") ? value : value.replace("../", "/")}
            width="100"
            controls
          />
        ) : (
          "No video"
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div>
          <button onClick={() => handleEdit(row.original)}>Edit</button>
          <button
            onClick={() => handleDelete(row.original._id)}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // ✅ React Table instance
  const table = useReactTable({
    data: testimonials,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="products-page">
      <h2>Manage Testimonials</h2>
      <button
        className="add-btn"
        onClick={() => {
          setEditingTestimonial(null);
          setModalOpen(true);
        }}
      >
        Add Testimonial
      </button>

      <table className="products-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <TestimonialForm
          initialData={editingTestimonial}
          onClose={() => {
            setModalOpen(false);
            setEditingTestimonial(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminTestimonials;
