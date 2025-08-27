import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../Styles/admin/Services.css";
import ServiceForm from "./components/ServiceForm";

const Services = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        "https://r-tech-backend.onrender.com/api/services"
      );
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      toast.error("Failed to load services.");
    }
  };

  const handleEdit = (service) => {
    setEditingService({
      ...service,
      keyFeatures: Array.isArray(service.keyFeatures)
        ? service.keyFeatures.join(", ")
        : "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://r-tech-backend.onrender.com/api/services/${id}`
      );
      setServices((prev) => prev.filter((s) => s._id !== id));
      toast.success("Service deleted successfully.");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete service.");
    }
  };

  const handleFormSubmit = async (form) => {
    try {
      const formData = new FormData();
      formData.append("title", form.title?.trim() || "");
      formData.append("category", form.category?.trim() || "");
      formData.append("slug", form.slug?.trim() || "");
      formData.append("description", form.description?.trim() || "");

      let featuresArray = [];
      if (typeof form.keyFeatures === "string") {
        featuresArray = form.keyFeatures
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      } else if (Array.isArray(form.keyFeatures)) {
        featuresArray = form.keyFeatures;
      }
      formData.append("keyFeatures", JSON.stringify(featuresArray));

      if (form.icon) {
        formData.append("icon", form.icon);
      }
      if (form.media) {
        formData.append("media", form.media);
      }

      let res;
      if (editingService) {
        res = await axios.put(
          `https://r-tech-backend.onrender.com/api/services/${editingService._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setServices((prev) =>
          prev.map((s) => (s._id === editingService._id ? res.data : s))
        );
        toast.success("Service updated successfully.");
      } else {
        res = await axios.post(
          "https://r-tech-backend.onrender.com/api/services",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setServices((prev) => [...prev, res.data]);
        toast.success("Service added successfully.");
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      toast.error("Operation failed. Please try again.");
    }

    setModalOpen(false);
    setEditingService(null);
  };

  // ✅ Define columns properly with TanStack v8
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
    }),
    columnHelper.accessor("category", {
      header: "Category",
    }),
    columnHelper.accessor("slug", {
      header: "Slug",
    }),
    columnHelper.accessor("keyFeatures", {
      header: "Key Features",
      cell: (info) =>
        Array.isArray(info.getValue()) ? info.getValue().join(", ") : "",
    }),
    columnHelper.accessor("media", {
      header: "Media",
      cell: (info) => {
        const value = info.getValue();
        if (!value || !value.url) return "N/A";
        if (value.resource_type === "video") {
          return (
            <video width="120" controls>
              <source src={value.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        }
        return (
          <img
            src={value.url}
            alt="media"
            style={{ width: "60px", borderRadius: 4 }}
          />
        );
      },
    }),
    columnHelper.accessor("icon", {
      header: "Icon",
      cell: (info) =>
        info.getValue() ? (
          <img
            src={info.getValue()}
            alt="icon"
            style={{ width: "60px", borderRadius: 4 }}
          />
        ) : (
          "N/A"
        ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <>
          <button onClick={() => handleEdit(info.row.original)}>Edit</button>
          <button
            onClick={() => handleDelete(info.row.original._id)}
            className="delete-btn"
          >
            Delete
          </button>
        </>
      ),
    }),
  ];

  // ✅ Initialize table with TanStack v8 API
  const table = useReactTable({
    data: services,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="services-page">
      <h2>Manage Services</h2>
      <button className="add-btn" onClick={() => setModalOpen(true)}>
        Add Service
      </button>

      <table className="services-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
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
        <ServiceForm
          type="service"
          initialData={editingService}
          onClose={() => {
            setModalOpen(false);
            setEditingService(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Services;
