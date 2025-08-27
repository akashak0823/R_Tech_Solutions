import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../Styles/admin/Products.css";
import ProductForm from "./components/ProductForm";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://r-tech-backend.onrender.com/api/products"
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to fetch products");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({
      _id: product._id,
      name: product.name || "",
      category: product.category || "",
      slug: product.slug || "",
      description: product.description || "",
      details: product.details || "",
      related: Array.isArray(product.related)
        ? product.related.join(", ")
        : product.related || "",
      keyFeatures: Array.isArray(product.keyFeatures)
        ? product.keyFeatures.join(", ")
        : product.keyFeatures || "",
      images: product.images || [],
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://r-tech-backend.onrender.com/api/products/${id}`
      );
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete product");
    }
  };

  const handleFormSubmit = async (form) => {
    try {
      const data = new FormData();

      data.append("_id", form._id || "");
      data.append("name", form.name);
      data.append("category", form.category);
      data.append("slug", form.slug);
      data.append("description", form.description);
      data.append("details", form.details);

      const relatedArr =
        typeof form.related === "string"
          ? form.related.split(",").map((r) => r.trim()).filter(Boolean)
          : form.related || [];
      data.append("related", JSON.stringify(relatedArr));

      const keyFeaturesArr =
        typeof form.keyFeatures === "string"
          ? form.keyFeatures.split(",").map((k) => k.trim()).filter(Boolean)
          : form.keyFeatures || [];
      data.append("keyFeatures", JSON.stringify(keyFeaturesArr));

      if (form.images && form.images.length > 0) {
        if (form.images[0] instanceof File) {
          data.append("images", form.images[0]);
        } else if (form._id) {
          data.append("oldImage", form.images[0]);
        }
      }

      let res;
      if (form._id) {
        // Editing
        res = await axios.put(
          `https://r-tech-backend.onrender.com/api/products/${form._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setProducts((prev) =>
          prev.map((p) => (p._id === form._id ? res.data : p))
        );
        toast.success("Product updated successfully");
      } else {
        // Adding
        res = await axios.post(
          "https://r-tech-backend.onrender.com/api/products",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setProducts((prev) => [...prev, res.data]);
        toast.success("Product added successfully");
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      toast.error("Failed to save product");
    }

    setModalOpen(false);
    setEditingProduct(null);
  };

  // ✅ Define columns using TanStack v8
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("category", { header: "Category" }),
    columnHelper.accessor("slug", { header: "Slug" }),
    columnHelper.accessor("description", { header: "Description" }),
    columnHelper.accessor("details", { header: "Details" }),
    columnHelper.accessor("related", {
      header: "Related",
      cell: (info) =>
        Array.isArray(info.getValue())
          ? info.getValue().join(", ")
          : info.getValue() || "",
    }),
    columnHelper.accessor("images", {
      header: "Image",
      cell: (info) => {
        const value = info.getValue();
        if (!value || value.length === 0) return "No image";
        const imgUrl = value[0]?.url || value[0];
        return (
          <img
            src={
              imgUrl?.startsWith("http")
                ? imgUrl
                : imgUrl?.replace("../", "/")
            }
            alt="Product"
            style={{ width: "60px", height: "auto", objectFit: "contain" }}
          />
        );
      },
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

  // ✅ Create the table instance
  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="products-page">
      <h2>Manage Products</h2>
      <button
        className="add-btn"
        onClick={() => {
          setEditingProduct(null);
          setModalOpen(true);
        }}
      >
        Add Product
      </button>

      <table className="products-table">
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
        <ProductForm
          initialData={editingProduct}
          onClose={() => {
            setModalOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Toast container to show toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Products;
