/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { X, Upload, Search } from "lucide-react";

const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

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

interface CollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editMode: boolean;
  collection: Collection | null;
  products: Product[];
  onSubmit: (collectionData: Omit<Collection, "id">) => void;
}

export default function CollectionDialog({
  open,
  onOpenChange,
  editMode,
  collection,
  products,
  onSubmit,
}: CollectionDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    productIds: [] as number[],
    image: null as File | null,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (editMode && collection) {
      setFormData({
        title: collection.title,
        description: collection.description,
        productIds: collection.productIds,
        image: null,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        productIds: [],
        image: null,
      });
    }
  }, [editMode, collection, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert File to a format compatible with Collection type
    const submitData: Omit<Collection, "id"> = {
      title: formData.title,
      description: formData.description,
      productIds: formData.productIds,
      image: formData.image ? URL.createObjectURL(formData.image) : undefined,
    };
    onSubmit(submitData);
  };

  const toggleProduct = (productId: number) => {
    setFormData((prev) => ({
      ...prev,
      productIds: prev.productIds.includes(productId)
        ? prev.productIds.filter((id) => id !== productId)
        : [...prev.productIds, productId],
    }));
  };

  const removeProduct = (productId: number) => {
    setFormData((prev) => ({
      ...prev,
      productIds: prev.productIds.filter((id) => id !== productId),
    }));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedProducts = products.filter((p) =>
    formData.productIds.includes(p.id)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Edit Collection" : "Add Collection"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto space-y-6 pr-2"
        >
          {/* Title */}
          <div>
            <Label className="text-sm font-medium">Title</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Men's Clothing"
              className="mt-1"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm font-medium">Description</Label>
            <div className="mt-1 border rounded-md">
              <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
                <select className="text-sm border-none bg-transparent">
                  <option>Paragraph</option>
                </select>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                  >
                    <strong>B</strong>
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                  >
                    <em>I</em>
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                  >
                    <u>U</u>
                  </Button>
                </div>
              </div>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-3 min-h-[120px] border-none focus:outline-none focus:ring-0"
                placeholder="Add description..."
              />
            </div>
          </div>

          {/* Publishing */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Publishing</h3>
              <Button
                type="button"
                variant="link"
                className="text-blue-600 p-0 h-auto"
              >
                Manage
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Online Store</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-3 flex items-start gap-2">
                <div className="text-blue-600 mt-0.5">ℹ️</div>
                <div className="text-sm text-blue-900">
                  To add this collection to your online store's navigation,{" "}
                  <button type="button" className="text-blue-600 underline">
                    you need to update your menu
                  </button>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-auto h-5 w-5"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div>
            <Label className="text-sm font-medium">Image</Label>
            <div className="mt-1 border-2 border-dashed rounded-lg p-8 text-center hover:border-gray-400 transition cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files?.[0] || null,
                  })
                }
                className="hidden"
                id="collection-image"
              />
              <label htmlFor="collection-image" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <div className="font-medium">Add image</div>
                <div className="text-sm text-gray-500">
                  or drop an image to upload
                </div>
              </label>
            </div>
          </div>

          {/* Products Section */}
          <div className="border rounded-lg">
            <div className="p-4 border-b">
              <h3 className="font-medium mb-3">Products</h3>

              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button type="button" variant="outline">
                  Browse
                </Button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-md px-3 text-sm"
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="oldest">Sort: Oldest</option>
                  <option value="name">Sort: Name</option>
                </select>
              </div>

              {/* Selected Products */}
              {selectedProducts.length > 0 && (
                <div className="space-y-2 mb-4">
                  {selectedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {product.image ? (
                          <img
                            src={`${MEDIA_URL}/${product.image}`}
                            alt={product.name}
                            className="h-10 w-10 object-cover rounded"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-200 rounded" />
                        )}
                        <span className="text-sm font-medium">
                          {product.name}
                        </span>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        Active
                      </span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeProduct(product.id)}
                        className="h-7 w-7"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Products List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleProduct(product.id)}
                >
                  <div className="text-gray-400 text-sm w-6">{index + 1}.</div>
                  {product.image ? (
                    <img
                      src={`${MEDIA_URL}/${product.image}`}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-200 rounded" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-sm">{product.name}</div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                    Active
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.productIds.includes(product.id)}
                    onChange={() => toggleProduct(product.id)}
                    className="rounded"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Theme Template */}
          <div>
            <Label className="text-sm font-medium">Theme template</Label>
            <select className="w-full mt-1 border rounded-md p-2 text-sm">
              <option>Default collection</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t sticky bottom-0 bg-white">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editMode ? "Update Collection" : "Create Collection"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
