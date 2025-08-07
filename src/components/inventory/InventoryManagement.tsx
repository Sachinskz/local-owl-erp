import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Package, 
  Plus, 
  Search, 
  AlertTriangle, 
  Edit, 
  TrendingDown,
  TrendingUp,
  Minus
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample inventory data
const sampleInventory = [
  { 
    id: 1, 
    sku: "BAN001", 
    name: "Bananas", 
    category: "Fruits", 
    quantity: 45, 
    minStock: 20, 
    price: 20, 
    supplier: "Local Farm",
    lastUpdated: "2024-01-15"
  },
  { 
    id: 2, 
    sku: "MLK001", 
    name: "Milk (1L)", 
    category: "Dairy", 
    quantity: 15, 
    minStock: 25, 
    price: 55, 
    supplier: "Dairy Co",
    lastUpdated: "2024-01-14"
  },
  { 
    id: 3, 
    sku: "BRD001", 
    name: "White Bread", 
    category: "Bakery", 
    quantity: 8, 
    minStock: 15, 
    price: 35, 
    supplier: "Local Bakery",
    lastUpdated: "2024-01-15"
  },
  { 
    id: 4, 
    sku: "APP001", 
    name: "Apples", 
    category: "Fruits", 
    quantity: 30, 
    minStock: 20, 
    price: 80, 
    supplier: "Fruit Express",
    lastUpdated: "2024-01-15"
  },
];

export default function InventoryManagement() {
  const [inventory, setInventory] = useState(sampleInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "", sku: "", category: "", quantity: 0, minStock: 0, price: 0, supplier: ""
  });

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity === 0) return { status: "Out of Stock", color: "destructive" };
    if (quantity <= minStock) return { status: "Low Stock", color: "warning" };
    return { status: "In Stock", color: "success" };
  };

  const handleAddProduct = () => {
    const product = {
      ...newProduct,
      id: inventory.length + 1,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setInventory([...inventory, product]);
    setNewProduct({ name: "", sku: "", category: "", quantity: 0, minStock: 0, price: 0, supplier: "" });
    setIsAddDialogOpen(false);
  };

  const updateQuantity = (id: number, change: number) => {
    setInventory(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + change), lastUpdated: new Date().toISOString().split('T')[0] }
        : item
    ));
  };

  const lowStockItems = inventory.filter(item => item.quantity <= item.minStock);
  const outOfStockItems = inventory.filter(item => item.quantity === 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage your product inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                    placeholder="Product SKU"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    placeholder="Category"
                  />
                </div>
                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={newProduct.supplier}
                    onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                    placeholder="Supplier name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({...newProduct, quantity: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="minStock">Min Stock</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={newProduct.minStock}
                    onChange={(e) => setNewProduct({...newProduct, minStock: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
              </div>
              <Button onClick={handleAddProduct} className="w-full bg-gradient-primary">
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stock Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-warning shadow-warning border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-warning-foreground">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-warning-foreground/90 font-semibold text-lg">
              {lowStockItems.length} items need restocking
            </p>
            <p className="text-warning-foreground/70 text-sm mt-1">
              {lowStockItems.map(item => item.name).join(", ")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-destructive shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-destructive-foreground">
              <Package className="h-5 w-5" />
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground font-semibold text-lg">
              {outOfStockItems.length} items out of stock
            </p>
            <p className="text-destructive-foreground/80 text-sm mt-1">
              {outOfStockItems.length > 0 ? outOfStockItems.map(item => item.name).join(", ") : "All items in stock"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Product Inventory
            </CardTitle>
            <div className="relative md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => {
                  const stockStatus = getStockStatus(item.quantity, item.minStock);
                  return (
                    <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.sku}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className={cn("font-medium", 
                          item.quantity <= item.minStock ? "text-warning" : "text-foreground"
                        )}>
                          {item.quantity}
                        </span>
                        <span className="text-muted-foreground text-sm ml-1">
                          / {item.minStock} min
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">₹{item.price}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={stockStatus.color === "success" ? "default" : "destructive"}
                          className={cn(
                            stockStatus.color === "success" && "bg-success text-success-foreground",
                            stockStatus.color === "warning" && "bg-warning text-warning-foreground"
                          )}
                        >
                          {stockStatus.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.supplier}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity === 0}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}