/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { getAuthToken, getAllProductsPublic } from "@/lib/apiUtils";
import CollectionDialog from "./components/CollectionDialog";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image?: string;
};

type Collection = {
  id: number;
  title: string;
  description: string;
  productIds: number[];
  image?: string;
};

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: 1,
      title: "Mens clothing",
      description: "Excluded from Point of Sale",
      productIds: [1, 2, 3, 4, 5, 6],
    },
    {
      id: 2,
      title: "Other",
      description: "",
      productIds: [1],
    },
  ]);

  const [products, setProducts] = useState<Product[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(
    null
  );

  const token = getAuthToken();

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const json = await getAllProductsPublic();
      if (json.status === "success") setProducts(json.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  function handleCreate() {
    setEditMode(false);
    setCurrentCollection(null);
    setDialogOpen(true);
  }

  function handleEdit(collection: Collection) {
    setEditMode(true);
    setCurrentCollection(collection);
    setDialogOpen(true);
  }

  function handleDelete(id: number) {
    if (!confirm("Delete this collection?")) return;
    setCollections(collections.filter((c) => c.id !== id));
  }

  function handleSubmit(collectionData: Omit<Collection, "id">) {
    if (editMode && currentCollection) {
      setCollections(
        collections.map((c) =>
          c.id === currentCollection.id ? { ...collectionData, id: c.id } : c
        )
      );
    } else {
      const newId = Math.max(...collections.map((c) => c.id), 0) + 1;
      setCollections([...collections, { ...collectionData, id: newId }]);
    }
    setDialogOpen(false);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Collections</h1>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add collection
        </Button>
      </div>

      <div className="bg-white border rounded-lg">
        <div className="border-b px-4 py-3 flex items-center gap-2">
          <Button variant="ghost" size="sm" className="font-medium">
            All
          </Button>
        </div>

        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="w-8 p-3">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="text-left text-sm font-medium text-gray-700 p-3">
                Title
              </th>
              <th className="text-left text-sm font-medium text-gray-700 p-3">
                Products
              </th>
              <th className="text-left text-sm font-medium text-gray-700 p-3">
                Product conditions
              </th>
              <th className="w-20 p-3"></th>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => (
              <tr key={collection.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                      📁
                    </div>
                    <div>
                      <div className="font-medium">{collection.title}</div>
                      {collection.description && (
                        <div className="text-sm text-gray-500">
                          {collection.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-3 text-sm">{collection.productIds.length}</td>
                <td className="p-3 text-sm text-gray-500">—</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(collection)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(collection.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {collections.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">No collections yet</p>
            <Button onClick={handleCreate}>Create your first collection</Button>
          </div>
        )}

        <div className="p-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Learn more about collections
          </a>
        </div>
      </div>

      <CollectionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editMode={editMode}
        collection={currentCollection}
        products={products}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
