import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  ShoppingCart, 
  Plus, 
  Minus, 
  Search, 
  CreditCard, 
  Banknote,
  Trash2,
  Receipt,
  Calculator
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample products for POS
const products = [
  { id: 1, sku: "BAN001", name: "Bananas", price: 20, category: "Fruits", stock: 45 },
  { id: 2, sku: "MLK001", name: "Milk (1L)", price: 55, category: "Dairy", stock: 15 },
  { id: 3, sku: "BRD001", name: "White Bread", price: 35, category: "Bakery", stock: 8 },
  { id: 4, sku: "APP001", name: "Apples", price: 80, category: "Fruits", stock: 30 },
  { id: 5, sku: "EGG001", name: "Eggs (12pc)", price: 75, category: "Dairy", stock: 25 },
  { id: 6, sku: "TOM001", name: "Tomatoes", price: 40, category: "Vegetables", stock: 20 },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export default function PointOfSale() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [amountPaid, setAmountPaid] = useState(0);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<any>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price
      }]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 
          ? null 
          : { ...item, quantity: newQuantity, total: newQuantity * item.price };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;
  const change = amountPaid - total;

  const completeSale = () => {
    const transaction = {
      id: Date.now(),
      items: cart,
      subtotal,
      tax,
      total,
      paymentMethod,
      amountPaid,
      change: change > 0 ? change : 0,
      timestamp: new Date().toLocaleString()
    };
    
    setLastTransaction(transaction);
    setCart([]);
    setAmountPaid(0);
    setIsReceiptOpen(true);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Product Selection */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Point of Sale</h1>
          <p className="text-muted-foreground mt-1">Select products to add to the cart</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Products Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="bg-gradient-card shadow-card border-0 hover:shadow-card-hover transition-all duration-200 cursor-pointer"
              onClick={() => addToCart(product)}
            >
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.sku}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">₹{product.price}</span>
                    <div className="text-xs text-muted-foreground">
                      Stock: {product.stock}
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-primary shadow-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart & Checkout */}
      <div className="space-y-6">
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Shopping Cart
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Cart is empty</p>
            ) : (
              <>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">₹{item.price} each</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="w-16 text-right font-medium text-sm">
                        ₹{item.total}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (18%):</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Payment Method</Label>
                    <div className="flex gap-2 mt-1">
                      <Button
                        variant={paymentMethod === "cash" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPaymentMethod("cash")}
                        className="flex-1"
                      >
                        <Banknote className="h-3 w-3 mr-1" />
                        Cash
                      </Button>
                      <Button
                        variant={paymentMethod === "card" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPaymentMethod("card")}
                        className="flex-1"
                      >
                        <CreditCard className="h-3 w-3 mr-1" />
                        Card
                      </Button>
                    </div>
                  </div>

                  {paymentMethod === "cash" && (
                    <div>
                      <Label htmlFor="amountPaid" className="text-sm font-medium">
                        Amount Paid
                      </Label>
                      <Input
                        id="amountPaid"
                        type="number"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
                        placeholder="Enter amount"
                        className="mt-1"
                      />
                      {change > 0 && (
                        <p className="text-sm text-success mt-1">
                          Change: ₹{change.toFixed(2)}
                        </p>
                      )}
                    </div>
                  )}

                  <Button 
                    className="w-full bg-gradient-success shadow-success"
                    onClick={completeSale}
                    disabled={cart.length === 0 || (paymentMethod === "cash" && amountPaid < total)}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Complete Sale
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Receipt Dialog */}
        <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Transaction Complete
              </DialogTitle>
            </DialogHeader>
            {lastTransaction && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Receipt #{lastTransaction.id}</p>
                  <p className="text-xs text-muted-foreground">{lastTransaction.timestamp}</p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  {lastTransaction.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>₹{item.total}</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{lastTransaction.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>₹{lastTransaction.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>₹{lastTransaction.total.toFixed(2)}</span>
                  </div>
                  {lastTransaction.paymentMethod === "cash" && (
                    <>
                      <div className="flex justify-between">
                        <span>Paid:</span>
                        <span>₹{lastTransaction.amountPaid}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Change:</span>
                        <span>₹{lastTransaction.change.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => setIsReceiptOpen(false)}
                >
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}