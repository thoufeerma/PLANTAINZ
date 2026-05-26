"use client";

import { useCartStore } from "@/store/cart-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartSheet() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getSubtotal } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col z-[100]">
        <SheetHeader>
          <SheetTitle className="font-heading text-2xl tracking-wide flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            YOUR CART ({items.reduce((acc, item) => acc + item.quantity, 0)})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>Your cart is empty.</p>
              <Link href="/products" className={cn(buttonVariants({ variant: "outline" }))} onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    {item.product.images?.[0] ? (
                      <Image
                        src={item.product.images[0].src}
                        alt={item.product.images[0].alt || item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/20" />
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-sm line-clamp-2">{item.product.name}</h4>
                        {item.attributes && Object.entries(item.attributes).map(([key, value]) => (
                          <p key={key} className="text-xs text-muted-foreground mt-1">
                            {key}: {value}
                          </p>
                        ))}
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-auto pt-2">
                      <div className="flex items-center border border-border rounded-md">
                        <button 
                          className="px-2 py-1 hover:bg-muted transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 hover:bg-muted transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-semibold">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t pt-6 flex-col sm:flex-col gap-4">
            <div className="flex justify-between items-center w-full mb-4">
              <span className="font-semibold">Subtotal</span>
              <span className="font-bold text-lg">₹{getSubtotal()}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Shipping and taxes calculated at checkout.
            </p>
            <Button className="w-full font-bold text-md h-12" onClick={() => setIsOpen(false)}>
              CHECKOUT
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
